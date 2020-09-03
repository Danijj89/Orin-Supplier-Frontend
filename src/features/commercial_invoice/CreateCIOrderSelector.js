import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { Chip, Paper } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';

const { ordersLabel } = LANGUAGE.commercialInvoice.createCIProductInfo;

export default function CreateCIOrderSelector({ poRefs, poRefsOptions, onChosenOrderChange }) {

    return (
        <Paper>
            <Autocomplete
                freeSolo
                multiple
                autoSelect
                options={poRefsOptions}
                onChange={(_, newRefs) => onChosenOrderChange(newRefs)}
                value={poRefs}
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