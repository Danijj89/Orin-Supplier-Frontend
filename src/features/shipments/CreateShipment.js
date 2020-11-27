import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box, Divider, Typography, Paper, Checkbox, Chip } from '@material-ui/core';
import { LANGUAGE } from '../../app/utils/constants.js';
import FormContainer from '../shared/wrappers/FormContainer.js';
import { useForm } from 'react-hook-form';
import { dateToLocaleDate, formatAddress, roundToNDecimal } from '../shared/utils/format.js';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCompanyActiveAddresses, selectCompanyAddress,
    selectCompanyDefaultAddress,
    selectCompanyId,
} from '../home/duck/selectors.js';
import {
    selectAllActiveClients,
    selectClientById,
    selectClientAddress
} from '../clients/duck/selectors.js';
import {
    selectShipmentShellClientIdToOrdersMap,
    selectOrdersMap,
    selectShipmentShellClientIdToActiveOrdersMap
} from '../orders/duck/selectors.js';
import Table from '../shared/components/table/Table.js';
import StatusDisplay from '../orders/StatusDisplay.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../shared/components/Footer.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import { createShipment, updateShipmentShell } from './duck/thunks.js';
import ErrorMessages from '../shared/components/ErrorMessages.js';
import {
    selectOrderToShipmentItemsQuantityMap,
    selectShipmentById,
    selectShipmentOrderIds
} from './duck/selectors.js';
import { addressToDocAddress } from '../shared/utils/entityConversion.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import queryString from 'query-string';

const useStyles = makeStyles((theme) => ({
    chipContainer: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.grey.light,
        minHeight: 50,
        margin: theme.spacing(1),
        padding: 0,
        borderRadius: '5px',
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(1),
    },
    shipmentRoot: {
        margin: theme.spacing(2),
        marginTop: theme.spacing(0),
    },
    newShipmentLabel: {
        marginBottom: theme.spacing(1),
    },
    chip: {
        marginRight: theme.spacing(1),
    }
}));

const {
    newTitleLabel,
    editTitleLabel,
    companyAddressLabel,
    clientLabel,
    clientAddressLabel,
    tableHeaderLabelsMap,
    prevButtonLabel,
    nextButtonLabel,
    errorMessages
} = LANGUAGE.shipment.createShipment;

