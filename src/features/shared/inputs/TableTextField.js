import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    input: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 4,
        borderColor: theme.palette.grey.main,
        '& .MuiInputBase-input': {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
            fontSize: '0.875rem',
            textAlign: props => props.type === 'number' && 'right'
        },
        display: 'flex'
    }
}));

export default function  TableTextField({ type, className, ...props }) {
    const classes = useStyles({ type });
    const classNames = clsx(classes.input, className);

    // on focus use this?
    // const moveCursorToEnd = (e) => {
    //     const target = e.currentTarget;
    //     if (target.type === 'number') {
    //         target.type = 'text';
    //         target.setSelectionRange(0, target.value.length);
    //         target.type = 'number';
    //     }
    // }

    return (
        <TextField
            { ...props }
            type={ type }
            className={ classNames }
            InputProps={ { ...props.InputProps, disableUnderline: true } }
        />
    )
}

TableTextField.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string
};