import React from 'react';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { LANGUAGE } from '../../app/constants.js';
import { Grid } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import SideDateField from '../shared/inputs/SideDateField.js';
import SideAutoComplete from '../shared/inputs/SideAutoComplete.js';
import { billOfLandingTypesOptions, incotermOptions } from '../shared/constants.js';
import SideTextField from '../shared/inputs/SideTextField.js';

const {
    titleLabel,
    formLabels
} = LANGUAGE.shipment.editShipment.ordersInfo;

const OrdersInfoForm = React.memo(function OrdersInfoForm({ register, control }) {
    return (
        <InfoCard
            title={ titleLabel }
            content={
                <Grid container>
                    <Grid container item justify="flex-end" xs={6}>
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
                        <SideTextField
                            label={ formLabels.clientRef }
                            name="clientRef"
                            inputRef={ register }
                        />
                    </Grid>
                    <Grid container item justify="flex-end" xs={6}>
                        <SideTextField
                            label={ formLabels.pay }
                            name="pay"
                            inputRef={ register }
                        />
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
    )
});

export default OrdersInfoForm;