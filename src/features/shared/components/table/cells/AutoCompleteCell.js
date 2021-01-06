import React, { useCallback } from 'react';
import TableAutoComplete from 'features/shared/inputs/TableAutoComplete.js';
import EditTableCell from 'features/shared/components/table/cells/EditTableCell.js';

const AutoCompleteCell = React.memo(function AutoCompleteCell(
    { rowIdx, field, value, onCellChange, width, options, getOptionLabel, getOptionSelected, freeSolo }) {

    const onChange = useCallback(
        val => onCellChange(rowIdx, field, val),
        [field, rowIdx, onCellChange]
    );

    return (
        <EditTableCell width={ width }>
            <TableAutoComplete
                freeSolo={ freeSolo }
                value={ value }
                options={ options }
                getOptionLabel={ getOptionLabel }
                getOptionSelected={ getOptionSelected }
                onChange={ onChange }
            />
        </EditTableCell>
    )
});

export default AutoCompleteCell;