const CreateShipment = React.memo(function CreateShipment() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { id } = queryString.parse(location.search);

    const shipment = useSelector(state => selectShipmentById(state, id));
    const userId = useSelector(selectCurrentUserId);
    const companyId = useSelector(selectCompanyId);

    const companyAddresses = useSelector(selectCompanyActiveAddresses);
    const clients = useSelector(selectAllActiveClients);

    const ordersMap = useSelector(selectOrdersMap);
    const clientIdToOrdersMap = useSelector(selectShipmentShellClientIdToOrdersMap);
    const clientIdToActiveOrdersMap = useSelector(selectShipmentShellClientIdToActiveOrdersMap);
    const orderShipmentItemMap = useSelector(selectOrderToShipmentItemsQuantityMap);

    const companyDefaultAddress = useSelector(selectCompanyDefaultAddress);
    const initialSellerAddress = useSelector(
        state => selectCompanyAddress(state, shipment?.sellerAdd.addressId));
    const initialConsignee = useSelector(state => selectClientById(state, shipment?.consignee));
    const initialConsigneeAddress = useSelector(
        state => selectClientAddress(state, {
            clientId: shipment?.consignee,
            addressId: shipment?.consigneeAdd.addressId
        }));
    const initialOrderIds = useSelector(state => selectShipmentOrderIds(state, shipment?._id));

    const isEdit = Boolean(id);

    const { register, control, errors, watch, setValue, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            sellerAdd: initialSellerAddress || companyDefaultAddress,
            consignee: initialConsignee || null,
            consigneeAdd: initialConsigneeAddress || null,
            orderIds: initialOrderIds || []
        }
    });

    const chosenClient = watch('consignee');
    const orderIds = watch('orderIds');
    const [clientAddresses, setClientAddresses] = useState([]);
    const [clientOrders, setClientOrders] = useState([]);

    /* Register orderIds on mount and set client orders if this is an edit */
    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {
            register({ name: 'orderIds' },
                { validate: val => val.length > 0 || errorMessages.atLeastOneOrder });
            if (chosenClient) {
                // Add the initial orders if this is edit including orders that might be inactive
                setClientOrders(
                    clientIdToOrdersMap[chosenClient._id].reduce((acc, order) => {
                        if (initialOrderIds.includes(order._id)) {
                            order.selected = true;
                            acc.push(order);
                        } else if (order.active) acc.push(order);
                        return acc;
                    }, []));
            }
            mounted.current = true;
        }
    }, [register, chosenClient, initialOrderIds, clientIdToOrdersMap]);

    // Note: initialize prev client to initial consignee in case it is an edit or else
    // the first render will cause the useEffect to run
    const prevClient = useRef(initialConsignee || null);
    useEffect(() => {
        if (chosenClient && prevClient.current !== chosenClient) {
            setClientAddresses(chosenClient.addresses);
            setValue('consigneeAdd', null);
            setClientOrders(clientIdToActiveOrdersMap[chosenClient._id]);
            prevClient.current = chosenClient;
        } else if (!chosenClient) {
            setClientAddresses([]);
            setValue('consigneeAdd', null);
            setClientOrders([]);
            prevClient.current = chosenClient;
        }
    }, [setValue, chosenClient, clientIdToActiveOrdersMap]);

    const createCheckboxSelectionHandler = useCallback(
        (orderId) => (e) => {
            if (e.target.checked) {
                setClientOrders(prev => prev.map(order => {
                    if (order._id === orderId) order.selected = true;
                    return order;
                }));
                setValue('orderIds', [...orderIds, orderId]);
            } else {
                setClientOrders(prev => prev.map(order => {
                    if (order._id === orderId) order.selected = false;
                    return order;
                }));
                setValue('orderIds', orderIds.filter(id => id !== orderId));
            }
        }, [setValue, orderIds]);

    const onPrevClick = useCallback(
        () => {
            if (isEdit) history.push(`/home/shipments/${ id }`);
            else history.push('/home/shipments');
        }, [history, id, isEdit]);

    const onSubmit = (data) => {
        data.seller = companyId;
        data.sellerAdd = addressToDocAddress(data.sellerAdd);
        data.consignee = data.consignee._id;
        data.consigneeAdd = addressToDocAddress(data.consigneeAdd);
        if (isEdit) dispatch(updateShipmentShell({ shipmentId: shipment._id, update: data }));
        else {
            data.createdBy = userId;
            dispatch(createShipment({ shipment: data }));
        }
    };

    const getFulfilledPercentage = useCallback(
        (totalQ, orderId) => {
            const totalCount = UnitCounter.totalCount(totalQ);
            const totalFulfilled = orderShipmentItemMap[orderId].reduce((acc, instance) => acc + instance.quantity, 0);
            return `${ roundToNDecimal(totalFulfilled / totalCount * 100, 2) }%`;
        }, [orderShipmentItemMap]);

    const columns = useMemo(() => [
        { field: 'id', hide: true },
        {
            field: 'selected',
            headerName: null,
            renderCell: (params) =>
                <Checkbox
                    color="primary"
                    onChange={ createCheckboxSelectionHandler(params.id) }
                    checked={ params.selected }
                />
        },
        { field: 'ref', headerName: tableHeaderLabelsMap.ref },
        { field: 'clientRef', headerName: tableHeaderLabelsMap.clientRef },
        { field: 'totalQ', headerName: tableHeaderLabelsMap.totalQ },
        { field: 'crd', headerName: tableHeaderLabelsMap.crd },
        { field: 'del', headerName: tableHeaderLabelsMap.del, align: 'center' },
        {
            field: 'production',
            headerName: tableHeaderLabelsMap.production,
            renderCell: (params) =>
                <StatusDisplay status={ params.production }/>,
            align: 'center',
            width: 120
        },
        {
            field: 'qa',
            headerName: tableHeaderLabelsMap.qa,
            renderCell: (params) =>
                <StatusDisplay status={ params.qa }/>,
            align: 'center',
            width: 120
        },
        { field: 'notes', headerName: tableHeaderLabelsMap.notes },
        { field: 'fulfilled', headerName: tableHeaderLabelsMap.fulfilled, align: 'center' }
    ], [createCheckboxSelectionHandler]);

    const rows = useMemo(() =>
        clientOrders.map(order => ({
            id: order._id,
            selected: order.selected,
            ref: order.ref,
            clientRef: order.clientRef,
            totalQ: UnitCounter.stringRep(order.totalQ),
            crd: dateToLocaleDate(order.crd),
            del: order.del,
            production: order.status.production.status,
            qa: order.status.qa.status,
            notes: order.notes,
            fulfilled: getFulfilledPercentage(order.totalQ, order._id)
        })), [clientOrders, getFulfilledPercentage]);

    const errs = useMemo(() => Object.values(errors).map(err => err.message), [errors]);

    return (
        <Box>
            <Box className={ classes.shipmentRoot }>
                <Typography className={ classes.newShipmentLabel }
                            variant="h5">{ isEdit ? editTitleLabel : newTitleLabel }</Typography>
                <Divider/>
                <Paper>
                    { errs.length > 0 && <ErrorMessages errors={ errs }/> }
                    <FormContainer>
                        <RHFAutoComplete
                            rhfControl={ control }
                            name="sellerAdd"
                            label={ companyAddressLabel }
                            options={ companyAddresses }
                            getOptionLabel={ address => formatAddress(address) }
                            getOptionSelected={ (option, value) => option._id === value._id || !value.active }
                            required={ errorMessages.missingSupplierAddress }
                            error={ !!errors.sellerAdd }
                            rows={ 4 }
                            rowsMax={ 8 }
                        />
                        <RHFAutoComplete
                            rhfControl={ control }
                            name="consignee"
                            label={ clientLabel }
                            options={ clients }
                            getOptionLabel={ client => client.name }
                            getOptionSelected={ (option, value) => option._id === value._id || !value.active }
                            required={ errorMessages.missingConsignee }
                            error={ !!errors.consignee }
                        />
                        <RHFAutoComplete
                            rhfControl={ control }
                            name="consigneeAdd"
                            label={ clientAddressLabel }
                            options={ clientAddresses }
                            getOptionLabel={ address => formatAddress(address) }
                            getOptionSelected={ (option, value) => option._id === value._id || !value.active }
                            required={ errorMessages.missingConsigneeAddress }
                            error={ !!errors.consigneeAdd }
                            rows={ 4 }
                            rowsMax={ 8 }
                        />
                    </FormContainer>
                    <Box component="ul" className={ classes.chipContainer }>
                        { orderIds.map((id) =>
                            <Chip
                                key={ id }
                                component="li"
                                label={ ordersMap[id].ref }
                                className={ classes.chip }
                            />) }
                    </Box>
                    <Table columns={ columns } rows={ rows }/>
                </Paper>
            </Box>
            <Footer
                prevLabel={ prevButtonLabel }
                nextLabel={ nextButtonLabel }
                onPrevClick={ onPrevClick }
                onNextClick={ handleSubmit(onSubmit) }
            />
        </Box>
    )
});

export default CreateShipment;
