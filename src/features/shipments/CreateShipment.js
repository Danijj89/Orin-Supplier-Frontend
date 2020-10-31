import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Divider, Typography, Paper, Checkbox, Chip } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import FormContainer from '../shared/wrappers/FormContainer.js';
import SideAutoComplete from '../shared/inputs/SideAutoComplete.js';
import { Controller, useForm } from 'react-hook-form';
import { formatAddress, roundTo2Decimal } from '../shared/utils/format.js';
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
import { createShipment } from './duck/thunks.js';
import ErrorDisplay from '../shared/components/ErrorDisplay.js';
import { selectShipmentError } from './duck/selectors.js';

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
    titleLabel,
    companyAddressLabel,
    clientLabel,
    clientAddressLabel,
    tableHeaderLabelsMap,
    prevButtonLabel,
    nextButtonLabel,
    errorMessages
} = LANGUAGE.shipments.createShipment;

export default function CreateShipment() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector(selectCurrentUserId);
    const company = useSelector(selectCurrentCompany);
    const clientsMap = useSelector(selectClientsMap);
    const orders = useSelector(selectOrdersMap);
    const shipmentError = useSelector(selectShipmentError);
    const { addresses, defaultAddress } = company;

    const { register, control, errors, getValues, watch, setValue, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            sellerAdd: defaultAddress,
            consignee: null,
            consigneeAdd: null,
            orderIds: []
        }
    });

    const chosenClient = watch('consignee');
    const orderIds = watch('orderIds');
    const [clientAddresses, setClientAddresses] = useState([]);
    const [clientOrders, setClientOrders] = useState([]);

    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            register({ name: 'orderIds' },
                { validate: val => val.length > 0 || errorMessages.atLeastOneOrder });
            mounted.current = true;
        }
        if (chosenClient && clientsMap.hasOwnProperty(chosenClient._id)) {
            setClientAddresses(chosenClient.addresses.filter(a => a.active));
            setClientOrders(Object.values(orders).filter(order => order.to === chosenClient._id));
        }
    }, [chosenClient, clientsMap, orders, register]);

    const onCheckboxSelection = (value, orderId) => {
        if (value) {
            setClientOrders(prev => prev.map(order => {
                if (order._id === orderId) {
                    const newOrder = { ...order };
                    newOrder.selected = true;
                    return newOrder;
                }
                return order;
            }));
            setValue('orderIds', [...orderIds, orderId]);
        } else {
            setClientOrders(prev => prev.map(order => {
                if (order._id === orderId) {
                    const newOrder = { ...order };
                    newOrder.selected = true;
                    return newOrder;
                }
                return order;
            }));
            setValue('orderIds', orderIds.filter(id => id !== orderId));
        }
    };

    const onPrevClick = () => history.goBack();
    const onSubmit = (data) => {
        data.createdBy = userId;
        data.seller = company._id;
        data.consignee = data.consignee._id;
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
        dispatch(createShipment(data));
    };

    const getFulfilledPercentage = (totalQ, items) => {
        const totalCount = UnitCounter.totalCount(totalQ);
        const totalFulfilled = items.reduce((acc, item) => item.shipment ? acc + item.quantity : acc, 0);
        return `${roundTo2Decimal(totalFulfilled / totalCount * 100)}%`;
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
                />
        },
        { field: 'ref', headerName: tableHeaderLabelsMap.ref },
        { field: 'clientRef', headerName: tableHeaderLabelsMap.clientRef },
        { field: 'totalQ', headerName: tableHeaderLabelsMap.totalQ },
        { field: 'crd', headerName: tableHeaderLabelsMap.crd },
        { field: 'del', headerName: tableHeaderLabelsMap.del },
        {
            field: 'production',
            headerName: tableHeaderLabelsMap.production,
            renderCell: (params) =>
                <StatusDisplay status={ params.production }/>
        },
        {
            field: 'qa',
            headerName: tableHeaderLabelsMap.qa,
            renderCell: (params) =>
                <StatusDisplay status={ params.qa }/>
        },
        { field: 'notes', headerName: tableHeaderLabelsMap.notes },
        { field: 'fulfilled', headerName: tableHeaderLabelsMap.fulfilled }
    ];

    const rows = clientOrders.filter(order => order.active).map(order => ({
        id: order._id,
        selected: order.selected,
        ref: order.ref,
        clientRef: order.clientRef,
        totalQ: UnitCounter.stringRep(order.totalQ),
        crd: order.crd,
        del: order.del,
        production: order.status.production.status,
        qa: order.status.qa.status,
        notes: order.notes,
        fulfilled: getFulfilledPercentage(order.totalQ, order.items)
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
                            label={ orders[id].ref }
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
