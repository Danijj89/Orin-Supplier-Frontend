import React from 'react';
import InfoCard from '../shared/wrappers/InfoCard.js';
import { LANGUAGE } from '../../app/constants.js';
import { Grid } from '@material-ui/core';
import { Controller, useWatch } from 'react-hook-form';
import SideAutoComplete from '../shared/inputs/SideAutoComplete.js';
import { formatAddress } from '../shared/utils/format.js';

const {
    titleLabel,
    formLabels,
    errorMessages
} = LANGUAGE.shipment.editShipment.parties;

const PartiesForm = React.memo(function PartiesForm(
    { sellerAddresses, consigneeAddresses, control, errors }) {

    const sellerAdd = useWatch({
        control,
        name: 'sellerAdd'
    });
    const consigneeAdd = useWatch({
        control,
        name: 'consigneeAdd'
    });
    const shipAdd = useWatch({
        control,
        name: 'shipAdd'
    });

    return (
        <InfoCard
            title={ titleLabel }
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
    )
});

export default PartiesForm;