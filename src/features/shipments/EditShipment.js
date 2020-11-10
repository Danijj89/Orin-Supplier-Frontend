import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Card, Typography } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import NavTabs from '../shared/components/NavTabs.js';
import PartiesForm from './PartiesForm.js';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectCompanyActiveAddresses, selectCompanyPorts } from '../home/duck/selectors.js';
import { selectClientActiveAddresses } from '../clients/duck/selectors.js';
import { useParams } from 'react-router-dom';
import { selectShipmentById } from './duck/selectors.js';
import OrdersInfoForm from './OrdersInfoForm.js';
import ShipmentInfoForm from './ShipmentInfoForm.js';
import Footer from '../shared/components/Footer.js';
import RHFProductTable, { validateItems } from '../shared/rhf/forms/RHFProductTable.js';
import { selectActiveProducts } from '../products/duck/selectors.js';
import RHFMeasureTable from '../shared/rhf/forms/RHFMeasureTable.js';

const {
    titleLabel,
    tabsLabelsMap,
    prevButtonLabel,
    nextButtonLabel
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

const EditShipment = React.memo(function EditShipment() {
    const history = useHistory();
    const { id } = useParams();
    const shipment = useSelector(state => selectShipmentById(state, id));
    const products = useSelector(selectActiveProducts);
    const sellerAddresses = useSelector(selectCompanyActiveAddresses);
    const consigneeAddresses = useSelector(state => selectClientActiveAddresses(state, shipment.consignee));
    const ports = useSelector(selectCompanyPorts);
    const [tabValue, setTabValue] = useState('shipment');

    const rhfMethods = useForm({
        mode: 'onSubmit',
        defaultValues: {
            sellerAdd: sellerAddresses.find(a => a._id === shipment.sellerAdd.addressId),
            consigneeAdd: consigneeAddresses.find(a => a._id === shipment.consigneeAdd.addressId),
            shipAdd: consigneeAddresses.find(a => a._id === shipment.shipAdd?.addressId) || null,
            crd: shipment.crd || null,
            incoterm: shipment.incoterm,
            clientRef: shipment.clientRef,
            pay: shipment.pay,
            bolType: shipment.bolType,
            coo: shipment.coo,
            del: shipment.del,
            pol: shipment.pol,
            pod: shipment.pod,
            carrier: shipment.carrier,
            eta: shipment.eta || null,
            etd: shipment.etd || null,
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
    }, [register]);

    const onPrevClick = useCallback(() => history.goBack(), [history]);

    const onSubmit = useCallback(rhfMethods.handleSubmit(data => {
        console.log(data)
    }), []);

    return (
        <Card>
            <Typography variant="h5">{ titleLabel }</Typography>
            <NavTabs
                tabsLabelsMap={ tabsLabelsMap }
                tabValue={ tabValue }
                onChange={ setTabValue }
            />
            <Box>
                <Box hidden={ tabValue !== 'shipment' }>
                    <PartiesForm
                        sellerAddresses={ sellerAddresses }
                        consigneeAddresses={ consigneeAddresses }
                        errors={ errors }
                        control={ control }
                    />
                    <OrdersInfoForm register={ register } control={ control }/>
                    <ShipmentInfoForm ports={ ports } register={ register } control={ control }/>
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
            </Box>
            <Footer
                prevLabel={ prevButtonLabel }
                nextLabel={ nextButtonLabel }
                onPrevClick={ onPrevClick }
                onNextClick={ onSubmit }
            />
        </Card>
    )
});

export default EditShipment;