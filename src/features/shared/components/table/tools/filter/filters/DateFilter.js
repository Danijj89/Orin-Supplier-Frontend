import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { LANGUAGE } from 'app/utils/constants.js';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DateField from 'features/shared/inputs/DateField.js';

const useStyles = makeStyles((theme) => ({
    dateSelector: {
        marginTop: theme.spacing(2),
    },
}));

const {
    emptyLabel,
    startLabel,
    endLabel,
} = LANGUAGE.shared.components.table.tools.filter.filters.dateFilter;

const DateFilter = React.memo(function DateFilter({
                                                      filterIdx,
                                                      filter,
                                                      setFilters,
                                                  }) {
    const classes = useStyles();
    const createDateFilterChangeHandler = useCallback(
        (valueField) => (_, value) =>
            setFilters((prevFilters) => {
                const newFilter = { ...prevFilters[filterIdx] };
                newFilter[valueField] = value && new Date(value);
                return [
                    ...prevFilters.slice(0, filterIdx),
                    newFilter,
                    ...prevFilters.slice(filterIdx + 1),
                ];
            }),
        [filterIdx, setFilters]
    );

    return (
        <Grid container item direction="column" alignItems="center" md>
            <Typography variant="h6">{ filter.label }</Typography>
            <DateField
                value={ filter.start }
                onChange={ createDateFilterChangeHandler('start') }
                label={ startLabel }
                emptyLabel={ emptyLabel }
                className={ classes.dateSelector }
            />
            <DateField
                value={ filter.end }
                onChange={ createDateFilterChangeHandler('end') }
                label={ endLabel }
                emptyLabel={ emptyLabel }
                className={ classes.dateSelector }
            />
        </Grid>
    );
});

DateFilter.propTypes = {
    filterIdx: PropTypes.number.isRequired,
    filter: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
};

export default DateFilter;
