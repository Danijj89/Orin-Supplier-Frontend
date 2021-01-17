import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box, Paper, Checkbox, Chip } from '@material-ui/core';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import FormContainer from '../shared/wrappers/FormContainer.js';
import { useForm } from 'react-hook-form';
import { dateToLocaleDate, formatAddress, roundToNDecimal } from '../shared/utils/format.js';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectActiveCompanyAddresses,
    selectCompanyDefaultAddress,
} from 'features/home/duck/home/selectors.js';
import { selectAllActiveClients } from '../clients/duck/selectors.js';
import {
    selectOrdersMap
} from '../orders/duck/selectors.js';
import Table from '../shared/components/table/Table.js';
import OrderStatusDisplay from '../orders/OrderStatusDisplay.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../shared/components/Footer.js';
import {
    selectItemUnitsMap,
    selectSessionUser
} from 'app/duck/selectors.js';
import { createShipment, updateShipmentShell } from './duck/thunks.js';
import ErrorSnackbar from 'features/shared/components/ErrorSnackbar.js';
import {
    selectEditShipmentShellById,
    selectOrderToShipmentItemsQuantityMap,
    selectShipmentOrders, selectShipmentShellClientIdToActiveOrdersMap
} from './duck/selectors.js';
import { addressToDocAddress } from '../shared/utils/entityConversion.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import queryString from 'query-string';
import { getOptionLabel } from 'app/utils/options/getters.js';
import Title1 from 'features/shared/display/Title1.js';

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
    container: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    newShipmentLabel: {
        marginBottom: theme.spacing(1),
    },
    chip: {
        marginRight: theme.spacing(1),
    }
}));

const {
    titles,
    labels,
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
    const { id: shipmentId } = queryString.parse(location.search);
    const isEdit = useMemo(() => Boolean(shipmentId), [shipmentId]);
    const title = useMemo(() => isEdit ? titles.editTitle : titles.newTitle, [isEdit]);

    const { _id: userId, company: companyId } = useSelector(selectSessionUser);
    const companyAddresses = useSelector(selectActiveCompanyAddresses);
    const clients = useSelector(selectAllActiveClients);
    const ordersMap = useSelector(selectOrdersMap);
    const clientIdToActiveOrdersMap = useSelector(selectShipmentShellClientIdToActiveOrdersMap);
    const orderShipmentItemMap = useSelector(selectOrderToShipmentItemsQuantityMap);
    const itemUnitsMap = useSelector(selectItemUnitsMap);

    const shipment = useSelector(state => selectEditShipmentShellById(state, { shipmentId }));
    const companyDefaultAddress = useSelector(selectCompanyDefaultAddress);

    const initialShipmentOrders = useSelector(state => selectShipmentOrders(state, { shipmentId }));
    const initialOrderIds = initialShipmentOrders?.map(order => order._id);


    const { register, control, errors, watch, setValue, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            sellerAdd: shipment?.sellerAdd || companyDefaultAddress,
            consignee: shipment?.consignee || null,
            consigneeAdd: shipment?.consigneeAdd || null,
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
                const initialOrders = [...clientIdToActiveOrdersMap[chosenClient._id]];
                for (const order of initialShipmentOrders) {
                    const foundOrder = initialOrders.find(o => o._id === order._id);
                    if (foundOrder) foundOrder.selected = true;
                    else initialOrders.push({ ...order, selected: true });
                }
                setClientOrders(initialOrders);
                setClientAddresses(chosenClient.addresses.filter(a => a.active));
            }
            mounted.current = true;
        }
    }, [register, chosenClient, clientIdToActiveOrdersMap, initialShipmentOrders]);

    // Note: initialize prev client to initial consignee in case it is an edit or else
    // the first render will cause the useEffect to run
    const prevClient = useRef(shipment?.consignee || null);
    useEffect(() => {
        if (chosenClient && prevClient.current !== chosenClient) {
            setClientAddresses(chosenClient.addresses);
            setValue('consigneeAdd', null);
            setClientOrders(clientIdToActiveOrdersMap[chosenClient._id]);
            prevClient.current = chosenClient;
        } else if (!chosenClient && prevClient.current !== chosenClient) {
            setClientAddresses([]);
            setValue('consigneeAdd', null);
            setValue('orderIds', []);
            setClientOrders([]);
            clientIdToActiveOrdersMap[prevClient.current._id].map(order => {
                order.selected = false;
                return order;
            });
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
            if (isEdit) history.push(`/home/shipments/${ shipmentId }`);
            else history.push('/home/shipments');
        }, [history, shipmentId, isEdit]);

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
            const totalCount = UnitCounter.totalCount(totalQ, itemUnitsMap, LOCALE);
            const totalFulfilled = orderShipmentItemMap[orderId].reduce((acc, instance) => acc + instance.quantity, 0);
            return `${ roundToNDecimal(totalFulfilled / totalCount * 100, 2) }%`;
        }, [orderShipmentItemMap, itemUnitsMap]);

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
                <OrderStatusDisplay status={ params.production }/>,
            align: 'center',
            width: 120
        },
        {
            field: 'qa',
            headerName: tableHeaderLabelsMap.qa,
            renderCell: (params) =>
                <OrderStatusDisplay status={ params.qa }/>,
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
            totalQ: UnitCounter.stringRep(order.totalQ, itemUnitsMap, LOCALE),
            crd: dateToLocaleDate(order.crd),
            del: getOptionLabel(order.del, LOCALE),
            production: order.production.status,
            qa: order.qa.status,
            notes: order.notes,
            fulfilled: getFulfilledPercentage(order.totalQ, order._id)
        })), [clientOrders, getFulfilledPercentage, itemUnitsMap]);

    const errs = useMemo(() => Object.values(errors).map(err => err.message), [errors]);

    return (
        <>
            <Paper className={ classes.container }>
                <Title1 title={ title } className={ classes.newShipmentLabel }/>
                { errs.length > 0 && <ErrorSnackbar error={ errs }/> }
                <FormContainer>
                    <RHFAutoComplete
                        rhfControl={ control }
                        name="sellerAdd"
                        label={ labels.companyAddress }
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
                        label={ labels.client }
                        options={ clients }
                        getOptionLabel={ client => client.name }
                        getOptionSelected={ (option, value) => option._id === value._id || !value.active }
                        required={ errorMessages.missingConsignee }
                        error={ !!errors.consignee }
                    />
                    <RHFAutoComplete
                        rhfControl={ control }
                        name="consigneeAdd"
                        label={ labels.clientAddress }
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
            <Footer
                prevLabel={ prevButtonLabel }
                nextLabel={ nextButtonLabel }
                onPrevClick={ onPrevClick }
                onNextClick={ handleSubmit(onSubmit) }
            />
        </>
    )
});

export default CreateShipment;
