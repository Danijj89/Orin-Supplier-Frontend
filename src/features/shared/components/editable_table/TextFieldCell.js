import React, { useCallback } from 'react';
import TableTextField from '../../inputs/TableTextField.js';
import { TableCell } from './EditableTable.js';


const TextFieldCell = React.memo(function TextFieldCell({ rowIdx, field, value, onCellChange, width, type }) {

    const onChange = useCallback(
        e => onCellChange(rowIdx, field, e.target.value),
        [field, rowIdx, onCellChange]
    );

    return (
        <TableCell width={ width }>
            <TableTextField
                type={ type }
                value={ value }
                onChange={ onChange }
            />
        </TableCell>
    )
});

export default TextFieldCell;