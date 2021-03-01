import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Title7 from 'features/shared/display/Title7.js';
import makeStyles from '@material-ui/core/styles/makeStyles.js';

const useStyles = makeStyles(theme => ({
    selector: {
        marginTop: theme.spacing(2)
    }
}));

const DropdownFilter = React.memo(function DropdownFilter({ filterIdx, filter, setFilters, className }) {
    const classes = useStyles();

    const onOptionChange = useCallback(
        (_, data) => setFilters(prevFilters => {
            const newFilter = { ...prevFilters[filterIdx] };
            newFilter.value = data;
            return [...prevFilters.slice(0, filterIdx), newFilter, ...prevFilters.slice(filterIdx + 1)];
        }),
        [filterIdx, setFilters]);

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
            <Autocomplete
                options={ filter.options }
                renderInput={ (params) => (
                    <TextField
                        { ...params }
                        label={ filter.label }
                        variant="outlined"
                        size="small"
                        className={ classes.selector }
                    />
                ) }
                onChange={ onOptionChange }
                value={ filter.value }
            />
        </Grid>
    );
});

DropdownFilter.propTypes = {
    filterIdx: PropTypes.number.isRequired,
    filter: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default DropdownFilter;