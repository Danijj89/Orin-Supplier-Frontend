import React from 'react';
import { TableRow , TableCell, Button, Grid } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { getCurrencySymbol } from '../shared/utils.js';
import { useSelector } from 'react-redux';
import { selectPOAutocompleteOptions } from './duck/selectors.js';
import { selectCurrentDefaults } from '../home/duck/slice.js';
import { makeStyles } from '@material-ui/core/styles';
import TableAutoCompleteFreeTextInput from '../shared/inputs/TableAutoCompleteFreeTextInput.js';
import TableInput from '../shared/inputs/TableInput.js';
import TableAutoCompleteTextInput from '../shared/inputs/TableAutoCompleteTextInput.js';

const useStyles = makeStyles((theme) => ({
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
    combined: {
        width: '18%',
        maxWidth: 400,
        padding: 4
    },
    unitPrice: {
        width: '10%',
        maxWidth: 140,
        padding: 4
    },
    amount: {
        fontSize: 16,
        minFontSize: 12,
        width: '12%',
        maxWidth: 140,
        whiteSpace: 'nowrap',
        textAlign: 'right'
    }
}));

const textInputStyle = {
    borderStyle: 'none',
    borderRadius: 5,
    padding: '6px 8px',
    fontSize: 14,
    minFontSize: 12,
    margin: 0,
    width: '100%',
    backgroundColor: '#F6F6F6'
};

const numberInputStyle = {
    ...textInputStyle,
    textAlign: 'right'
};

const dropDownInputStyle = {
    ...textInputStyle,
    textAlign: 'center',
    width: 50
};

export default function CreatePOTableRow(
    { rowIdx, item, onCellChange, onItemDeleteClick, currency, headers}) {
    const classes = useStyles();
    const { itemUnits } = useSelector(selectCurrentDefaults);
    const { itemRefs, itemMap } = useSelector(selectPOAutocompleteOptions);

    return (
        <TableRow>
            <TableCell className={classes.deleteIcon} padding="none">
                <Button size="small" onClick={onItemDeleteClick}>
                    <DeleteIcon fontSize="small"/>
                </Button>
            </TableCell>
            <TableCell className={classes.itemReference}>
                <TableAutoCompleteFreeTextInput
                    options={itemRefs}
                    onChange={(data) => onCellChange(rowIdx, 'ref', data)}
                    value={item.ref}
                    styles={textInputStyle}
                />
            </TableCell>
            <TableCell className={classes.description}>
                <TableAutoCompleteFreeTextInput
                    options={itemMap.hasOwnProperty(item.ref) ? itemMap[item.ref].descriptions : []}
                    onChange={(data) => onCellChange(rowIdx, 'description', data)}
                    value={item.description}
                    styles={textInputStyle}
                />
            </TableCell>
            {
                headers[2] && <TableCell className={classes.custom}>
                    <TableInput
                        type="text"
                        value={item.custom1}
                        onChange={(e) => onCellChange(rowIdx, 'custom1', e.target.value)}
                        styles={textInputStyle}
                    />
                </TableCell>
            }
            {
                headers[3] && <TableCell className={classes.custom}>
                    <TableInput
                        type="text"
                        value={item.custom2}
                        onChange={(e) => onCellChange(rowIdx, 'custom2', e.target.value)}
                        styles={textInputStyle}
                    />
                </TableCell>
            }
            <TableCell className={classes.combined}>
                <Grid container>
                    <Grid container justify="flex-start" item xs={7}>
                        <TableInput
                            type="number"
                            value={item.quantity.toString()}
                            onChange={(e) => onCellChange(rowIdx, 'quantity', Number(e.target.value))}
                            styles={numberInputStyle}
                        />
                    </Grid>
                    <Grid container justify="flex-end" item xs={5}>
                        <TableAutoCompleteTextInput
                            options={itemUnits}
                            onChange={(data) => onCellChange(rowIdx, 'unit', data)}
                            value={item.unit}
                            styles={dropDownInputStyle}
                        />
                    </Grid>
                </Grid>
            </TableCell>
            <TableCell className={classes.unitPrice}>
                <TableInput
                    type="number"
                    value={item.price.toString()}
                    onChange={(e) => onCellChange(rowIdx, 'price', Number(e.target.value))}
                    styles={numberInputStyle}
                />
            </TableCell>
            <TableCell align="right" className={classes.amount}>
                {`${getCurrencySymbol(currency)} ${item.total}`}
            </TableCell>
        </TableRow>
    )
}