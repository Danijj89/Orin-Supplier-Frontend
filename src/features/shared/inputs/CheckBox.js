import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

const CheckBox = React.memo(function CheckBox(
    {
        name,
        label,
        labelPlacement = 'start',
        inputRef,
        className
    }) {
    const classes = useStyles();

    return (
        <FormControlLabel
            control={ <Checkbox color="primary"/> }
            name={ name }
            label={ label }
            labelPlacement={ labelPlacement }
            inputRef={ inputRef }
            className={ clsx(classes.root, className) }
        />
    )
});

CheckBox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    inputRef: PropTypes.func.isRequired,
    labelPlacement: PropTypes.oneOf(['bottom', 'end', 'start', 'top']),
    className: PropTypes.string
};

export default CheckBox;

