import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyActiveAddresses, selectCompanyPorts } from '../home/duck/selectors.js';
import { selectClientActiveAddresses } from '../clients/duck/selectors.js';
import { Grid } from '@material-ui/core';
import SideAutoComplete from '../shared/inputs/SideAutoComplete.js';
import { formatAddress } from '../shared/utils/format.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { LANGUAGE } from '../../app/constants.js';
import SideDateField from '../shared/inputs/SideDateField.js';
import { billOfLandingTypesOptions, deliveryMethodOptions, incotermOptions } from '../shared/constants.js';
import SideTextField from '../shared/inputs/SideTextField.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { updateShipmentInfo } from './duck/thunks.js';
import { addressToDocAddress } from '../shared/utils/entityConversion.js';

const {
    partiesTitleLabel,
    orderInfoTitleLabel,
    shippingTitleLabel,
    formLabels,
    submitButtonLabel,
    errorMessages
} = LANGUAGE.shipment.editShipment.shipmentInfo;

const ShipmentInfo = React.memo(function ShipmentInfo({ shipment }) {
    const dispatch = useDispatch();
    const sellerAddresses = useSelector(selectCompanyActiveAddresses);
    const consigneeAddresses = useSelector(state => selectClientActiveAddresses(state, shipment.consignee));
    const ports = useSelector(selectCompanyPorts);

    const { register, control, errors, watch, handleSubmit } = useForm({
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

    const sellerAdd = watch('sellerAdd');
    const consigneeAdd = watch('consigneeAdd');
    const shipAdd = watch('shipAdd');

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
                content={
                    <Grid container>
                        <Grid item xs={ 4 }>
                            <Controller
                                render={ (props) =>
                                    <SideAutoComplete
                                        { ...props }
                                        options={ sellerAddresses }
                                        label={ formLabels.sellerAdd }
                                        error={ !!errors.sellerAdd }
                                        rows={ 8 }
                                        getOptionLabel={ address => formatAddress(address) }
                                        getOptionSelected={ address => address._id === sellerAdd._id
                                            || address._id === sellerAdd.addressId }
                                        required
                                    />
                                }
                                name="sellerAdd"
                                control={ control }
                                rules={ { required: errorMessages.missingSellerAdd } }
                            />
                        </Grid>
                        <Grid item xs={ 4 }>
                            <Controller
                                render={ (props) => (
                                    <SideAutoComplete
                                        { ...props }
                                        options={ consigneeAddresses }
                                        label={ formLabels.consigneeAdd }
                                        error={ !!errors.consigneeAdd }
                                        rows={ 8 }
                                        getOptionLabel={ address => formatAddress(address) }
                                        getOptionSelected={ address => address._id === consigneeAdd._id
                                            || address._id === consigneeAdd.addressId }
                                        required
                                    />
                                ) }
                                name="consigneeAdd"
                                control={ control }
                                rules={ { required: errorMessages.missingConsigneeAdd } }
                            />
                        </Grid>
                        <Grid item xs={ 4 }>
                            <Controller
                                render={ (props) => (
                                    <SideAutoComplete
                                        { ...props }
                                        options={ consigneeAddresses }
                                        label={ formLabels.shipAdd }
                                        rows={ 8 }
                                        getOptionLabel={ address => formatAddress(address) }
                                        getOptionSelected={ address => address._id === shipAdd._id
                                            || address._id === shipAdd.addressId }
                                    />
                                ) }
                                name="shipAdd"
                                control={ control }
                            />
                        </Grid>
                    </Grid>
                }
            />
            <InfoCard
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
                            <Controller
                                render={ (props) => (
                                    <SideAutoComplete
                                        { ...props }
                                        options={ incotermOptions }
                                        label={ formLabels.incoterm }
                                    />
                                ) }
                                name="incoterm"
                                control={ control }
                            />
                        </Grid>
                        <Grid container item justify="flex-end" xs={ 6 }>
                            <Controller
                                render={ (props) => (
                                    <SideAutoComplete
                                        { ...props }
                                        options={ billOfLandingTypesOptions }
                                        label={ formLabels.bolType }
                                    />
                                ) }
                                name="bolType"
                                control={ control }
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
                title={ shippingTitleLabel }
                content={
                    <Grid container>
                        <Grid container item justify="flex-end" xs={ 6 }>
                            <Controller
                                render={ (props) => (
                                    <SideAutoComplete
                                        { ...props }
                                        options={ deliveryMethodOptions }
                                        label={ formLabels.del }
                                    />
                                ) }
                                name="del"
                                control={ control }
                            />
                            <Controller
                                render={ (props) => (
                                    <SideAutoComplete
                                        { ...props }
                                        freeSolo
                                        autoSelect
                                        options={ ports }
                                        label={ formLabels.pol }
                                    />
                                ) }
                                name="pol"
                                control={ control }
                            />
                            <Controller
                                render={ (props) => (
                                    <SideAutoComplete
                                        { ...props }
                                        freeSolo
                                        autoSelect
                                        options={ ports }
                                        label={ formLabels.pod }
                                    />
                                ) }
                                name="pod"
                                control={ control }
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