import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Card, Typography } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import NavTabs from '../shared/components/NavTabs.js';
import PartiesForm from './PartiesForm.js';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectCurrentCompany } from '../home/duck/selectors.js';
import { selectClientById } from '../clients/duck/selectors.js';
import { useParams } from 'react-router-dom';
import { selectShipmentById } from './duck/selectors.js';
import OrdersInfoForm from './OrdersInfoForm.js';
import ShipmentInfoForm from './ShipmentInfoForm.js';
import Footer from '../shared/components/Footer.js';
import RHFProductTable from '../shared/rhf/forms/RHFProductTable.js';
import { selectActiveProducts } from '../products/duck/selectors.js';

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

const EditShipment = React.memo(function EditShipment() {
    const history = useHistory();
    const { id } = useParams();
    const shipment = useSelector(state => selectShipmentById(state, id));
    const company = useSelector(selectCurrentCompany);
    const client = useSelector(state => selectClientById(state, shipment.consignee));
    const products = useSelector(selectActiveProducts);
    const sellerAddresses = company.addresses.filter(a => a.active);
    const consigneeAddresses = client.addresses.filter(a => a.active);
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
            currency: shipment.currency,
            items: shipment.items,
            quantity: shipment.quantity,
            total: shipment.total,
            measurementUnit: shipment.measurementUnit,
            weightUnit: shipment.weightUnit,
            package: shipment.package,
            netWeight: shipment.netWeight,
            grossWeight: shipment.grossWeight,
            dimension: shipment.dimension,
            ciCustom1: shipment.ciCustom1,
            ciCustom2: shipment.ciCustom2,
            plCustom1: shipment.plCustom1,
            plCustom2: shipment.plCustom2,
        }
    });
    const { register, control, errors, setValue, getValues, reset } = rhfMethods;

    const validateItems = useCallback((items) => true, []);

    useEffect(() => {
        register({ name: productTableFieldNames.items }, { validate: validateItems });
        register({ name: productTableFieldNames.custom1 });
        register({ name: productTableFieldNames.custom2 });
        register({ name: productTableFieldNames.quantity });
        register({ name: productTableFieldNames.total });
    }, [register, validateItems]);

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
                { tabValue === 'shipment' &&
                <>
                    <PartiesForm
                        sellerAddresses={ sellerAddresses }
                        consigneeAddresses={ consigneeAddresses }
                        rhfMethods={ rhfMethods }
                    />
                    <OrdersInfoForm rhfMethods={ rhfMethods }/>
                    <ShipmentInfoForm rhfMethods={ rhfMethods }/>
                </>
                }
                { tabValue === 'products' &&
                <RHFProductTable
                    rhfErrors={ errors }
                    rhfControl={ control }
                    rhfSetValue={ setValue }
                    rhfGetValues={ getValues }
                    rhfReset={ reset }
                    products={ products }
                    fieldNames={ productTableFieldNames }
                />
                }
                {/*{ tabValue === 'measures' && <ShipmentMeasures /> }*/ }
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