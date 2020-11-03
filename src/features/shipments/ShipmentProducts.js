import React from 'react';
import ShipmentProductTable from './ShipmentProductTable.js';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Controller, useFormContext } from 'react-hook-form';
import SideAutoComplete from '../shared/inputs/SideAutoComplete.js';
import { currenciesOptions, measurementUnitsOptions, weightUnitsOptions } from '../shared/constants.js';
import { LANGUAGE } from '../../app/constants.js';

const useStyles = makeStyles((theme) => ({
    toolbarContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    }
}));

const {
    formLabels,
    errorMessages
} = LANGUAGE.shipment.editShipment.products;

export default function ShipmentProducts() {
    const classes = useStyles();
    const { control, errors } = useFormContext();

    return (
        <Box>
            <Box className={ classes.toolbarContainer }>
                <Controller
                    render={ props =>
                        <SideAutoComplete
                            { ...props }
                            options={ currenciesOptions }
                            label={ formLabels.currency }
                            error={ !!errors.currency }
                            required
                        />
                    }
                    name="currency"
                    control={ control }
                    rules={ { required: errorMessages.missingCurrency } }
                />
                <Controller
                    render={ props =>
                        <SideAutoComplete
                            { ...props }
                            options={ measurementUnitsOptions }
                            label={ formLabels.measurementUnit }
                        />
                    }
                    name="measurementUnit"
                    control={ control }
                />
                <Controller
                    render={ props =>
                        <SideAutoComplete
                            { ...props }
                            options={ weightUnitsOptions }
                            label={ formLabels.weightUnit }
                        />
                    }
                    name="weightUnit"
                    control={ control }
                />
            </Box>
            <ShipmentProductTable/>
        </Box>
    )
}