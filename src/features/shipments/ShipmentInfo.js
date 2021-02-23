import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectActiveCompanyAddresses,
    selectCompanyPorts,
} from 'features/home/duck/home/selectors.js';
import { Grid } from '@material-ui/core';
import { formatAddress } from '../shared/utils/format.js';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import SideTextField from '../shared/inputs/SideTextField.js';
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
    selectIncoterms,
} from 'app/duck/selectors.js';
import {
    getOptionId,
    getOptionLabel,
} from 'app/utils/options/getters.js';
import { selectClientActiveAddresses } from '../clients/duck/selectors.js';
import ContainerSelectorButton from './ContainersInfoDialog.js';
import Footer from '../shared/components/Footer.js';
import RHFCheckBox from 'features/shared/rhf/inputs/RHFCheckBox.js';
import { getShipmentURL } from 'features/shipments/utils/urls.js';

const {
    titles,
    formLabels,
    buttons,
    errorMessages
} = LANGUAGE.shipment.editShipment;

const useStyles = makeStyles((theme) => ({
    shipmentCards: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2),
    },
    lastShipmentCard: {
        marginBottom: theme.spacing(10),
    },
    containerButton: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}));

const ShipmentInfo = React.memo(function ShipmentInfo({ onCancel }) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { id: shipmentId } = useParams();

    const deliveryMethodOptions = useSelector(selectDeliveryMethods);
    const billOfLandingTypeOptions = useSelector(selectBillOfLandingTypes);
    const sellerAddresses = useSelector(selectActiveCompanyAddresses);
    const ports = useSelector(selectCompanyPorts);
    const incotermOptions = useSelector(selectIncoterms);
    const countryOptions = useSelector(selectCountries);

    const shipment = useSelector((state) =>
        selectPopulatedShipmentById(state, { shipmentId })
    );
    const consigneeAddresses = useSelector((state) =>
        selectClientActiveAddresses(state, { clientId: shipment.consignee._id })
    );

    const { register, control, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            sellerAdd: shipment.sellerAdd,
            consigneeAdd: shipment.consigneeAdd,
            shipAdd: shipment.shipAdd || null,
            crd: shipment.crd || null,
            incoterm: shipment.incoterm || null,
            coo: shipment.coo,
            clientRefs: shipment.clientRefs,
            payRefs: shipment.payRefs,
            del: shipment.del || null,
            pol: shipment.pol || null,
            pod: shipment.pod || null,
            carrier: shipment.carrier,
            eta: shipment.eta || null,
            etd: shipment.etd || null,
            docCutOff: shipment.docCutOff || null,
            bol: shipment.bol,
            bolType: shipment.bolType || null,
            released: shipment.released
        },
    });

    const onSubmit = useCallback(data => {
        data.sellerAdd = addressToDocAddress(data.sellerAdd);
        data.consigneeAdd = addressToDocAddress(data.consigneeAdd);
        if (data.shipAdd) data.shipAdd = addressToDocAddress(data.shipAdd);
        if (data.del) data.del = getOptionId(data.del);
        if (data.bolType) data.bolType = getOptionId(data.bolType);
        if (data.coo) data.coo = getOptionId(data.coo);
        dispatch(updateShipment({ shipmentId, update: data }));
        history.push(getShipmentURL(shipmentId));
    }, [history, dispatch, shipmentId]);

    return (
        <>

            <form onSubmit={ handleSubmit(onSubmit) } autoComplete="off">
                <InfoCard
                    title={ titles.parties }
                    className={ classes.shipmentCards }
                    content={
                        <Grid container>
                            <Grid item xs={ 4 }>
                                <RHFAutoComplete
                                    rhfControl={ control }
                                    name="sellerAdd"
                                    label={ formLabels.sellerAdd }
                                    options={ sellerAddresses }
                                    getOptionLabel={ (address) =>
                                        formatAddress(address)
                                    }
                                    getOptionSelected={ (option, value) =>
                                        option._id === value._id || !value.active
                                    }
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
                                    getOptionLabel={ (address) =>
                                        formatAddress(address)
                                    }
                                    getOptionSelected={ (option, value) =>
                                        option._id === value._id || !value.active
                                    }
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
                                    getOptionLabel={ (address) =>
                                        formatAddress(address)
                                    }
                                    getOptionSelected={ (option, value) =>
                                        option._id === value._id || !value.active
                                    }
                                    rows={ 6 }
                                    rowsMax={ 8 }
                                />
                            </Grid>
                        </Grid>
                    }
                />
                <InfoCard
                    className={ classes.shipmentCards }
                    title={ titles.orderInfo }
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
                                    getOptionLabel={ (option) =>
                                        getOptionLabel(option, LOCALE)
                                    }
                                    getOptionSelected={ (option, value) =>
                                        option.id === value.id
                                    }
                                />
                            </Grid>
                        </Grid>
                    }
                />
                <InfoCard
                    className={ classes.shipmentCards }
                    title={ titles.shipping }
                    tools={
                        <ContainerSelectorButton
                            shipmentId={ shipmentId }
                            containerQ={ shipment.containerQ }
                            className={ classes.containerButton }
                        />
                    }
                    content={
                        <Grid container>
                            <Grid container item justify="flex-end" xs={ 6 }>
                                <RHFAutoComplete
                                    rhfControl={ control }
                                    name="del"
                                    label={ formLabels.del }
                                    options={ deliveryMethodOptions }
                                    getOptionLabel={ (option) =>
                                        getOptionLabel(option, LOCALE)
                                    }
                                    getOptionSelected={ (option, value) =>
                                        option.id === value.id
                                    }
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
                <InfoCard
                    className={ classes.lastShipmentCard }
                    title={ titles.documentStatus }
                    content={
                        <Grid container>
                            <Grid container item justify="flex-end" xs={ 6 }>
                                <SideTextField
                                    label={ formLabels.bol }
                                    name="bol"
                                    inputRef={ register }
                                />
                                <RHFAutoComplete
                                    rhfControl={ control }
                                    name="bolType"
                                    label={ formLabels.bolType }
                                    options={ billOfLandingTypeOptions }
                                    getOptionLabel={ (option) =>
                                        getOptionLabel(option)
                                    }
                                    getOptionSelected={ (option, value) =>
                                        option.id === value.id
                                    }
                                />
                            </Grid>
                            <Grid container item direction="column" alignItems="flex-end" justify="flex-end" xs={ 6 }>
                                <RHFCheckBox
                                    name="released"
                                    label={ formLabels.released }
                                    rhfControl={ control }
                                />
                                <RHFDateField
                                    rhfControl={ control }
                                    name="docCutOff"
                                    label={ formLabels.docCutOff }
                                />
                            </Grid>
                        </Grid>
                    }
                />
                <Footer
                    prevLabel={ buttons.cancel }
                    nextLabel={ buttons.submit }
                    onPrevClick={ onCancel }
                    nextButtonType="submit"
                />
            </form>
        </>
    );
});

export default ShipmentInfo;
