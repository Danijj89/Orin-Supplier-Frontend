import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectCurrentDefaults } from '../../home/duck/slice.js';
import { LANGUAGE } from '../../../constants.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    main: {
        margin: theme.spacing(1)
    },
    text: {
        minWidth: 160,
        maxWidth: 280
    }
}));

const { label } = LANGUAGE.shared.dropdowns.currency;

export default function CurrencyDropdown({ isError, className, ...props }) {
    const classes = useStyles();
    const { currencies } = useSelector(selectCurrentDefaults);

    return (
        <Autocomplete
            {...props}
            className={ classes.main }
            options={ currencies }
            renderInput={ params => (
                <TextField
                    { ...params }
                    label={ label }
                    variant="outlined"
                    error={ isError }
                    size="small"
                    className={ `${ classes.text } ${ className }` }
                />
            ) }
            onChange={ (_, data) => props.onChange(data) }
        />
    )
}