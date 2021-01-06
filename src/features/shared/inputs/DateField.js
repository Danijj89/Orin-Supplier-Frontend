import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    adornedEnd: {
        padding: 0
    }
}))

const DateField = React.memo(function DateField(
    { value, onChange, label, emptyLabel, className }) {
    const classes = useStyles();
    return (
        <KeyboardDatePicker
            autoOk
            format="MM/dd/yyyy"
            value={ value }
            onChange={ onChange }
            inputVariant="outlined"
            emptyLabel={ emptyLabel }
            label={ label }
            size="small"
            className={ className }
            InputProps={{ classes: { adornedEnd: classes.adornedEnd }}}
            clearable
        />
    );
});

DateField.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string
    ]),
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    emptyLabel: PropTypes.string,
    className: PropTypes.string
};

export default DateField;