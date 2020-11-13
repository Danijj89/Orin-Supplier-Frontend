import React from 'react';
import PropTypes from 'prop-types';
import { TableRow } from '@material-ui/core';
import TextFieldCell from './TextFieldCell.js';
import AutoCompleteCell from './AutoCompleteCell.js';
import TextCell from './TextCell.js';
import CustomCell from './CustomCell.js';
import CheckBoxCell from './CheckBoxCell.js';

const EditableRow = React.memo(function EditableRow({ columns, row, rowIdx, onCellChange }) {

    const currRow = columns.map(column => {
            if (column.hide) return null;
            if (column.renderCell) return (
                <CustomCell
                    key={ column.field }
                    row={ row }
                    render={ column.renderCell }
                    width={ column.width }
                    align={ column.align }
                />
            );
            switch (column.type) {
                case 'text':
                    return (
                        <TextFieldCell
                            key={ column.field }
                            rowIdx={ rowIdx }
                            field={ column.field }
                            value={ row[column.field] }
                            width={ column.width }
                            onCellChange={ onCellChange }
                        />
                    )
                case 'number':
                    return (
                        <TextFieldCell
                            key={ column.field }
                            rowIdx={ rowIdx }
                            field={ column.field }
                            value={ row[column.field] }
                            width={ column.width }
                            onCellChange={ onCellChange }
                            type={ 'number' }
                        />
                    );
                case 'dropdown':
                    return (
                        <AutoCompleteCell
                            key={ column.field }
                            rowIdx={ rowIdx }
                            field={ column.field }
                            value={ row[column.field] }
                            width={ column.width }
                            onCellChange={ onCellChange }
                            options={ column.options }
                            getOptionLabel={ column.getOptionLabel }
                            getOptionSelected={ column.getOptionSelected }
                        />
                    );
                case 'autocomplete':
                    return (
                        <AutoCompleteCell
                            key={ column.field }
                            freeSolo
                            rowIdx={ rowIdx }
                            field={ column.field }
                            value={ row[column.field] }
                            width={ column.width }
                            onCellChange={ onCellChange }
                            options={ column.options }
                            getOptionLabel={ column.getOptionLabel }
                            getOptionSelected={ column.getOptionSelected }
                        />
                    );
                case 'checkbox':
                    return (
                        <CheckBoxCell
                            key={ column.field }
                            checked={ row[column.field] }
                            onCellChange={ onCellChange }
                            rowIdx={ rowIdx }
                            field={ column.field }
                            width={ column.width }
                        />
                    )
                default:
                    return (
                        <TextCell
                            key={ column.field }
                            align={ column.align }
                            width={ column.width }
                            value={ row[column.field] }
                        />
                    )
            }
        }
    );
    return (
        <TableRow key={ rowIdx }>
            { currRow }
        </TableRow>
    )
}, (prev, next) => {
    for (const [k, v] of Object.entries(prev.row)) {
        if (v !== next.row[k]) return false;
    }
    for (let i = 0; i < prev.columns.length; i++) {
        if (prev.columns[i].hide !== next.columns[i].hide) return false;
    }
    return true;
});

EditableRow.propTypes = {
    columns: PropTypes.array.isRequired,
    row: PropTypes.object.isRequired,
    rowIdx: PropTypes.number.isRequired,
    onCellChange: PropTypes.func.isRequired
};

export default EditableRow;