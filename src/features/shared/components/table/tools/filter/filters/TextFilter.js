import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { LANGUAGE } from 'app/utils/constants.js';
import Grid from '@material-ui/core/Grid';
import Title7 from 'features/shared/display/Title7.js';
import makeStyles from '@material-ui/core/styles/makeStyles.js';

const useStyles = makeStyles(theme => ({
    selector: {
        marginTop: theme.spacing(2),
        maxWidth: 180
    },
    input: {
        fontSize: '0.875rem'
    }
}));

const {
    searchTermLabel
} = LANGUAGE.shared.components.table.tools.filter.filters.textFilter;

const TextFilter = React.memo(function TextFilter({ filterIdx, filter, setFilters, className }) {
    const classes = useStyles();

    const onTextChange = useCallback(
        (e) => {
            const { value } = e.target;
            setFilters(prevFilters => {
                const newFilter = { ...prevFilters[filterIdx] };
                newFilter.value = value;
                return [...prevFilters.slice(0, filterIdx), newFilter, ...prevFilters.slice(filterIdx + 1)];
            })
        }, [filterIdx, setFilters]);

    return (
        <Grid
            key={ filter.field }
            container
            item
            direction="column"
            alignItems="center"
            className={ className }
            md
        >
            <Title7 title={ filter.label }/>
            <TextField
                label={ searchTermLabel }
                value={ filter.value }
                onChange={ onTextChange }
                variant="outlined"
                size="small"
                className={ classes.selector }
                InputProps={ { classes: { root: classes.input } } }
            />
        </Grid>
    );
});

TextFilter.propTypes = {
    filterIdx: PropTypes.number.isRequired,
    filter: PropTypes.object.isRequired,
    setFilters: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default TextFilter;