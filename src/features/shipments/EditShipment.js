import React, { useCallback, useEffect, useState } from 'react';
import { Box, Card, Typography } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import NavTabs from '../shared/components/NavTabs.js';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectShipmentById, selectShipmentError, selectShipmentStatus } from './duck/selectors.js';
import RHFProductTable, { validateItems } from '../shared/rhf/forms/RHFProductTable.js';
import { selectActiveProducts } from '../products/duck/selectors.js';
import RHFMeasureTable from '../shared/rhf/forms/RHFMeasureTable.js';
import RHFConsolidationTable from '../shared/rhf/forms/RHFConsolidationTable.js';
import ShipmentInfo from './ShipmentInfo.js';
import Loader from '../shared/components/Loader.js';
import SuccessMessage from '../shared/components/SuccessMessage.js';
import { cleanShipmentStatus } from './duck/slice.js';
import ErrorDisplay from '../shared/components/ErrorDisplay.js';

const {
    titleLabel,
    tabsLabelsMap,
    successMessage
} = LANGUAGE.shipment.editShipment;

const productTableFieldNames = {
    custom1: 'ciCustom1',
    custom2: 'ciCustom2',
    currency: 'currency',
    items: 'items',
    quantity: 'quantity',
    total: 'total'
};

const measureTableFieldNames = {
    custom1: 'plCustom1',
    custom2: 'plCustom2',
    package: 'package',
    netWeight: 'netWeight',
    grossWeight: 'grossWeight',
    dimension: 'dimension',
    weightUnit: 'weightUnit',
    measurementUnit: 'measurementUnit',
    items: productTableFieldNames.items
};

const consolidationTableFieldNames = {
    custom1: 'coCustom1',
    custom2: 'coCustom2',
    package: 'coPackage',
    netWeight: 'coNetWeight',
    grossWeight: 'coGrossWeight',
    dimension: 'coDimension',
    weightUnit: measureTableFieldNames.weightUnit,
    measurementUnit: measureTableFieldNames.measurementUnit,
    items: 'coItems'
};

const EditShipment = React.memo(function EditShipment() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const shipmentStatus = useSelector(selectShipmentStatus);
    const shipmentError = useSelector(selectShipmentError);
    const shipment = useSelector(state => selectShipmentById(state, id));
    const products = useSelector(selectActiveProducts);
    const [tabValue, setTabValue] = useState('shipment');

    const onTabChange = useCallback(
        (newTab) => {
            setTabValue(newTab);
            dispatch(cleanShipmentStatus());
        },
        [dispatch]);

    const rhfMethods = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [productTableFieldNames.currency]: shipment.currency,
            [productTableFieldNames.items]: shipment.items,
            [productTableFieldNames.quantity]: shipment.quantity,
            [productTableFieldNames.total]: shipment.total,
            [measureTableFieldNames.measurementUnit]: shipment.measurementUnit,
            [measureTableFieldNames.weightUnit]: shipment.weightUnit,
            [measureTableFieldNames.package]: shipment.package,
            [measureTableFieldNames.netWeight]: shipment.netWeight,
            [measureTableFieldNames.grossWeight]: shipment.grossWeight,
            [measureTableFieldNames.dimension]: shipment.dimension,
            [productTableFieldNames.custom1]: shipment.ciCustom1,
            [productTableFieldNames.custom2]: shipment.ciCustom2,
            [measureTableFieldNames.custom1]: shipment.plCustom1,
            [measureTableFieldNames.custom2]: shipment.plCustom2,
            [consolidationTableFieldNames.custom1]: shipment.coCustom1,
            [consolidationTableFieldNames.custom2]: shipment.coCustom2,
            [consolidationTableFieldNames.package]: shipment.coPackage,
            [consolidationTableFieldNames.netWeight]: shipment.coNetWeight,
            [consolidationTableFieldNames.grossWeight]: shipment.coGrossWeight,
            [consolidationTableFieldNames.dimension]: shipment.coDimension,
            [consolidationTableFieldNames.items]: shipment.coItems || []
        }
    });
    const { register, control, errors, setValue, getValues } = rhfMethods;

    useEffect(() => {
        register({ name: productTableFieldNames.items }, { validate: validateItems });
        register({ name: productTableFieldNames.custom1 });
        register({ name: productTableFieldNames.custom2 });
        register({ name: productTableFieldNames.quantity });
        register({ name: productTableFieldNames.total });
        register({ name: measureTableFieldNames.custom1 });
        register({ name: measureTableFieldNames.custom2 });
        register({ name: measureTableFieldNames.package });
        register({ name: measureTableFieldNames.netWeight });
        register({ name: measureTableFieldNames.grossWeight });
        register({ name: measureTableFieldNames.dimension });
        register({ name: consolidationTableFieldNames.custom1 });
        register({ name: consolidationTableFieldNames.custom2 });
        register({ name: consolidationTableFieldNames.package });
        register({ name: consolidationTableFieldNames.netWeight });
        register({ name: consolidationTableFieldNames.grossWeight });
        register({ name: consolidationTableFieldNames.dimension });
        register({ name: consolidationTableFieldNames.items });
        dispatch(cleanShipmentStatus());
    }, [register, dispatch]);

    return (
        <Card>
            <Typography variant="h5">{ titleLabel }</Typography>
            <NavTabs
                tabsLabelsMap={ tabsLabelsMap }
                tabValue={ tabValue }
                onChange={ onTabChange }
            />
            { shipmentStatus === 'REJECTED' && <ErrorDisplay errors={ [shipmentError] }/> }
            { shipmentStatus === 'FULFILLED' && <SuccessMessage message={ successMessage }/> }
            { shipmentStatus === 'PENDING' && <Loader/> }
            <Box>
                <Box hidden={ tabValue !== 'shipment' }>
                    <ShipmentInfo shipment={ shipment }/>
                </Box>
                <Box hidden={ tabValue !== 'products' }>
                    <RHFProductTable
                        rhfRegister={ register }
                        rhfErrors={ errors }
                        rhfControl={ control }
                        rhfSetValue={ setValue }
                        rhfGetValues={ getValues }
                        products={ products }
                        fieldNames={ productTableFieldNames }
                        isEdit
                    />
                </Box>
                <Box hidden={ tabValue !== 'measures' }>
                    <RHFMeasureTable
                        rhfRegister={ register }
                        rhfControl={ control }
                        rhfGetValues={ getValues }
                        rhfSetValue={ setValue }
                        rhfErrors={ errors }
                        fieldNames={ measureTableFieldNames }
                    />
                </Box>
                <Box hidden={ tabValue !== 'consolidation' }>
                    <RHFConsolidationTable
                        rhfRegister={ register }
                        rhfControl={ control }
                        rhfSetValue={ setValue }
                        rhfGetValues={ getValues }
                        rhfErrors={ errors }
                        fieldNames={ consolidationTableFieldNames }
                    />
                </Box>
            </Box>
        </Card>
    )
});

export default EditShipment;