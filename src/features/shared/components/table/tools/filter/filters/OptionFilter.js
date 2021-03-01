import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { getOptionId, getOptionLabel } from 'app/utils/options/getters.js';
import { LOCALE } from 'app/utils/constants.js';
import Grid from '@material-ui/core/Grid';
import Title7 from 'features/shared/display/Title7.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    items: {
        fontSize: '0.875rem'
    },
    list: {
        marginTop: theme.spacing(2),
        paddingRight: '20%'
    }
}));

const OptionFilter = React.memo(function OptionFilter({ filterIdx, filter, setFilters, className }) {
    const classes = useStyles();

    const createSelectOptionHandler = useCallback(
        (option) => (e) => {
            const { checked } = e.target;
            setFilters(prevFilters => {
                const newFilter = { ...prevFilters[filterIdx] };
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
            alignItems="center"
            className={ className }
            md
        >
            <Title7 title={ filter.label }/>
            <Grid
                container
                item
                direction="column"
                alignItems="flex-end"
                className={ classes.list }
                md
            >
                { filter.options.map((option) =>
                    <FormControlLabel
                        key={ getOptionId(option) }
                        control={ <Checkbox color="primary"/> }
                        label={ getOptionLabel(option, LOCALE) }
                        labelPlacement="start"
                        onChange={ createSelectOptionHandler(option) }
                        checked={ func(option) }
                        classes={ { label: classes.items } }
                    />
                ) }
            </Grid>
        </Grid>

    );
});

OptionFilter.propTypes = {
    filterIdx: PropTypes.number.isRequired,
    filter: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default OptionFilter;