import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import DeleteIconButton from '../../buttons/DeleteIconButton.js';
import EditableTable from '../../components/editable_table/EditableTable.js';
import { useWatch } from 'react-hook-form';
import { LANGUAGE, LOCALE } from '../../../../app/utils/constants.js';
import { useSelector } from 'react-redux';
import {
    selectCountries,
    selectCurrencies, selectDefaultConsolidationRowItem,
    selectItemUnits,
    selectItemUnitsMap
} from '../../../../app/duck/selectors.js';
import { getOptionId, getOptionLabel } from '../../../../app/utils/options/getters.js';
import Grid from '@material-ui/core/Grid';
import ErrorMessages from '../../components/ErrorMessages.js';
import UnitCounter from '../../classes/UnitCounter.js';
import { getCurrencySymbol } from '../../utils/random.js';
import { selectCompanyDefaultAddress, selectCurrentCompany } from 'features/home/duck/home/selectors.js';
import { selectAllActiveProducts } from '../../../products/duck/selectors.js';
import TextArea from '../../inputs/TextArea.js';
import { formatQuantityWithUnit, roundToNDecimal } from '../../utils/format.js';

const {
    tableHeaderLabels,
    totalLabel,
    marksPlaceholderLabel,
    errorMessages
} = LANGUAGE.shared.rhf.forms.chinaExportTable;

export function validateChinaExportItems(items) {
    if (!items.length) return errorMessages.missingItems;
    for (const item of items) {
        if (!(item.hsc && item.localD && item.coo && item.fdc && item.dop
            && item.quantity && item.unit && item.price && item.currency))
            return errorMessages.missingItemInfo;
    }
    return true;
}

function formatTotalAmount(totalAmount) {
    const entries = Object.entries(totalAmount);
    if (entries.length === 1) return `${ roundToNDecimal(entries[0][1], 2) } ${ getCurrencySymbol(entries[0][0]) }`;
    return entries.filter(([_, amount]) => amount !== 0)
        .map(([unit, amount]) => `${ roundToNDecimal(amount, 2) } ${ getCurrencySymbol(unit) }`)
        .join(' + ');
}

