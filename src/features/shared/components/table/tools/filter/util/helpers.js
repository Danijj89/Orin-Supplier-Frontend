import { getOptionId } from 'app/utils/options/getters.js';

export function prepareFilters(filters) {
    return filters.map(filter => {
        const preparedFilter = { ...filter };
        switch (filter.type) {
            case 'date':
                preparedFilter.start = null;
                preparedFilter.end = null;
                break;
            case 'option':
                preparedFilter.values = [];
                break;
            case 'dropdown':
                preparedFilter.value = null;
                break;
            case 'range':
                preparedFilter.min = '';
                preparedFilter.max = '';
                break;
            default:
                preparedFilter.value = '';
        }
        return preparedFilter;
    });
}

export function filterRows(rows, filters) {
    let filteredRows = [...rows];
    for (const filter of filters) {
        switch (filter.type) {
            case 'date':
                if (filter.start && filter.end)
                    filteredRows = filteredRows.filter((row) => {
                        const val = new Date(row[filter.field]);
                        return val >= filter.start && val <= filter.end;
                    });
                else if (filter.start) {
                    filteredRows = filteredRows.filter((row) => {
                        return (
                            new Date(row[filter.field]) >= filter.start
                        );
                    });
                } else
                    filteredRows = filteredRows.filter(
                        (row) =>
                            new Date(row[filter.field]) <= filter.end
                    );
                break;
            case 'option':
                filteredRows = filteredRows.filter((row) =>
                    filter.values.includes(
                        getOptionId(row[filter.field])
                    )
                );
                break;
            case 'text':
                filteredRows = filteredRows.filter((row) =>
                    new RegExp(filter.value, 'i').test(row[filter.field])
                );
                break;
            case 'dropdown':
                filteredRows = filteredRows.filter(
                    (row) => row[filter.field] === filter.value
                );
                break;
            case 'range':
                if (filter.min && filter.max)
                    filteredRows = filteredRows.filter((row) => {
                        const val = row[filter.field];
                        return val >= filter.min && val <= filter.max;
                    });
                else if (filter.min)
                    filteredRows = filteredRows.filter(
                        (row) => row[filter.field] >= filter.min
                    );
                else
                    filteredRows = filteredRows.filter(
                        (row) => row[filter.field] <= filter.max
                    );
                break;
            default:
        }
    }
    return filteredRows;
}