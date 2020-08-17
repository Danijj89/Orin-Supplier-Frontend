import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Chip, Paper } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';

const { ordersLabel } = LANGUAGE.commercialInvoice.createCIProductInfo;

export default function CreateCIOrderSelector(
    { orderOptions, orders, setOrderOptions, setOrders, fixedOrderOptions }) {

    const onOrderOptionChange = (newOptions) => {
        setOrderOptions(orderOptions.filter(option => !orders.includes(option)));
        setOrders([
                ...fixedOrderOptions,
                ...newOptions.filter(option => fixedOrderOptions.indexOf(option) === -1)
            ]
        )
    }

    return (
        <Paper>
            <Autocomplete
                freeSolo
                multiple
                autoSelect
                options={orderOptions}
                onChange={(_, newRefs) => onOrderOptionChange(newRefs)}
                value={orders}
                renderInput={params => (
                    <TextField
                        {...params}
                        label={ordersLabel}
                        variant="outlined"
                        placeholder={ordersLabel}
                    />
                )}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) =>
                        <Chip
                            label={option}
                            {...getTagProps({ index })}
                            disabled={fixedOrderOptions.indexOf(option) !== -1}
                        />
                    )
                }
            />
        </Paper>
    )
}