import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { Box, Divider, Typography, Paper, Checkbox, Chip } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import FormContainer from '../shared/wrappers/FormContainer.js';
import SideAutoComplete from '../shared/inputs/SideAutoComplete.js';
import { Controller, useForm } from 'react-hook-form';
import { dateToLocaleDate, formatAddress, roundTo2Decimal } from '../shared/utils/format.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCompany } from '../home/duck/selectors.js';
import { selectClientsMap } from '../clients/duck/selectors.js';
import { selectOrdersMap } from '../orders/duck/selectors.js';
import Table from '../shared/components/Table.js';
import StatusDisplay from '../orders/StatusDisplay.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../shared/components/Footer.js';
import { selectCurrentUserId } from '../../app/duck/selectors.js';
import { createShipment, updateShipmentShell } from './duck/thunks.js';
import ErrorDisplay from '../shared/components/ErrorDisplay.js';
import { selectOrderShipmentItemMap, selectShipmentById, selectShipmentError } from './duck/selectors.js';
import { cleanNewShipment } from './duck/slice.js';

const useStyles = makeStyles((theme) => ({
    chipContainer: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.tertiary.main,
        minHeight: 50,
        margin: theme.spacing(1),
        padding: 0
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
    const clientsMap = useSelector(selectClientsMap);
    const ordersMap = useSelector(selectOrdersMap);
    const orderShipmentItemMap = useSelector(selectOrderShipmentItemMap);
    const shipmentError = useSelector(selectShipmentError);
    const { addresses, defaultAddress } = company;
    const initialOrderIds = shipment?.items.reduce((acc, item) => {
        if (!acc.includes(item.order)) acc.push(item.order);
        return acc;
    }, []);

    const { register, control, errors, getValues, watch, setValue, handleSubmit } = useForm({
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
        if (mounted.current && prevClient.current !== chosenClient && clientsMap.hasOwnProperty(chosenClient._id)) {
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
    }, [chosenClient, register, clientsMap, ordersMap, initialOrderIds]);

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
        data.sellerAdd = {
            addressId: data.sellerAdd._id,
            name: data.sellerAdd.name,
            address: data.sellerAdd.address,
            address2: data.sellerAdd.address2,
            city: data.sellerAdd.city,
            administrative: data.sellerAdd.administrative,
            country: data.sellerAdd.country,
            zip: data.sellerAdd.zip
        };
        data.consignee = data.consignee._id;
        data.consigneeAdd = {
            addressId: data.consigneeAdd._id,
            name: data.consigneeAdd.name,
            address: data.consigneeAdd.address,
            address2: data.consigneeAdd.address2,
            city: data.consigneeAdd.city,
            administrative: data.consigneeAdd.administrative,
            country: data.consigneeAdd.country,
            zip: data.consigneeAdd.zip
        };
        if (isEdit) dispatch(updateShipmentShell(data));
        else dispatch(createShipment(data));
        dispatch(cleanNewShipment());
    };

    const getFulfilledPercentage = (totalQ, orderId) => {
        const totalCount = UnitCounter.totalCount(totalQ);
        const totalFulfilled = orderShipmentItemMap[orderId].reduce((acc, instance) => acc + instance.quantity, 0);
        return `${ roundTo2Decimal(totalFulfilled / totalCount * 100) }%`;
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

    const rows = clientOrders.filter(order => order.active && !order.fulfilled).map(order => ({
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
            <Typography variant="h5">{ titleLabel }</Typography>
            <Divider/>
            <Paper>
                { errs.length > 0 && <ErrorDisplay errors={ errs }/> }
                <FormContainer>
                    <Controller
                        render={ (props) =>
                            <SideAutoComplete
                                { ...props }
                                options={ addresses.filter(a => a.active) }
                                label={ companyAddressLabel }
                                error={ !!errors.fromAdd }
                                getOptionLabel={ address => formatAddress(address) }
                                getOptionSelected={ address => address._id === getValues('sellerAdd')._id
                                    || address._id === getValues('sellerAdd').addressId }
                                required
                            />
                        }
                        name="sellerAdd"
                        control={ control }
                        rules={ { required: errorMessages.missingSupplierAddress } }
                    />
                    <Controller
                        render={ (props) =>
                            <SideAutoComplete
                                { ...props }
                                options={ Object.values(clientsMap).filter(c => c.active) }
                                label={ clientLabel }
                                error={ !!errors.to }
                                getOptionLabel={ client => client.name }
                                getOptionSelected={ client => client._id === getValues('consignee')._id }
                                disabled={ isEdit }
                                required
                            />
                        }
                        name="consignee"
                        control={ control }
                        rules={ { required: errorMessages.missingConsignee } }
                    />
                    <Controller
                        render={ (props) => (
                            <SideAutoComplete
                                { ...props }
                                options={ clientAddresses }
                                label={ clientAddressLabel }
                                error={ !!errors.toAdd }
                                getOptionLabel={ address => formatAddress(address) }
                                getOptionSelected={ address => address._id === getValues('consigneeAdd')._id
                                    || address._id === getValues('consigneeAdd').addressId }
                                required
                            />
                        ) }
                        name="consigneeAdd"
                        control={ control }
                        rules={ { required: errorMessages.missingConsigneeAddress } }
                    />
                </FormContainer>
                <Box component="ul" className={ classes.chipContainer }>
                    { orderIds.map((id) =>
                        <Chip
                            key={ id }
                            component="li"
                            label={ ordersMap[id].ref }
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
        </Box>
    )
}
