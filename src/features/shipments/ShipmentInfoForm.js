import React from 'react';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { LANGUAGE } from '../../app/constants.js';
import { Grid } from '@material-ui/core';
import SideAutoComplete from '../shared/inputs/SideAutoComplete.js';
import { deliveryMethodOptions } from '../shared/constants.js';
import { Controller } from 'react-hook-form';
import SideTextField from '../shared/inputs/SideTextField.js';
import SideDateField from '../shared/inputs/SideDateField.js';

const {
    titleLabel,
    formLabels
} = LANGUAGE.shipment.editShipment.shipmentInfo;

const ShipmentInfoForm = React.memo(function ShipmentInfoForm({ ports, register, control }) {

    return (
        <InfoCard
            title={ titleLabel }
            content={
                <Grid container>
                    <Grid container item justify="flex-end" xs={6}>
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
                    <Grid container item justify="flex-end" xs={6}>
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
    )
});

export default ShipmentInfoForm;