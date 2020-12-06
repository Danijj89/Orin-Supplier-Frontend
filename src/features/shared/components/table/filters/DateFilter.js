import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { KeyboardDatePicker } from '@material-ui/pickers';

const DateFilter = React.memo(function DateFilter({ filter, onChange }) {

    const createDateFilterChangeHandler = useCallback(
        (valueField) => (_, value) => onChange(filter.type, filter.field, value, valueField),
        [filter.type, filter.field, onChange]);

    return (
        <>
            <Typography variant="h6">{ filter.field }</Typography>
            <KeyboardDatePicker
                autoOk
                format="yyyy/MM/dd"
                value={ filter.start }
                onChange={ createDateFilterChangeHandler('start') }
                inputVariant='outlined'
                emptyLabel="Select a Date..."
                label={"Start"}
                clearable
                size="small"
            />
            <KeyboardDatePicker
                autoOk
                format="yyyy/MM/dd"
                value={ filter.end }
                onChange={ createDateFilterChangeHandler('end') }
                inputVariant='outlined'
                emptyLabel="Select a Date..."
                label={"End"}
                clearable
                size="small"
            />
        </>
    );
});

DateFilter.propTypes = {
    filter: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default DateFilter;