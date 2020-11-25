import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Box, Divider, Typography, Paper, Checkbox, Chip } from '@material-ui/core';
import { LANGUAGE } from '../../app/utils/constants.js';
import FormContainer from '../shared/wrappers/FormContainer.js';
import { useForm } from 'react-hook-form';
import { dateToLocaleDate, formatAddress, roundToNDecimal } from '../shared/utils/format.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyActiveAddresses, selectCurrentCompany } from '../home/duck/selectors.js';
import { selectAllActiveClients, selectActiveClientsMap } from '../clients/duck/selectors.js';
import { selectOrdersMap } from '../orders/duck/selectors.js';
import Table from '../shared/components/table/Table.js';
import StatusDisplay from '../orders/StatusDisplay.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../shared/components/Footer.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import { createShipment, updateShipmentShell } from './duck/thunks.js';
import ErrorMessages from '../shared/components/ErrorMessages.js';
import { selectOrderShipmentItemMap, selectShipmentById, selectShipmentError } from './duck/selectors.js';
import { cleanNewShipment, cleanShipmentError } from './duck/slice.js';
import { addressToDocAddress } from '../shared/utils/entityConversion.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';

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

export default function CreateShipment() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const location = useLocation();
    const isEdit = location.pathname.split('/')[3] === 'edit';
    const titleLabel = isEdit ? editTitleLabel : newTitleLabel;
    const shipment = useSelector(state => selectShipmentById(state, id));
    const userId = useSelector(selectCurrentUserId);
    const company = useSelector(selectCurrentCompany);
    const clientsMap = useSelector(selectActiveClientsMap);
    const clients = useSelector(selectAllActiveClients);
    const ordersMap = useSelector(selectOrdersMap);
    const orderShipmentItemMap = useSelector(selectOrderShipmentItemMap);
    const shipmentError = useSelector(selectShipmentError);
    const companyAddresses = useSelector(selectCompanyActiveAddresses);
    const { defaultAddress } = company;
    const initialOrderIds = shipment?.items.reduce((acc, item) => {
        if (!acc.includes(item.order)) acc.push(item.order);
        return acc;
    }, []);

    const { register, control, errors, watch, setValue, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            _id: shipment?._id,
            createdBy: isEdit ? null : userId,
            sellerAdd: shipment?.sellerAdd || defaultAddress,
            consignee: clientsMap[shipment?.consignee] || null,
            consigneeAdd: shipment?.consigneeAdd || null,
            orderIds: initialOrderIds || []
        }
    });

    const chosenClient = watch('consignee');
    const orderIds = watch('orderIds');
    const [clientAddresses, setClientAddresses] = useState([]);
    const [clientOrders, setClientOrders] = useState([]);

    const mounted = useRef(false);
    const prevClient = useRef(clientsMap[shipment?.consignee] || null);

    useEffect(() => {
        if (mounted.current && chosenClient && prevClient.current !== chosenClient && clientsMap.hasOwnProperty(chosenClient._id)) {
            setClientAddresses(chosenClient.addresses.filter(a => a.active));
            setValue('consigneeAdd', null);
            setClientOrders(Object.values(ordersMap).filter(order => order.to === chosenClient._id)
                .map(order => ({ ...order, selected: false })));
            prevClient.current = chosenClient;
        } else if (!mounted.current) {
            register({ name: 'orderIds' },
                { validate: val => val.length > 0 || errorMessages.atLeastOneOrder });
            if (chosenClient) {
                setClientOrders(Object.values(ordersMap)
                    .filter(order => order.to === chosenClient._id)
                    .map(order => {
                        if (initialOrderIds.includes(order._id)) return { ...order, selected: true };
                        return { ...order, selected: false };
                    }));
            }
            mounted.current = true;
        }
    }, [chosenClient, register, clientsMap, ordersMap, initialOrderIds, setValue]);

    useEffect(() => {
        dispatch(cleanShipmentError());
    }, [dispatch])

    const onCheckboxSelection = (value, orderId) => {
        if (value) {
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
    };

    const onPrevClick = () => history.goBack();
    const onSubmit = (data) => {
        data.seller = company._id;
        data.sellerAdd = addressToDocAddress(data.sellerAdd);
        data.consignee = data.consignee._id;
        data.consigneeAdd = addressToDocAddress(data.consigneeAdd);
        if (isEdit) dispatch(updateShipmentShell(data));
        else dispatch(createShipment({ data }));
        dispatch(cleanNewShipment());
    };

    const getFulfilledPercentage = (totalQ, orderId) => {
        const totalCount = UnitCounter.totalCount(totalQ);
        const totalFulfilled = orderShipmentItemMap[orderId].reduce((acc, instance) => acc + instance.quantity, 0);
        return `${ roundToNDecimal(totalFulfilled / totalCount * 100, 2) }%`;
    };

    const columns = [
        { field: 'id', hide: true },
        {
            field: 'selected',
            headerName: null,
            renderCell: (params) =>
                <Checkbox
                    color="primary"
                    onChange={ (e) => onCheckboxSelection(e.target.checked, params.id) }
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
            align: 'center'
        },
        {
            field: 'qa',
            headerName: tableHeaderLabelsMap.qa,
            renderCell: (params) =>
                <StatusDisplay status={ params.qa }/>,
            align: 'center'
        },
        { field: 'notes', headerName: tableHeaderLabelsMap.notes },
        { field: 'fulfilled', headerName: tableHeaderLabelsMap.fulfilled, align: 'center' }
    ];

    const rows = clientOrders.filter(order => order.active && !order.archived).map(order => ({
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
    }));

    const errs = Object.values(errors).map(err => err.message).concat(shipmentError);

    return (
        <Box>
            <Box className={ classes.shipmentRoot }>
                <Typography className={ classes.newShipmentLabel } variant="h5">{ titleLabel }</Typography>
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
                            getOptionSelected={ (option, value) => option._id === value._id }
                            required={ errorMessages.missingSupplierAddress }
                            error={ !!errors.sellerAdd }
                        />
                        <RHFAutoComplete
                            rhfControl={ control }
                            name="consignee"
                            label={ clientLabel }
                            options={ clients }
                            getOptionLabel={ client => client.name }
                            getOptionSelected={ (option, value) => option._id === value._id }
                            required={ errorMessages.missingConsignee }
                            error={ !!errors.consignee }
                        />
                        <RHFAutoComplete
                            rhfControl={ control }
                            name="consigneeAdd"
                            label={ clientAddressLabel }
                            options={ clientAddresses }
                            getOptionLabel={ address => formatAddress(address) }
                            getOptionSelected={ (option, value) => option._id === value._id }
                            required={ errorMessages.missingConsigneeAddress }
                            error={ !!errors.consigneeAdd }
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
}
