import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ThemedButton from '../../buttons/ThemedButton.js';
import Popover from '@material-ui/core/Popover';
import { getFilter } from './utils/helpers.js';
import DateFilter from './filters/DateFilter.js';
import OptionFilter from './filters/OptionFilter.js';
import useSessionStorage from '../../hooks/useSessionStorage.js';
import { SESSION_ORDER_TABLE_FILTERS } from '../../../../app/sessionKeys.js';


const FilterSelector = React.memo(function FilterSelector(
    { columns, onFilter }) {

    const initialFilters = useMemo(
        () => columns.filter(column => column.filter)
            .map(column => getFilter(column)),
        [columns]);

    const [filters, setFilters] = useSessionStorage(SESSION_ORDER_TABLE_FILTERS, initialFilters);
    const [anchorEl, setAnchorEl] = useState(false);

    const onFilterChange = useCallback(
        (type, field, newValue, option) => {
            setFilters(prevFilters => prevFilters.map(filter => {
                if (filter.field === field) {
                    if (filter.type === 'date') return { ...filter, [option]: newValue && new Date(newValue) };
                    else if (filter.type === 'option') {
                        if (newValue) return { ...filter, values: [...filter.values, option] };
                        else return { ...filter, values: filter.values.filter(opt => opt !== option) }
                    } else return { ...filter, value: newValue };
                }
                return filter;
            }));
        }, [setFilters]);

    const onClick = useCallback(
        (e) => setAnchorEl(prev => prev ? null : e.currentTarget),
        []);

    const onCancel = useCallback(
        () => setAnchorEl(null), []);

    const onSubmit = useCallback(
        () => {
            const activeFilters = filters.filter(filter => {
                switch (filter.type) {
                    case 'date':
                        return filter.start || filter.end;
                    case 'option':
                        return filter.values.length > 0;
                    default:
                        return filter;
                }
            });
            onFilter(activeFilters);
            setAnchorEl(null);
        },
        [onFilter, filters]
    );

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {
            onSubmit();
            mounted.current = true;
        }
    }, [onSubmit]);

    return (
        <Box hidden={ !filters.length }>
            <ThemedButton onClick={ onClick }>
                Filters
            </ThemedButton>
            <Popover
                open={ Boolean(anchorEl) }
                anchorEl={ anchorEl }
                onClose={ onCancel }
                anchorOrigin={ {
                    vertical: 'bottom',
                    horizontal: 'left',
                } }
                transformOrigin={ {
                    vertical: 'top',
                    horizontal: 'right',
                } }
            >
                <Grid container>
                    <Grid container item xs={12}>
                        { filters.map((filter) => {
                            switch (filter.type) {
                                case 'date':
                                    return (
                                        <Grid key={ filter.field } container item direction="column" alignItems="center" md>
                                            <DateFilter filter={ filter } onChange={ onFilterChange }/>
                                        </Grid>
                                    );

                                case 'option':
                                    return (
                                        <Grid key={ filter.field } container item direction="column" alignItems="center" md>
                                            <OptionFilter filter={ filter } onChange={ onFilterChange }/>
                                        </Grid>
                                    )
                                default:
                                    return null;
                            }
                        }) }
                    </Grid>
                    <Grid container item xs={ 12 } justify="flex-end">
                        <ThemedButton onClick={ onSubmit }>
                            Save
                        </ThemedButton>
                    </Grid>
                </Grid>
            </Popover>
        </Box>
    );
});

FilterSelector.propTypes = {
    columns: PropTypes.array.isRequired,
    onFilter: PropTypes.func.isRequired
};

export default FilterSelector;

// <FormControlLabel
//     control={ <Checkbox color="primary"/> }
//     label={ filter.field }
//     labelPlacement="top"
//     onChange={ e => onChange(e.target.checked) }
//     checked={ filter.value.includes() }
// />







