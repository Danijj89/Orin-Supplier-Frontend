import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyActiveAddresses, selectCompanyPorts } from '../home/duck/selectors.js';
import { selectClientActiveAddresses } from '../clients/duck/selectors.js';
import { Grid } from '@material-ui/core';
import { formatAddress } from '../shared/utils/format.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { LANGUAGE } from '../../app/constants.js';
import SideDateField from '../shared/inputs/SideDateField.js';
import {
    billOfLandingTypesOptions,
    deliveryMethodOptions,
    incotermOptions
} from '../shared/constants.js';
import SideTextField from '../shared/inputs/SideTextField.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { updateShipmentInfo } from './duck/thunks.js';
import { addressToDocAddress } from '../shared/utils/entityConversion.js';
import { makeStyles } from '@material-ui/core/styles';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';

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

const ShipmentInfo = React.memo(function ShipmentInfo({ shipment }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const sellerAddresses = useSelector(selectCompanyActiveAddresses);
    const consigneeAddresses = useSelector(state => selectClientActiveAddresses(state, shipment.consignee));
    const ports = useSelector(selectCompanyPorts);

    const { register, control, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            sellerAdd: sellerAddresses.find(a => a._id === shipment.sellerAdd.addressId),
            consigneeAdd: consigneeAddresses.find(a => a._id === shipment.consigneeAdd.addressId),
            shipAdd: consigneeAddresses.find(a => a._id === shipment.shipAdd?.addressId) || null,
            crd: shipment.crd || null,
            incoterm: shipment.incoterm || null,
            bolType: shipment.bolType || null,
            coo: shipment.coo,
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
        data.crd = data.crd?.toString();
        data.eta = data.eta?.toString();
        data.etd = data.etd?.toString();
        dispatch(updateShipmentInfo({ id: shipment._id, ...data }));
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
                                getOptionSelected={ (option, value) => option._id === value._id }
                                error={ !!errors.sellerAdd }
                                required={ errorMessages.missingSellerAdd }
                                rows={ 8 }
                            />
                        </Grid>
                        <Grid item xs={ 4 }>
                            <RHFAutoComplete
                                rhfControl={ control }
                                name="consigneeAdd"
                                label={ formLabels.consigneeAdd }
                                options={ consigneeAddresses }
                                getOptionLabel={ address => formatAddress(address) }
                                getOptionSelected={ (option, value) => option._id === value._id }
                                error={ !!errors.consigneeAdd }
                                required={ errorMessages.missingConsigneeAdd }
                                rows={ 8 }
                            />
                        </Grid>
                        <Grid item xs={ 4 }>
                            <RHFAutoComplete
                                rhfControl={ control }
                                name="shipAdd"
                                label={ formLabels.shipAdd }
                                options={ consigneeAddresses }
                                getOptionLabel={ address => formatAddress(address) }
                                getOptionSelected={ (option, value) => option._id === value._id }
                                rows={ 8 }
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
                            <Controller
                                render={ props =>
                                    <SideDateField
                                        { ...props }
                                        label={ formLabels.crd }
                                    />
                                }
                                name="crd"
                                control={ control }
                            />
                            <RHFAutoComplete
                                rhfControl={ control }
                                name="incoterm"
                                label={ formLabels.incoterm }
                                options={ incotermOptions }
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
                            <Controller
                                render={ props =>
                                    <SideDateField
                                        { ...props }
                                        label={ formLabels.etd }
                                    />
                                }
                                name="etd"
                                control={ control }
                            />
                            <Controller
                                render={ props =>
                                    <SideDateField
                                        { ...props }
                                        label={ formLabels.eta }
                                    />
                                }
                                name="eta"
                                control={ control }
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