import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyActiveAddresses, selectCompanyPorts } from '../home/duck/selectors.js';
import { Grid } from '@material-ui/core';
import { formatAddress } from '../shared/utils/format.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { LANGUAGE, LOCALE } from '../../app/utils/constants.js';
import SideTextField from '../shared/inputs/SideTextField.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { updateShipment } from './duck/thunks.js';
import { addressToDocAddress } from '../shared/utils/entityConversion.js';
import { makeStyles } from '@material-ui/core/styles';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import RHFDateField from '../shared/rhf/inputs/RHFDateField.js';
import { useParams } from 'react-router-dom';
import { selectPopulatedShipmentById } from './duck/selectors.js';
import {
    selectBillOfLandingTypes,
    selectCountries,
    selectDeliveryMethods,
    selectIncoterms
} from '../../app/duck/selectors.js';
import { getOptionId, getOptionLabel } from '../../app/utils/options/getters.js';
import { selectClientActiveAddresses } from '../clients/duck/selectors.js';

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

    const deliveryMethodOptions = useSelector(selectDeliveryMethods);
    const billOfLandingTypeOptions = useSelector(selectBillOfLandingTypes);
    const sellerAddresses = useSelector(selectCompanyActiveAddresses);
    const ports = useSelector(selectCompanyPorts);
    const incotermOptions = useSelector(selectIncoterms);
    const countryOptions = useSelector(selectCountries);

    const shipment = useSelector(state => selectPopulatedShipmentById(state, { shipmentId }));
    const consigneeAddresses = useSelector(
        state => selectClientActiveAddresses(state, { clientId: shipment.consignee._id }));

    const { register, control, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            sellerAdd: shipment.sellerAdd,
            consigneeAdd: shipment.consigneeAdd,
            shipAdd: shipment.shipAdd || null,
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
        if (data.shipAdd) data.shipAdd = addressToDocAddress(data.shipAdd);
        if (data.del) data.del = getOptionId(data.del);
        if (data.bolType) data.bolType = getOptionId(data.bolType);
        if (data.coo) data.coo = getOptionId(data.coo);
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
                                options={ billOfLandingTypeOptions }
                                getOptionLabel={ option => getOptionLabel(option) }
                                getOptionSelected={ (option, value) => option.id === value.id }
                            />
                            <SideTextField
                                label={ formLabels.payRefs }
                                name="payRefs"
                                inputRef={ register }
                            />
                            <RHFAutoComplete
                                rhfControl={ control }
                                name="coo"
                                label={ formLabels.coo }
                                options={ countryOptions }
                                getOptionLabel={ option => getOptionLabel(option, LOCALE) }
                                getOptionSelected={ (option, value) => option.id === value.id }
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
                                getOptionLabel={ option => getOptionLabel(option, LOCALE) }
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