import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Chip, Paper } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import { useSelector } from 'react-redux';
import { selectCIAutocompleteOptions } from './duck/selectors.js';

const { ordersLabel } = LANGUAGE.commercialInvoice.createCIProductInfo;

export default function CreateCIOrderSelector({ orders, onChosenOrderChange , currOrderRef }) {

    const { ordersRef } = useSelector(selectCIAutocompleteOptions);
    const [orderOptions, setOrderOptions] = useState([...ordersRef.filter(ref => currOrderRef !== ref)]);

    useEffect(() => {
        setOrderOptions([...ordersRef.filter(option => !orders.includes(option))]);
    }, [orders, ordersRef])

    return (
        <Paper>
            <Autocomplete
                freeSolo
                multiple
                autoSelect
                options={orderOptions}
                onChange={(_, newRefs) => onChosenOrderChange(newRefs)}
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
                        />
                    )
                }
            />
        </Paper>
    )
}