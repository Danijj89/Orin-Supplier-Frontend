import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box, Paper, Checkbox, Chip } from '@material-ui/core';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import FormContainer from '../shared/wrappers/FormContainer.js';
import { useForm } from 'react-hook-form';
import {
    formatAddress,
    formatItemsTotalQuantities,
    roundToNDecimal
} from '../shared/utils/format.js';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectActiveCompanyAddresses,
    selectCompanyDefaultAddress,
} from 'features/home/duck/home/selectors.js';
import { selectAllActiveClients } from '../clients/duck/selectors.js';
import { selectActiveSplitsMap } from '../orders/duck/selectors.js';
import Table from '../shared/components/table/Table.js';
import OrderStatusDisplay from '../orders/OrderStatusDisplay.js';
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

} from './duck/selectors.js';
import { addressToDocAddress } from '../shared/utils/entityConversion.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import queryString from 'query-string';
import Title1 from 'features/shared/display/Title1.js';
import { getQuantityTotalCount } from 'features/shared/utils/reducers.js';
import {
    selectClientsSplitsMap,
    selectShipmentOrders,
    selectSplitsToShippedQuantityMap
} from 'features/shipments/utils/selectors.js';

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
    tableHeaderLabels,
    prevButtonLabel,
    nextButtonLabel,
    errorMessages
} = LANGUAGE.shipment.createShipment;

const fieldNames = {
    sellerAdd: 'sellerAdd',
    consignee: 'consignee',
    consigneeAdd: 'consigneeAdd',
    splitIds: 'splitIds'
};

