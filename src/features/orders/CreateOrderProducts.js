import React from 'react';
import { Grid, Checkbox, FormControlLabel } from '@material-ui/core';
import { LANGUAGE } from '../../app/constants.js';
import CreatePOProductTable from './CreatePOProductTable.js';
import RHFThemedDropdown from '../shared/rhf/RHFThemedDropdown.js';
import { currenciesOptions } from '../shared/constants.js';
import { Controller } from 'react-hook-form';
import SideAutoComplete from '../shared/inputs/SideAutoComplete.js';
import SideCheckBox from '../shared/inputs/SideCheckBox.js';

const { currencyLabel, saveItemsLabel } = LANGUAGE.order.createOrder.createOrderProducts;
const { errorMessages } = LANGUAGE.order.createOrder;


export default function CreateOrderProducts({ register, watch, control, errors, setValue }) {

    const saveItems = watch('saveItems');

    const headersWatcher = watch('headers');
    const numActiveColumns = headersWatcher.reduce((acc, header) => header ? acc + 1 : acc, 0);
    const onAddColumnClick = (newColumnName) => {
        const newHeaders = [...headersWatcher];
        if (!newHeaders[2]) newHeaders[2] = newColumnName;
        else if (!newHeaders[3]) newHeaders[3] = newColumnName;
        setValue('headers', newHeaders);
    }

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
                <SideCheckBox
                    label={ saveItemsLabel }
                    name="saveItems"
                    inputRef={ register }
                />
            </Grid>
            <Grid>

            </Grid>
        </Grid>
    )
}

// <Grid item xs={12}>
//     <CreatePOProductTable
//         watch={ watch }
//         setValue={ setValue }
//         numActiveColumns={ numActiveColumns }
//     />
// </Grid>