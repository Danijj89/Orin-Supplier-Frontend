import React from 'react';
import { Grid } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import { currenciesOptions } from '../shared/constants.js';
import { Controller } from 'react-hook-form';
import SideAutoComplete from '../shared/inputs/SideAutoComplete.js';
import SideCheckBox from '../shared/inputs/SideCheckBox.js';
import CreateOrderProductTable from './CreateOrderProductTable.js';

const { currencyLabel, saveItemsLabel } = LANGUAGE.order.createOrder.createOrderProducts;
const { errorMessages } = LANGUAGE.order.createOrder;


export default function CreateOrderProducts({ register, watch, control, errors, setValue, getValues, reset }) {

    return (
        <Grid container>
            <Grid
                container
                item
                justify="space-between"
                alignItems="center"
                xs={ 12 }
            >
                <Controller
                    render={ props =>
                        <SideAutoComplete
                            { ...props }
                            options={ currenciesOptions }
                            label={ currencyLabel }
                            error={ !!errors.currency }
                            required
                        />
                    }
                    name="currency"
                    control={ control }
                    rules={ { required: errorMessages.currency } }
                />
                <Controller
                    render={ ({ value, ...rest }) =>
                        <SideCheckBox
                            { ...rest }
                            label={ saveItemsLabel }
                            checked={ value }
                        />
                    }
                    name="saveItems"
                    control={ control }
                />
            </Grid>
            <Grid item xs={ 12 }>
                <CreateOrderProductTable
                    register={ register }
                    setValue={ setValue }
                    getValues={ getValues }
                    watch={ watch }
                    reset={ reset }
                />
            </Grid>
        </Grid>
    )
}