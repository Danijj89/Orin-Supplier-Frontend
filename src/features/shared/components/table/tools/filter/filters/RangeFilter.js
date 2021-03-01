import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { LANGUAGE } from 'app/utils/constants.js';
import Title7 from 'features/shared/display/Title7.js';
import makeStyles from '@material-ui/core/styles/makeStyles.js';

const useStyles = makeStyles(theme => ({
    selector: {
        marginTop: theme.spacing(2)
    }
}));

const {
    minLabel,
    maxLabel
} = LANGUAGE.shared.components.table.tools.filter.filters.rangeFilter;

const RangeFilter = React.memo(function RangeFilter({ filterIdx, filter, setFilters, className }) {
    const classes = useStyles();

    const onMinRangeChange = useCallback(
        (e) => {
            const { value } = e.target;
            setFilters(prevFilters => {
                const newFilter = { ...prevFilters[filterIdx] };
                newFilter.min = value;
                return [...prevFilters.slice(0, filterIdx), newFilter, ...prevFilters.slice(filterIdx + 1)];
            })
        }, [filterIdx, setFilters]);

    const onMaxRangeChange = useCallback(
        (e) => {
            const { value } = e.target;
            setFilters(prevFilters => {
                const newFilter = { ...prevFilters[filterIdx] };
                newFilter.max = value;
                return [...prevFilters.slice(0, filterIdx), newFilter, ...prevFilters.slice(filterIdx + 1)];
            })
        }, [filterIdx, setFilters]);

    return (
        <Grid
            container
            item
            direction="column"
            alignItems="center"
            className={ className }
            md
        >
            <Title7 title={ filter.label }/>
            <TextField
                label={ minLabel }
                onChange={ onMinRangeChange }
                value={ filter.min }
                type="number"
                className={ classes.selector }
            />
            <TextField
                label={ maxLabel }
                onChange={ onMaxRangeChange }
                value={ filter.max }
                type="number"
                className={ classes.selector }
            />
        </Grid>
    );
});

RangeFilter.propTypes = {
    filterIdx: PropTypes.number.isRequired,
    filter: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default RangeFilter;