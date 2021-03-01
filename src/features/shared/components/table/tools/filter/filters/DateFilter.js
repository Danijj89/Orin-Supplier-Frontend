import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { LANGUAGE } from 'app/utils/constants.js';
import Grid from '@material-ui/core/Grid';
import DateField from 'features/shared/inputs/DateField.js';
import Title7 from 'features/shared/display/Title7.js';
import makeStyles from '@material-ui/core/styles/makeStyles.js';

const useStyles = makeStyles(theme => ({
    selector: {
        marginTop: theme.spacing(2),
        maxWidth: 180
    }
}));

const {
    emptyLabel,
    startLabel,
    endLabel,
} = LANGUAGE.shared.components.table.tools.filter.filters.dateFilter;

const DateFilter = React.memo(function DateFilter(
    { filterIdx, filter, setFilters, className }) {
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
        <Grid className={ className } container item direction="column" alignItems="center" md>
            <Title7 title={ filter.label }/>
            <DateField
                value={ filter.start }
                onChange={ createDateFilterChangeHandler('start') }
                label={ startLabel }
                emptyLabel={ emptyLabel }
                className={ classes.selector }
            />
            <DateField
                value={ filter.end }
                onChange={ createDateFilterChangeHandler('end') }
                label={ endLabel }
                emptyLabel={ emptyLabel }
                className={ classes.selector }
            />
        </Grid>
    );
});

DateFilter.propTypes = {
    filterIdx: PropTypes.number.isRequired,
    filter: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default DateFilter;
