import React, { useCallback } from 'react';
import TableAutoComplete from '../../inputs/TableAutoComplete.js';
import { TableCell } from './EditableTable.js';

const AutoCompleteCell = React.memo(function AutoCompleteCell(
    { rowIdx, field, value, onCellChange, width, options, getOptionLabel, getOptionSelected, freeSolo }) {

    const onChange = useCallback(
        val => onCellChange(rowIdx, field, val),
        [field, rowIdx, onCellChange]
    );

    return (
        <TableCell width={ width }>
            <TableAutoComplete
                freeSolo={ freeSolo }
                value={ value }
                options={ options }
                getOptionLabel={ getOptionLabel }
                getOptionSelected={ getOptionSelected }
                onChange={ onChange }
            />
        </TableCell>
    )
});

export default AutoCompleteCell;