import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { getOptionId, getOptionLabel } from '../../../../../app/utils/options/getters.js';
import { LOCALE } from '../../../../../app/utils/constants.js';

const OptionFilter = React.memo(function OptionFilter({ filter, onChange }) {

    const createSelectOptionHandler = useCallback(
        (option) => (e) => onChange(filter.type, filter.field, e.target.checked, getOptionId(option)),
        [filter.field, filter.type, onChange]);

    const func = (option) => {
        return Boolean(filter.values.find(val => val === getOptionId(option)))
    };

    return (
        <>
            <Typography variant="h6">{ filter.field }</Typography>
            { filter.options.map(option =>
                <FormControlLabel
                    key={ getOptionId(option) }
                    control={ <Checkbox color="primary"/> }
                    label={ getOptionLabel(option, LOCALE) }
                    labelPlacement="start"
                    onChange={ createSelectOptionHandler(option) }
                    checked={ func(option) }
                />
            ) }
        </>
    );
});

OptionFilter.propTypes = {
    filter: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default OptionFilter;