import React from 'react';
import PropTypes from 'prop-types';
import { TextField as MuiTextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    input: {
        flex: '1 1 auto',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        borderColor: theme.palette.tertiary['400'],
        backgroundColor: 'white',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(0.2),
    }
}));

export default function TextArea({ className, rows = 1, rowsMax = 1, ...props }) {
    const classes = useStyles();
    const classNames = clsx(
        classes.input,
        className
    );

    return (
        <MuiTextField
            { ...props }
            className={ classNames }
            InputProps={ { ...props.InputProps, disableUnderline: true } }
            rows={ rows }
            rowsMax={ rowsMax }
            multiline
        />
    );
}

TextArea.propTypes = {
    className: PropTypes.string,
    rows: PropTypes.number,
    rowsMax: PropTypes.number,
};
