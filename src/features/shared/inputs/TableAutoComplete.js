import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TableTextField from './TableTextField.js';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    inputRoot: {
        '& .MuiAutocomplete-inputRoot[class*="MuiInput-root"] .MuiAutocomplete-input:first-child': {
            paddingLeft: theme.spacing(1.5),
            paddingRight: theme.spacing(1.5),
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1)
        }
    }
}));

export default function TableAutoComplete(
    { options, getOptionLabel, getOptionSelected, freeSolo, autoSelect, className, onChange, ...props }) {
    const classes = useStyles();
    const classNames = clsx(classes.inputRoot, className);

    return (
        <Autocomplete
            {...props}
            className={ classNames }
            disableClearable
            forcePopupIcon={false}
            freeSolo={freeSolo}
            autoSelect={autoSelect}
            options={options}
            getOptionLabel={ getOptionLabel }
            getOptionSelected={ getOptionSelected }
            renderInput={params =>
                <TableTextField
                    {...params}
                />
            }
            onChange={(_, data) => onChange(data)}
        />
    )
}

TableAutoComplete.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    getOptionLabel: PropTypes.func,
    getOptionSelected: PropTypes.func,
    freeSolo: PropTypes.bool,
    autoSelect: PropTypes.bool,
    className: PropTypes.string,
};