function getFulfilledPercentage(fulfilledCount, totalCount) {
    return `${ roundToNDecimal(fulfilledCount / totalCount * 100, 2) }%`;
}

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
    const clientsSplitsMap = useSelector(selectClientsSplitsMap);
    const splitsShippedQuantityMap = useSelector(selectSplitsToShippedQuantityMap);
    const splitsMap = useSelector(selectActiveSplitsMap);
    const clients = useSelector(selectAllActiveClients);
    const itemUnitsMap = useSelector(selectItemUnitsMap);
    const companyDefaultAddress = useSelector(selectCompanyDefaultAddress);

    const shipment = useSelector(state => selectEditShipmentShellById(state, { shipmentId }));
    const shipmentOrders = useSelector(state => selectShipmentOrders(state, { shipmentId }));
    const initialSplitsIds = useMemo(() => shipmentOrders?.map(order => order.split._id), [shipmentOrders]);

    const { register, control, errors, watch, setValue, getValues, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [fieldNames.sellerAdd]: shipment?.sellerAdd || companyDefaultAddress,
            [fieldNames.consignee]: shipment?.consignee || null,
            [fieldNames.consigneeAdd]: shipment?.consigneeAdd || null,
            [fieldNames.splitIds]: initialSplitsIds || []
        }
    });

    const errs = useMemo(() => Object.values(errors).map(err => err.message), [errors]);

    const chosenClient = watch(fieldNames.consignee);
    const splitIds = watch(fieldNames.splitIds);
    const [selectedMap, setSelectedMap] = useState(() =>
        Object.values(clientsSplitsMap).reduce((map, splits) => {
            splits.forEach(split => {
                map[split._id] = false;
            });
            return map;
        }, {}));
    const [clientAddresses, setClientAddresses] = useState([]);
    const [clientSplits, setClientSplits] = useState([]);

    /* Register orderIds on mount and set client orders if this is an edit */
    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {
            register({ name: fieldNames.splitIds },
                { validate: ids => ids.length > 0 || errorMessages.atLeastOneOrder });
            if (isEdit && chosenClient) {
                setClientSplits([...clientsSplitsMap[chosenClient._id]]);
                setSelectedMap(prevMap => {
                    initialSplitsIds.forEach(id => {
                        if (prevMap.hasOwnProperty(id)) prevMap[id] = true;
                    });
                    return { ...prevMap };
                });
                setClientAddresses(chosenClient.addresses);
            }
            mounted.current = true;
        }
    }, [register, chosenClient, clientsSplitsMap, initialSplitsIds, isEdit]);

    // Note: initialize prev client to initial consignee in case it is an edit or else
    // the first render will cause the useEffect to run
    const prevClient = useRef(shipment?.consignee || null);
    useEffect(() => {
        if (chosenClient && prevClient.current !== chosenClient) {
            setClientAddresses([...chosenClient.addresses]);
            setValue(fieldNames.consigneeAdd, null);
            setClientSplits([...clientsSplitsMap[chosenClient._id]]);
            prevClient.current = chosenClient;
        } else if (!chosenClient && prevClient.current !== chosenClient) {
            setClientAddresses([]);
            setValue(fieldNames.consigneeAdd, null);
            setValue(fieldNames.splitIds, []);
            setClientSplits([]);
            if (prevClient.current) {
                setSelectedMap(prevMap => {
                    const newMap = { ...prevMap };
                    if (prevClient.current) {
                        clientsSplitsMap[prevClient.current._id].forEach(split => {
                            newMap[split._id] = false;
                        });
                    }
                    return newMap;
                });
            }
            prevClient.current = chosenClient;
        }
    }, [setValue, chosenClient, clientsSplitsMap]);

    const createCheckboxSelectionHandler = useCallback(
        (splitId) => (e) => {
            setSelectedMap(prevMap => ({
                ...prevMap,
                [splitId]: e.target.checked
            }));
            const currIds = getValues(fieldNames.splitIds);
            if (e.target.checked) setValue(fieldNames.splitIds, [...currIds, splitId]);
            else setValue(fieldNames.splitIds, currIds.filter(id => id !== splitId));
        }, [getValues, setValue]);

    const onPrevClick = useCallback(
        () => {
            if (isEdit) history.push(`/home/shipments/${ shipmentId }`);
            else history.push('/home/shipments');
        }, [history, shipmentId, isEdit]);

    const onSubmit = useCallback(data => {
        const actualData = {
            ...data,
            sellerAdd: addressToDocAddress(data.sellerAdd),
            consignee: data.consignee._id,
            consigneeAdd: addressToDocAddress(data.consigneeAdd)
        };
        if (isEdit) dispatch(updateShipmentShell({ shipmentId, update: actualData }));
        else {
            actualData.seller = companyId;
            actualData.createdBy = userId;
            dispatch(createShipment({ shipment: actualData }));
        }
    }, [dispatch, companyId, isEdit, shipmentId, userId]);

    const columns = useMemo(() => [
        {
            field: 'selected',
            headerName: null,
            renderCell: row =>
                <Checkbox
                    color="primary"
                    onChange={ createCheckboxSelectionHandler(row._id) }
                    checked={ row.selected }
                />
        },
        { field: 'ref', headerName: tableHeaderLabels.ref },
        { field: 'clientRef', headerName: tableHeaderLabels.clientRef },
        {
            field: 'quantity',
            headerName: tableHeaderLabels.quantity,
            format: row => formatItemsTotalQuantities(row.quantity, itemUnitsMap, LOCALE)
        },
        {
            field: 'crd',
            headerName: tableHeaderLabels.crd,
            type: 'date'
        },
        { field: 'del', headerName: tableHeaderLabels.del, align: 'center' },
        {
            field: 'production',
            headerName: tableHeaderLabels.production,
            renderCell: (params) =>
                <OrderStatusDisplay status={ params.production }/>,
            align: 'center',
            width: 120
        },
        {
            field: 'qa',
            headerName: tableHeaderLabels.qa,
            renderCell: (params) =>
                <OrderStatusDisplay status={ params.qa }/>,
            align: 'center',
            width: 120
        },
        { field: 'notes', headerName: tableHeaderLabels.notes },
        { field: 'fulfilled', headerName: tableHeaderLabels.fulfilled, align: 'center' }
    ], [createCheckboxSelectionHandler, itemUnitsMap]);

    const rows = useMemo(() =>
        clientSplits.map(split => ({
            _id: split._id,
            selected: selectedMap[split._id],
            ref: split.ref,
            clientRef: "Example client Ref",
            quantity: split.quantity,
            crd: split.crd,
            del: "Delivery Method",
            // del: getOptionLabel(order.del, LOCALE),
            production: split.production.status,
            qa: split.qa.status,
            notes: split.notes,
            fulfilled: getFulfilledPercentage(splitsShippedQuantityMap[split._id], getQuantityTotalCount(split.quantity))
        })), [clientSplits, selectedMap, splitsShippedQuantityMap]);

    const options = useMemo(() => ({
        table: {
            dense: true
        },
        foot: {
            pagination: 'hide'
        }
    }), []);

    return (
        <>
            <Paper className={ classes.container }>
                <Title1 title={ title } className={ classes.newShipmentLabel }/>
                { errs.length > 0 && <ErrorSnackbar error={ errs }/> }
                <FormContainer>
                    <RHFAutoComplete
                        rhfControl={ control }
                        name={ fieldNames.sellerAdd }
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
                        name={ fieldNames.consignee }
                        label={ labels.client }
                        options={ clients }
                        getOptionLabel={ client => client.name }
                        getOptionSelected={ (option, value) => option._id === value._id || !value.active }
                        required={ errorMessages.missingConsignee }
                        error={ !!errors.consignee }
                    />
                    <RHFAutoComplete
                        rhfControl={ control }
                        name={ fieldNames.consigneeAdd }
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
                    { splitIds.map((id) =>
                        <Chip
                            key={ id }
                            component="li"
                            label={ splitsMap[id].ref }
                            className={ classes.chip }
                        />) }
                </Box>
                <Table columns={ columns } rows={ rows } options={ options }/>
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
