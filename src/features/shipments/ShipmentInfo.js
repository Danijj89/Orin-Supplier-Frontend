import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyActiveAddresses, selectCompanyAddress, selectCompanyPorts } from '../home/duck/selectors.js';
import { selectClientActiveAddresses, selectClientAddress } from '../clients/duck/selectors.js';
import { Grid } from '@material-ui/core';
import { formatAddress } from '../shared/utils/format.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import {
    billOfLandingTypesOptions,
    incotermOptions
} from '../../app/utils/options/options.js';
import SideTextField from '../shared/inputs/SideTextField.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { updateShipment } from './duck/thunks.js';
import { addressToDocAddress } from '../shared/utils/entityConversion.js';
import { makeStyles } from '@material-ui/core/styles';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import RHFDateField from '../shared/rhf/inputs/RHFDateField.js';
import { useParams } from 'react-router-dom';
import { selectShipmentById } from './duck/selectors.js';
import { selectDeliveryMethods } from '../../app/duck/selectors.js';
import { getDeliveryMethodLabel } from '../../app/utils/options/getters.js';

const {
    partiesTitleLabel,
    orderInfoTitleLabel,
    shippingTitleLabel,
    formLabels,
    submitButtonLabel,
    errorMessages
} = LANGUAGE.shipment.editShipment.shipmentInfo;

const useStyles = makeStyles((theme) => ({
    shipmentCards: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2)
    }
}));

