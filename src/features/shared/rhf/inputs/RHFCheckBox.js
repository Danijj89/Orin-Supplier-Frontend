import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

const RHFCheckBox = React.memo(function RHFCheckBox(
    {
        name,
        label,
        rhfControl: control,
        labelPlacement = 'start',
        className,
        disabled
    }) {
    const classes = useStyles();

    return (
        <Controller
            name={ name }
            render={ ({ onChange, value, ...rest }) =>
                <FormControlLabel
                    { ...rest }
                    control={ <Checkbox color="primary"/> }
                    label={ label }
                    labelPlacement={ labelPlacement }
                    className={ clsx(classes.root, className) }
                    onChange={ e => onChange(e.target.checked) }
                    checked={ value }
                    disabled={ disabled }
                />
            }
            control={ control }
        />
    )
});

RHFCheckBox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    rhfControl: PropTypes.object,
    labelPlacement: PropTypes.oneOf(['bottom', 'end', 'start', 'top']),
    className: PropTypes.string,
    disabled: PropTypes.bool
};

export default RHFCheckBox;

