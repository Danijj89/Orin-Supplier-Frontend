import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { getCurrencySymbol } from '../shared/utils.js';
import TableInputField from '../shared/TableInputField.js';
import { useSelector } from 'react-redux';
import { selectPOAutocompleteOptions } from './duck/selectors.js';

export default function CreateOrderProductInfoTableRow(
    {row, rowIdx, numColumns, onCellChange, onRowDeleteButtonClick, currency}) {

    const { itemReferences , productDescriptions, itemUnits } = useSelector(selectPOAutocompleteOptions);

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
                    options={itemReferences}
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
                    options={productDescriptions}
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
                numColumns > 6 && <TableCell className="table-row-custom-1">
                    <TableInputField
                        type="text"
                        value={row[2]}
                        onChange={(e) => onCellChange(rowIdx, 2, e.target.value)}
                    />
                </TableCell>
            }
            {
                numColumns > 7 && <TableCell className="table-row-custom-2">
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