import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ThemedButton from '../../buttons/ThemedButton.js';
import Popover from '@material-ui/core/Popover';
import DateFilter from './filters/DateFilter.js';
import OptionFilter from './filters/OptionFilter.js';
import useSessionStorage from '../../hooks/useSessionStorage.js';
import TextFilter from './filters/TextFilter.js';
import { prepareFilters } from './utils/helpers.js';
import { LANGUAGE } from '../../../../app/utils/constants.js';

const {
    filterPopoverButtonLabel,
    clearButtonLabel,
    saveButtonLabel
} = LANGUAGE.shared.components.table.filterSelector;


const FilterSelector = React.memo(function FilterSelector(
    { filterOptions, onFilter }) {

    const preparedFilters = useMemo(
        () => prepareFilters(filterOptions.filters),
        [filterOptions.filters]);

    const [filters, setFilters] = useSessionStorage(filterOptions.sessionKey, preparedFilters);
    const [anchorEl, setAnchorEl] = useState(false);

    const onClick = useCallback(
        (e) => setAnchorEl(prev => prev ? null : e.currentTarget),
        []);

    const onCancel = useCallback(
        () => setAnchorEl(null), []);

    const onClear = useCallback(() => {
        setFilters(preparedFilters);
    }, [setFilters, preparedFilters]);

    const onSubmit = useCallback(
        () => {
            const activeFilters = filters.filter(filter => {
                switch (filter.type) {
                    case 'date':
                        return filter.start || filter.end;
                    case 'option':
                        return filter.values.length > 0;
                    case 'text':
                        return filter.value;
                    default:
                        return filter;
                }
            });
            onFilter(activeFilters);
            setAnchorEl(null);
        },
        [onFilter, filters]
    );

    // call when the user refreshes the page
    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {
            onSubmit();
            mounted.current = true;
        }
    }, [onSubmit]);

    return (
        <Box>
            <ThemedButton onClick={ onClick }>
                { filterPopoverButtonLabel }
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
                    <Grid container item xs={ 12 }>
                        { filters.map((filter, idx) => {
                            switch (filter.type) {
                                case 'date':
                                    return (
                                        <DateFilter
                                            key={ filter.field }
                                            filterIdx={ idx }
                                            filter={ filter }
                                            setFilters={ setFilters }
                                        />
                                    );
                                case 'option':
                                    return (
                                        <OptionFilter
                                            key={ filter.field }
                                            filterIdx={ idx }
                                            filter={ filter }
                                            setFilters={ setFilters }
                                        />
                                    );
                                case 'text':
                                    return (
                                        <TextFilter
                                            key={ filter.field }
                                            filterIdx={ idx }
                                            filter={ filter }
                                            setFilters={ setFilters }
                                        />
                                    );
                                default:
                                    return null;
                            }
                        }) }
                    </Grid>
                    <Grid container item xs={ 12 } justify="space-between">
                        <ThemedButton onClick={ onClear }>
                            { clearButtonLabel }
                        </ThemedButton>
                        <ThemedButton onClick={ onSubmit }>
                            { saveButtonLabel }
                        </ThemedButton>
                    </Grid>
                </Grid>
            </Popover>
        </Box>
    );
});

FilterSelector.propTypes = {
    filterOptions: PropTypes.exact({
        sessionKey: PropTypes.string.isRequired,
        filters: PropTypes.array.isRequired
    }).isRequired,
    onFilter: PropTypes.func.isRequired
};

export default FilterSelector;







