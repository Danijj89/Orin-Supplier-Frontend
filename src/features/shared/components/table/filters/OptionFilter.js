import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { getOptionId, getOptionLabel } from '../../../../../app/utils/options/getters.js';
import { LOCALE } from '../../../../../app/utils/constants.js';
import Grid from '@material-ui/core/Grid';

const OptionFilter = React.memo(function OptionFilter({ filterIdx, filter, setFilters }) {

    const createSelectOptionHandler = useCallback(
        (option) => (e) => {
            const { checked } = e.target;
            setFilters(prevFilters => {
                const newFilter = {...prevFilters[filterIdx]};
                if (checked) newFilter.values = [...newFilter.values, getOptionId(option)];
                else newFilter.values = newFilter.values.filter(opt => opt !== getOptionId(option));
                return [...prevFilters.slice(0, filterIdx), newFilter, ...prevFilters.slice(filterIdx + 1)];
            })
        }, [filterIdx, setFilters]);

    const func = useCallback(
        (option) => Boolean(filter.values.find(val => val === getOptionId(option))),
        [filter.values]);

    return (
        <Grid
            container
            item
            direction="column"
            alignItems="flex-end"
            md
        >
            <Typography variant="h6" align="right">{ filter.label }</Typography>
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
        </Grid>
    );
});

OptionFilter.propTypes = {
    filterIdx: PropTypes.number.isRequired,
    filter: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired
};

export default OptionFilter;