const ShipmentInfo = React.memo(function ShipmentInfo() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id: shipmentId } = useParams();
    const shipment = useSelector(state => selectShipmentById(state, shipmentId));
    const deliveryMethodOptions = useSelector(selectDeliveryMethods);
    const sellerAddresses = useSelector(selectCompanyActiveAddresses);
    const consigneeAddresses = useSelector(state => selectClientActiveAddresses(state, shipment.consignee));
    const ports = useSelector(selectCompanyPorts);

    const initialSellerAddress = useSelector(state => selectCompanyAddress(state, shipment.sellerAdd.addressId));
    const initialConsigneeAddress = useSelector(
        state => selectClientAddress(state, {
            clientId: shipment.consignee,
            addressId: shipment.consigneeAdd.addressId
        }));
    const initialShipAddress = useSelector(
        state => selectClientAddress(state, {
            clientId: shipment.consignee,
            addressId: shipment?.shipAdd?.addressId
        }));

    const { register, control, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            sellerAdd: initialSellerAddress,
            consigneeAdd: initialConsigneeAddress,
            shipAdd: initialShipAddress || null,
            crd: shipment.crd || null,
            incoterm: shipment.incoterm || null,
            bolType: shipment.bolType || null,
            coo: shipment.coo,
            clientRefs: shipment.clientRefs,
            payRefs: shipment.payRefs,
            del: shipment.del || null,
            pol: shipment.pol || null,
            pod: shipment.pod || null,
            carrier: shipment.carrier,
            eta: shipment.eta || null,
            etd: shipment.etd || null
        }
    });

    const onSubmit = (data) => {
        data.sellerAdd = addressToDocAddress(data.sellerAdd);
        data.consigneeAdd = addressToDocAddress(data.consigneeAdd);
        data.shipAdd = addressToDocAddress(data.shipAdd);
        dispatch(updateShipment({ shipmentId, update: data }));
    };

    return (
        <form onSubmit={ handleSubmit(onSubmit) } autoComplete="off">
            <InfoCard
                title={ partiesTitleLabel }
                className={ classes.shipmentCards }
                content={
                    <Grid container>
                        <Grid item xs={ 4 }>
                            <RHFAutoComplete
                                rhfControl={ control }
                                name="sellerAdd"
                                label={ formLabels.sellerAdd }
                                options={ sellerAddresses }
                                getOptionLabel={ address => formatAddress(address) }
                                getOptionSelected={ (option, value) => option._id === value._id || !value.active }
                                error={ !!errors.sellerAdd }
                                required={ errorMessages.missingSellerAdd }
                                rows={ 6 }
                                rowsMax={ 8 }
                            />
                        </Grid>
                        <Grid item xs={ 4 }>
                            <RHFAutoComplete
                                rhfControl={ control }
                                name="consigneeAdd"
                                label={ formLabels.consigneeAdd }
                                options={ consigneeAddresses }
                                getOptionLabel={ address => formatAddress(address) }
                                getOptionSelected={ (option, value) => option._id === value._id || !value.active }
                                error={ !!errors.consigneeAdd }
                                required={ errorMessages.missingConsigneeAdd }
                                rows={ 6 }
                                rowsMax={ 8 }
                            />
                        </Grid>
                        <Grid item xs={ 4 }>
                            <RHFAutoComplete
                                rhfControl={ control }
                                name="shipAdd"
                                label={ formLabels.shipAdd }
                                options={ consigneeAddresses }
                                getOptionLabel={ address => formatAddress(address) }
                                getOptionSelected={ (option, value) => option._id === value._id || !value.active }
                                rows={ 6 }
                                rowsMax={ 8 }
                            />
                        </Grid>
                    </Grid>
                }
            />
            <InfoCard
                className={ classes.shipmentCards }
                title={ orderInfoTitleLabel }
                content={
                    <Grid container>
                        <Grid container item justify="flex-end" xs={ 6 }>
                            <RHFDateField
                                rhfControl={ control }
                                name="crd"
                                label={ formLabels.crd }
                            />
                            <RHFAutoComplete
                                rhfControl={ control }
                                name="incoterm"
                                label={ formLabels.incoterm }
                                options={ incotermOptions }
                            />
                            <SideTextField
                                label={ formLabels.clientRefs }
                                name="clientRefs"
                                inputRef={ register }
                            />
                        </Grid>
                        <Grid container item justify="flex-end" xs={ 6 }>
                            <RHFAutoComplete
                                rhfControl={ control }
                                name="bolType"
                                label={ formLabels.bolType }
                                options={ billOfLandingTypesOptions }
                            />
                            <SideTextField
                                label={ formLabels.payRefs }
                                name="payRefs"
                                inputRef={ register }
                            />
                            <SideTextField
                                label={ formLabels.coo }
                                name="coo"
                                inputRef={ register }
                            />
                        </Grid>
                    </Grid>
                }
            />
            <InfoCard
                className={ classes.shipmentCards }
                title={ shippingTitleLabel }
                content={
                    <Grid container>
                        <Grid container item justify="flex-end" xs={ 6 }>
                            <RHFAutoComplete
                                rhfControl={ control }
                                name="del"
                                label={ formLabels.del }
                                options={ deliveryMethodOptions }
                                getOptionLabel={ method => getDeliveryMethodLabel(method) }
                                getOptionSelected={ (option, value) => option.id === value.id }
                            />
                            <RHFAutoComplete
                                rhfControl={ control }
                                freeSolo
                                autoSelect
                                name="pol"
                                label={ formLabels.pol }
                                options={ ports }
                            />
                            <RHFAutoComplete
                                rhfControl={ control }
                                freeSolo
                                autoSelect
                                name="pod"
                                label={ formLabels.pod }
                                options={ ports }
                            />
                        </Grid>
                        <Grid container item justify="flex-end" xs={ 6 }>
                            <SideTextField
                                label={ formLabels.carrier }
                                name="carrier"
                                inputRef={ register }
                            />
                            <RHFDateField
                                rhfControl={ control }
                                name="etd"
                                label={ formLabels.etd }
                            />
                            <RHFDateField
                                rhfControl={ control }
                                name="eta"
                                label={ formLabels.eta }
                            />
                        </Grid>
                    </Grid>
                }
            />
            <ThemedButton type="submit">{ submitButtonLabel }</ThemedButton>
        </form>
    )
});

export default ShipmentInfo;