import React from 'react';
import { useSelector } from 'react-redux';
import { selectPOAutocompleteOptions } from '../orders/duck/selectors.js';
import { selectCurrentDefaults } from '../home/slice.js';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TableInputField from '../shared/TableInputField.js';
import { getCurrencySymbol } from '../shared/utils.js';

export default function CreateProductTableRow(
    {row, rowIdx, headers, onCellChange, onRowDeleteButtonClick, currency}) {

    const { itemsRef, itemDescriptionMap } = useSelector(selectPOAutocompleteOptions);
    const { itemUnits } = useSelector(selectCurrentDefaults);

    return (
        <TableRow>
            <TableCell className="table-row-delete-icon" padding="none">
                <Button size="small" onClick={() => onRowDeleteButtonClick(rowIdx)}>
                    <DeleteIcon fontSize="small"/>
                </Button>
            </TableCell>
            <TableCell className="table-row-item-reference">
                <Autocomplete
                    freeSolo
                    autoSelect
                    options={itemsRef}
                    renderInput={params => (
                        <TableInputField
                            type="text"
                            InputProps={params.InputProps}
                            inputProps={params.inputProps}
                            isAutocomplete
                        />
                    )}
                    onChange={(_, data) => onCellChange(rowIdx, 0, data)}
                    value={row[0]}
                    size="small"
                />
            </TableCell>
            <TableCell className="table-row-description">
                <Autocomplete
                    freeSolo
                    autoSelect
                    options={itemDescriptionMap.hasOwnProperty(row[0]) ? itemDescriptionMap[row[0]] : []}
                    renderInput={params => (
                        <TableInputField
                            type="text"
                            InputProps={params.InputProps}
                            inputProps={params.inputProps}
                            isAutocomplete
                        />
                    )}
                    onChange={(_, data) => onCellChange(rowIdx, 1, data)}
                    value={row[1]}
                    size="small"
                />
            </TableCell>
            {
                headers[2] && <TableCell className="table-row-custom-1">
                    <TableInputField
                        type="text"
                        value={row[2]}
                        onChange={(e) => onCellChange(rowIdx, 2, e.target.value)}
                    />
                </TableCell>
            }
            {
                headers[3] && <TableCell className="table-row-custom-2">
                    <TableInputField
                        type="text"
                        value={row[3]}
                        onChange={(e) => onCellChange(rowIdx, 3, e.target.value)}
                    />
                </TableCell>
            }
            <TableCell className="table-row-quantity">
                <TableInputField
                    type="number"
                    value={Number(row[4]).toString()}
                    onChange={(e) => onCellChange(rowIdx, 4, e.target.value)}
                />
            </TableCell>
            <TableCell className="table-row-units">
                <Autocomplete
                    options={itemUnits}
                    renderInput={params => (
                        <TableInputField
                            type="text"
                            InputProps={params.InputProps}
                            inputProps={params.inputProps}
                            isAutocomplete
                        />
                    )}
                    onChange={(_, data) => onCellChange(rowIdx, 5, data)}
                    value={row[5]}
                    size="small"
                />
            </TableCell>
            <TableCell className="table-row-unit-price">
                <TableInputField
                    type="number"
                    value={Number(row[6]).toString()}
                    onChange={(e) => onCellChange(rowIdx, 6, e.target.value)}
                />
            </TableCell>
            <TableCell align="right" className="table-amount">
                {`${getCurrencySymbol(currency)} ${row[7]}`}
            </TableCell>
        </TableRow>
    )
}