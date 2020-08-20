import React from 'react';
import { useSelector } from 'react-redux';
import { selectPOAutocompleteOptions } from '../orders/duck/selectors.js';
import { selectCurrentDefaults } from '../home/slice.js';
import { TableRow, TableCell, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete.js';
import { getCurrencySymbol } from '../shared/utils.js';
import { makeStyles } from '@material-ui/core/styles';
import TableAutoCompleteFreeTextInput from '../shared/inputs/TableAutoCompleteFreeTextInput.js';
import TableInput from '../shared/inputs/TableInput.js';
import TableAutoCompleteTextInput from '../shared/inputs/TableAutoCompleteTextInput.js';

const useStyles = makeStyles({
    deleteIcon: {
        margin: 0,
        width: '5%'
    },
    itemReference: {
        width: '15%',
        maxWidth: 200,
        padding: 4
    },
    description: {
        width: '25%',
        maxWidth: 400,
        padding: 4
    },
    custom: {
        width: '15%',
        maxWidth: 400,
        padding: 4
    },
    quantity: {
        width: '10%',
        maxWidth: 140,
        padding: 4
    },
    unit: {
        padding: 4,
        width: '5%'
    },
    unitPrice: {
        width: '10%',
        maxWidth: 140,
        padding: 4
    },
    amount: {
        fontSize: 16,
        minFontSize: 12,
        width: '20%',
        maxWidth: 140,
        whiteSpace: 'nowrap',
        textAlign: 'right'
    }
})

const textInputStyle = {
    border: 'none',
    borderRadius: 5,
    padding: '6px 8px',
    fontSize: 14,
    minFontSize: 12,
    margin: 0,
    width: '100%'
};

const numberInputStyle = {
    ...textInputStyle,
    textAlign: 'right'
};

const dropDownInputStyle = {
    ...textInputStyle,
    textAlign: 'center'
};


export default function CreateProductTableRow(
    {
        orderRef,
        row,
        rowIdx,
        headers,
        onCellChange,
        onTextCellChange,
        onRowDeleteClick,
        currency,
        onUnitPriceChange,
        onUnitChange,
        onQuantityChange
    }) {
    const classes = useStyles();
    const { itemsRef, itemDescriptionMap } = useSelector(selectPOAutocompleteOptions);
    const { itemUnits } = useSelector(selectCurrentDefaults);

    return (
        <TableRow>
            <TableCell className={classes.deleteIcon} padding="none">
                <Button size="small" onClick={() => onRowDeleteClick(orderRef, rowIdx)}>
                    <DeleteIcon fontSize="small"/>
                </Button>
            </TableCell>
            <TableCell className={classes.itemReference}>
                <TableAutoCompleteFreeTextInput
                    options={itemsRef}
                    onChange={(data) => onCellChange(orderRef, rowIdx, 0, data, onTextCellChange)}
                    value={row[0]}
                    styles={textInputStyle}
                />
            </TableCell>
            <TableCell className={classes.description}>
                <TableAutoCompleteFreeTextInput
                    options={itemDescriptionMap.hasOwnProperty(row[0]) ? itemDescriptionMap[row[0]] : []}
                    onChange={(data) => onCellChange(orderRef, rowIdx, 1, data, onTextCellChange)}
                    value={row[1]}
                    styles={textInputStyle}
                />
            </TableCell>
            {
                headers[2] && <TableCell className={classes.custom}>
                    <TableInput
                        type="text"
                        value={row[2]}
                        onChange={(e) => onCellChange(orderRef, rowIdx, 2, e.target.value, onTextCellChange)}
                        styles={textInputStyle}
                    />
                </TableCell>
            }
            {
                headers[3] && <TableCell className={classes.custom}>
                    <TableInput
                        type="text"
                        value={row[3]}
                        onChange={(e) => onCellChange(orderRef, rowIdx, 3, e.target.value, onTextCellChange)}
                        styles={textInputStyle}
                    />
                </TableCell>
            }
            <TableCell className={classes.quantity}>
                <TableInput
                    type="number"
                    value={Number(row[4]).toString()}
                    onChange={(e) => onCellChange(orderRef, rowIdx, 4, e.target.value, onQuantityChange)}
                    styles={numberInputStyle}
                />
            </TableCell>
            <TableCell className={classes.unit}>
                <TableAutoCompleteTextInput
                    options={itemUnits}
                    onChange={(data) => onCellChange(orderRef, rowIdx, 5, data, onUnitChange)}
                    value={row[5]}
                    styles={dropDownInputStyle}
                />
            </TableCell>
            <TableCell className={classes.unitPrice}>
                <TableInput
                    type="number"
                    value={Number(row[6]).toString()}
                    onChange={(e) => onCellChange(orderRef, rowIdx, 6, e.target.value, onUnitPriceChange)}
                    styles={numberInputStyle}
                />
            </TableCell>
            <TableCell className={classes.amount}>
                <Typography>{`${getCurrencySymbol(currency)} ${row[7]}`}</Typography>
            </TableCell>
        </TableRow>
    )
}