import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TableTextField from './TableTextField.js';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        '& .MuiAutocomplete-inputRoot[class*="MuiInput-root"]': {
            padding: 0
        },
        '& .MuiAutocomplete-inputRoot[class*="MuiInput-root"] .MuiAutocomplete-input:first-child': {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            paddingTop: theme.spacing(0.5),
            paddingBottom: theme.spacing(0.5)
        }
    }
}));

export default function TableAutoComplete(
    { options, getOptionLabel, getOptionSelected, filterOptions, freeSolo, className, onChange, ...props }) {
    const classes = useStyles();
    const classNames = clsx(classes.inputRoot, className);

    return (
        <Autocomplete
            { ...props }
            selectOnFocus={ freeSolo }
            clearOnBlur={ freeSolo }
            className={ classNames }
            disableClearable
            forcePopupIcon={ false }
            freeSolo={ freeSolo }
            autoSelect={ freeSolo }
            options={ options }
            getOptionLabel={ getOptionLabel }
            getOptionSelected={ getOptionSelected }
            filterOptions={ filterOptions }
            renderInput={ params =>
                <TableTextField
                    { ...params }
                />
            }
            onChange={ (_, data) => onChange(data) }
        />
    )
}

TableAutoComplete.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    getOptionLabel: PropTypes.func,
    getOptionSelected: PropTypes.func,
    filterOptions: PropTypes.func,
    freeSolo: PropTypes.bool,
    className: PropTypes.string
};