import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import ThemedButton from '../../../../buttons/ThemedButton.js';
import Popover from '@material-ui/core/Popover';
import DateFilter from './filters/DateFilter.js';
import OptionFilter from './filters/OptionFilter.js';
import useSessionStorage from '../../../../hooks/useSessionStorage.js';
import TextFilter from './filters/TextFilter.js';
import { LANGUAGE } from 'app/utils/constants.js';
import DropdownFilter from './filters/DropdownFilter.js';
import RangeFilter from './filters/RangeFilter.js';
import Badge from '@material-ui/core/Badge';
import { FilterList as IconFilterList } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { filterRows, prepareFilters } from 'features/shared/components/table/tools/filter/util/helpers.js';

const useStyles = makeStyles((theme) => ({
    popover: {
        padding: theme.spacing(3),
    },
    actionButtons: {
        marginTop: theme.spacing(3),
    },
}));

const {
    filterPopoverButtonLabel,
    clearButtonLabel,
    saveButtonLabel
} = LANGUAGE.shared.components.table.tools.filter;

const FilterSelector = React.memo(function FilterSelector({
    options,
    rows,
    setRows,
}) {
    const classes = useStyles();
    const { filters: initialFilters, sessionKey } = options;
    const preparedFilters = useMemo(
        () => prepareFilters(initialFilters),
        [initialFilters]
    );
    const [filters, setFilters] = useSessionStorage(
        sessionKey,
        preparedFilters
    );
    const [numActiveFilters, setNumActiveFilters] = useState(0);
    const [anchorEl, setAnchorEl] = useState(false);

    const onClear = useCallback(() => {
        setFilters(preparedFilters);
        setNumActiveFilters(0);
        setRows(rows);
    }, [setFilters, preparedFilters, setRows, rows]);

    const onClick = useCallback(
        (e) => setAnchorEl((prev) => (prev ? null : e.currentTarget)), []);
    const onCancel = useCallback(() => setAnchorEl(null), []);

    const onSubmit = useCallback(() => {
        let count = 0;
        const activeFilters = [];
        filters.forEach((filter) => {
            const { type } = filter;
            if (type === 'date' && (filter.start || filter.end)) {
                count++;
                activeFilters.push({ ...filter });
            } else if (type === 'option' && filter.values.length > 0) {
                count += filter.values.length;
                activeFilters.push({ ...filter });
            } else if (
                (type === 'text' || type === 'dropdown') &&
                filter.value
            ) {
                count++;
                activeFilters.push({ ...filter });
            } else if (type === 'range' && (filter.min || filter.map)) {
                count++;
                activeFilters.push({ ...filter });
            }
        });
        setRows(filterRows(rows, activeFilters));
        setNumActiveFilters(count);
        setAnchorEl(null);
    }, [filters, rows, setRows]);

    // call when the user refreshes the page
    const mounted = useRef(false);
    const prevRows = useRef(rows);
    useEffect(() => {
        if (!mounted.current) {
            onSubmit();
            mounted.current = true;
            prevRows.current = rows;
        } else if (prevRows.current !== rows) {
            onSubmit();
            prevRows.current = rows;
        }
    }, [onSubmit, rows]);

    return (
        <>
            <ThemedButton
                onClick={onClick}
                variant={'text'}
                startIcon={
                    <Badge
                        color="secondary"
                        badgeContent={numActiveFilters}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <IconFilterList />
                    </Badge>
                }
            >
                {filterPopoverButtonLabel}
            </ThemedButton>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={onCancel}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Grid container className={classes.popover}>
                    <Grid>

                    </Grid>
                    <Grid container item xs={12}>
                        {filters.map((filter, idx) => {
                            switch (filter.type) {
                                case 'date':
                                    return (
                                        <DateFilter
                                            key={filter.field}
                                            filterIdx={idx}
                                            filter={filter}
                                            setFilters={setFilters}
                                        />
                                    );
                                case 'option':
                                    return (
                                        <OptionFilter
                                            key={filter.field}
                                            filterIdx={idx}
                                            filter={filter}
                                            setFilters={setFilters}
                                        />
                                    );
                                case 'text':
                                    return (
                                        <TextFilter
                                            key={filter.field}
                                            filterIdx={idx}
                                            filter={filter}
                                            setFilters={setFilters}
                                        />
                                    );
                                case 'dropdown':
                                    return (
                                        <DropdownFilter
                                            key={filter.field}
                                            filterIdx={idx}
                                            filter={filter}
                                            setFilters={setFilters}
                                        />
                                    );
                                case 'range':
                                    return (
                                        <RangeFilter
                                            key={filter.field}
                                            filterIdx={idx}
                                            filter={filter}
                                            setFilters={setFilters}
                                        />
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </Grid>
                    <Grid container item xs={12} justify="space-between">
                        <ThemedButton
                            className={classes.actionButtons}
                            onClick={onClear}
                            variant={'outlined'}
                        >
                            {clearButtonLabel}
                        </ThemedButton>
                        <ThemedButton
                            className={classes.actionButtons}
                            onClick={onSubmit}
                        >
                            {saveButtonLabel}
                        </ThemedButton>
                    </Grid>
                </Grid>
            </Popover>
        </>
    );
});

FilterSelector.propTypes = {
    options: PropTypes.exact({
        sessionKey: PropTypes.string.isRequired,
        filters: PropTypes.array.isRequired,
    }).isRequired,
    rows: PropTypes.array.isRequired,
    setRows: PropTypes.func.isRequired
};

export default FilterSelector;