const RHFChinaExportTable = React.memo(function RHFChinaExportTable(
    {
        rhfRegister: register,
        rhfControl: control,
        rhfSetValue: setValue,
        rhfGetValues: getValues,
        rhfErrors: errors,
        fieldNames
    }) {

    const company = useSelector(selectCurrentCompany);
    const companyDefaultAddress = useSelector(selectCompanyDefaultAddress);
    const itemUnitOptions = useSelector(selectItemUnits);
    const currencyOptions = useSelector(selectCurrencies);
    const countryOptions = useSelector(selectCountries);
    const itemUnitsMap = useSelector(selectItemUnitsMap);
    const products = useSelector(selectAllActiveProducts);
    const defaultConsolidationRowItem = useSelector(state =>
        selectDefaultConsolidationRowItem(state, {
            currency: company.currency,
            countryOfOrigin: companyDefaultAddress.country
        }));

    const coItems = useWatch({
        control,
        name: fieldNames.coItems
    });

    const quantity = useWatch({
        control,
        name: fieldNames.quantity
    });

    const totalAmount = useWatch({
        control,
        name: fieldNames.totalAmount
    });

    const errMessages = useMemo(() => Object.values(errors).map(err => err.message), [errors]);
    const isError = useMemo(() => errMessages.length > 0, [errMessages]);

    const onAddRow = useCallback(
        () => {
            setValue(fieldNames.coItems, [...getValues(fieldNames.coItems), defaultConsolidationRowItem])
        },
        [setValue, getValues, fieldNames, defaultConsolidationRowItem]);

    const onDeleteRow = useCallback(
        idx => () => setValue(fieldNames.coItems, getValues(fieldNames.coItems).filter((_, i) => i !== idx)),
        [getValues, setValue, fieldNames]);

    const onCellChange = useCallback(
        (rowIdx, key, newValue) => {
            const items = getValues(fieldNames.coItems);
            const newItem = { ...items[rowIdx] };
            let newQuantity;
            let newTotalAmount;
            let diff;
            switch (key) {
                case 'hsc':
                    if (newValue._id) {
                        newItem.hsc = newValue.hsc;
                        newItem.localD = newValue.localD;
                        newItem.description = newValue.description;
                    } else {
                        newItem.hsc = newValue;
                        newItem.localD = '';
                        newItem.description = '';
                    }
                    break;
                case 'quantity':
                    newValue = newValue === '' ? newValue : parseInt(newValue);
                    diff = newValue - newItem.quantity;
                    newQuantity = new UnitCounter(getValues(fieldNames.quantity));
                    newQuantity.addUnit(getOptionId(newItem.unit), diff);
                    setValue(fieldNames.quantity, newQuantity.data);

                    newTotalAmount = new UnitCounter(getValues(fieldNames.totalAmount));
                    newTotalAmount.addUnit(getOptionId(newItem.currency), roundToNDecimal(newItem.price * diff, 2));
                    setValue(fieldNames.totalAmount, newTotalAmount.data);
                    newItem.total = roundToNDecimal(newValue * newItem.price, 2);
                    newItem.quantity = newValue;
                    break;
                case 'unit':
                    const prevUnit = getOptionId(newItem.unit);
                    newQuantity = new UnitCounter(getValues(fieldNames.quantity));
                    newQuantity.subtractUnit(prevUnit, newItem.quantity);
                    newQuantity.addUnit(getOptionId(newValue), newItem.quantity);
                    setValue(fieldNames.quantity, newQuantity.data);
                    newItem.unit = newValue;
                    break;
                case 'price':
                    newValue = newValue === '' ? newValue : roundToNDecimal(newValue, 2);
                    diff = newValue - newItem.price;
                    newTotalAmount = new UnitCounter(getValues(fieldNames.totalAmount));
                    newTotalAmount.addUnit(getOptionId(newItem.currency), roundToNDecimal(newItem.quantity * diff, 2));
                    setValue(fieldNames.totalAmount, newTotalAmount.data);
                    newItem.total = roundToNDecimal(newValue * newItem.quantity, 2);
                    newItem.price = newValue;
                    break;
                case 'currency':
                    const prevCurrency = getOptionId(newItem.currency);
                    diff = newItem.quantity * newItem.price;
                    newTotalAmount = new UnitCounter(getValues(fieldNames.totalAmount));
                    newTotalAmount.subtractUnit(prevCurrency, roundToNDecimal(diff, 2));
                    newTotalAmount.addUnit(getOptionId(newValue), roundToNDecimal(diff, 2));
                    setValue(fieldNames.totalAmount, newTotalAmount.data);
                    newItem.currency = newValue;
                    break;
                default:
                    newItem[key] = newValue;
            }
            setValue(fieldNames.coItems, [...items.slice(0, rowIdx), newItem, ...items.slice(rowIdx + 1)])
        },
        [getValues, setValue, fieldNames]);

    const columns = useMemo(() => [
        {
            field: 'delete',
            renderCell: params => <DeleteIconButton onClick={ onDeleteRow(params.idx) }/>,
            width: 50,
            align: 'center'
        },
        {
            field: 'hsc',
            headerName: tableHeaderLabels.hsc,
            type: 'autocomplete',
            options: products,
            getOptionLabel: product => product.hsc || product,
            width: 140
        },
        {
            field: 'localD',
            headerName: tableHeaderLabels.localD,
            type: 'text'
        },
        {
            field: 'coo',
            headerName: tableHeaderLabels.coo,
            type: 'dropdown',
            options: countryOptions,
            getOptionLabel: option => getOptionLabel(option, LOCALE),
            getOptionSelected: (option, value) => option.id === value.id
        },
        {
            field: 'fdc',
            headerName: tableHeaderLabels.fdc,
            type: 'dropdown',
            options: countryOptions,
            getOptionLabel: option => getOptionLabel(option, LOCALE),
            getOptionSelected: (option, value) => option.id === value.id
        },
        {
            field: 'dop',
            headerName: tableHeaderLabels.dop,
            type: 'text'
        },
        {
            field: 'quantity',
            headerName: tableHeaderLabels.quantity,
            type: 'number'
        },
        {
            field: 'unit',
            headerName: tableHeaderLabels.unit,
            type: 'dropdown',
            options: itemUnitOptions,
            getOptionLabel: option => getOptionLabel(option, LOCALE),
            getOptionSelected: (option, value) => option.id === value.id
        },
        {
            field: 'price',
            headerName: tableHeaderLabels.price,
            type: 'number'
        },
        {
            field: 'currency',
            headerName: tableHeaderLabels.currency,
            type: 'dropdown',
            options: currencyOptions,
            getOptionLabel: option => getOptionLabel(option, LOCALE),
            getOptionSelected: (option, value) => option.id === value.id,
            width: 100
        },
        {
            field: 'total',
            headerName: tableHeaderLabels.total,
            align: 'right',
            width: 120
        }
    ], [countryOptions, currencyOptions, itemUnitOptions, onDeleteRow, products]);

    const rows = useMemo(() => coItems.map((item, idx) => ({
        idx: idx,
        hsc: item.hsc,
        localD: item.localD,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price,
        total: formatQuantityWithUnit(
            item.total,
            getCurrencySymbol(getOptionId(item.currency))
        ),
        currency: item.currency,
        coo: item.coo,
        fdc: item.fdc,
        dop: item.dop
    })), [coItems]);

    const footer = useMemo(() => [[
        { field: 'label', value: totalLabel, colSpan: 6, align: 'right' },
        {
            field: 'quantity',
            value: UnitCounter.stringRep(quantity, itemUnitsMap, LOCALE),
            colSpan: 3,
            align: 'center'
        },
        { field: 'totalAmount', value: formatTotalAmount(totalAmount), colSpan: 2, align: 'right' }
    ]], [itemUnitsMap, quantity, totalAmount]);

    return (
        <Grid container>
            { isError && <ErrorMessages error={ errMessages }/> }
            <EditableTable
                rows={ rows }
                columns={ columns }
                onCellChange={ onCellChange }
                onAddRow={ onAddRow }
                footer={ footer }
            />
            <TextArea
                name={ fieldNames.marks }
                inputRef={ register }
                rows={ 4 }
                rowsMax={ 8 }
                placeholder={ marksPlaceholderLabel }
            />
        </Grid>
    );
});

RHFChinaExportTable.propTypes = {
    rhfRegister: PropTypes.func.isRequired,
    rhfControl: PropTypes.object.isRequired,
    rhfSetValue: PropTypes.func.isRequired,
    rhfGetValues: PropTypes.func.isRequired,
    rhfErrors: PropTypes.object.isRequired,
    fieldNames: PropTypes.exact({
        coItems: PropTypes.string.isRequired,
        quantity: PropTypes.string.isRequired,
        totalAmount: PropTypes.string.isRequired,
        marks: PropTypes.string.isRequired
    }).isRequired
};

export default RHFChinaExportTable;