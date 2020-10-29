import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Divider, Typography, Paper, Checkbox, Chip } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import FormContainer from '../shared/wrappers/FormContainer.js';
import SideAutoComplete from '../shared/inputs/SideAutoComplete.js';
import { Controller, useForm } from 'react-hook-form';
import { formatAddress } from '../shared/utils/format.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCompany } from '../home/duck/selectors.js';
import { selectClientsMap } from '../clients/duck/selectors.js';
import { selectOrdersMap } from '../orders/duck/selectors.js';
import Table from '../shared/components/Table.js';
import StatusDisplay from '../orders/StatusDisplay.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../shared/components/Footer.js';

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
    nextButtonLabel
} = LANGUAGE.shipments.createShipment;

export default function CreateShipment() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const company = useSelector(selectCurrentCompany);
    const clientsMap = useSelector(selectClientsMap);
    const orders = useSelector(selectOrdersMap);
    const { addresses, defaultAddress } = company;

    const { register, control, errors, getValues, watch, setValue, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            fromAdd: defaultAddress,
            to: null,
            toAdd: null,
            orderIds: []
        }
    });

    const chosenClient = watch('to');
    const orderIds = watch('orderIds');
    const [clientAddresses, setClientAddresses] = useState([]);
    const [clientOrders, setClientOrders] = useState([]);

    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            register({ name: 'orderIds' });
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
    const onSubmit = (data) => dispatch();

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
                <StatusDisplay status={ params.production.status }/>
        },
        { field: 'notes', headerName: tableHeaderLabelsMap.notes }
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
        notes: order.notes
    }));


    return (
        <Box>
            <Typography variant="h5">{ titleLabel }</Typography>
            <Divider/>
            <Paper>
                <FormContainer>
                    <Controller
                        render={ (props) =>
                            <SideAutoComplete
                                { ...props }
                                options={ addresses.filter(a => a.active) }
                                label={ companyAddressLabel }
                                error={ !!errors.fromAdd }
                                getOptionLabel={ address => formatAddress(address) }
                                getOptionSelected={ address => address._id === getValues('fromAdd')._id
                                    || address._id === getValues('fromAdd').addressId }
                                required
                            />
                        }
                        name="fromAdd"
                        control={ control }
                        rules={ { required: true } }
                    />
                    <Controller
                        render={ (props) =>
                            <SideAutoComplete
                                { ...props }
                                options={ Object.values(clientsMap).filter(c => c.active) }
                                label={ clientLabel }
                                error={ !!errors.to }
                                getOptionLabel={ client => client.name }
                                getOptionSelected={ client => client._id === getValues('to')._id }
                                required
                            />
                        }
                        name="to"
                        control={ control }
                        rules={ { required: true } }
                    />
                    <Controller
                        render={ (props) => (
                            <SideAutoComplete
                                { ...props }
                                options={ clientAddresses }
                                label={ clientAddressLabel }
                                error={ !!errors.toAdd }
                                getOptionLabel={ address => formatAddress(address) }
                                getOptionSelected={ address => address._id === getValues('toAdd')._id
                                    || address._id === getValues('toAdd').addressId }
                                required
                            />
                        ) }
                        name="toAdd"
                        control={ control }
                        rules={ { required: true } }
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
