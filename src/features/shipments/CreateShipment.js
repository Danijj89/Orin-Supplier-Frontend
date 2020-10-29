import React from 'react';
import { Box, Divider, Typography } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import FormContainer from '../shared/wrappers/FormContainer.js';
import SideAutoComplete from '../shared/inputs/SideAutoComplete.js';
import { Controller, useForm } from 'react-hook-form';
import { formatAddress } from '../shared/utils/format.js';

const {
    titleLabel,
    companyAddressLabel
} = LANGUAGE.shipments.createShipment;

export default function CreateShipment({ company }) {
    const { addresses, defaultAddress } = company;

    const { control, errors, getValues } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            fromAdd: defaultAddress
        }
    });


    return (
        <Box>
            <Typography variant="h5">{ titleLabel }</Typography>
            <Divider/>
            <FormContainer>
                <Controller
                    render={ (props) =>
                        <SideAutoComplete
                            { ...props }
                            options={ addresses.filter(a => a.active) }
                            label={ companyAddressLabel }
                            error={ !!errors.fromAdd }
                            getOptionLabel={ address => formatAddress(address) }
                            getOptionSelected={ address => address._id === getValues('fromAdd')._id
                                || address._id === getValues('fromAdd').addressId }
                            required
                        />
                    }
                    name="fromAdd"
                    control={ control }
                    rules={ { required: true } }
                />
            </FormContainer>
        </Box>
    )
}
