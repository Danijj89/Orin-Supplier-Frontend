import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import DeleteIconButton from '../../buttons/DeleteIconButton.js';
import { useWatch } from 'react-hook-form';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import { useSelector } from 'react-redux';
import {
    selectCountries,
    selectCurrencies, selectCurrenciesMap, selectDefaultConsolidationRowItem,
    selectItemUnits,
    selectItemUnitsMap
} from 'app/duck/selectors.js';
import { getOptionId, getOptionLabel } from 'app/utils/options/getters.js';
import Grid from '@material-ui/core/Grid';
import ErrorSnackbar from 'features/shared/components/ErrorSnackbar.js';
import UnitCounter from '../../classes/UnitCounter.js';
import { getCurrencySymbol } from '../../utils/random.js';
import { selectCompanyDefaultAddress, selectCurrentCompany } from 'features/home/duck/home/selectors.js';
import { selectAllActiveProducts } from '../../../products/duck/selectors.js';
import TextArea from '../../inputs/TextArea.js';
import {
    formatCurrency, formatCurrencyTotalAmount,
    formatItemsTotalQuantities, formatNumberWithDecimal,
    roundToNDecimal
} from '../../utils/format.js';
import Table from 'features/shared/components/table/Table.js';
import useExportData from 'features/shared/hooks/useExportData.js';

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
    const currenciesMap = useSelector(selectCurrenciesMap);
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

    const errMessages = useMemo(() => Object.values(errors).map(err => err.message), [errors]);
    const isError = useMemo(() => errMessages.length > 0, [errMessages]);
    const [exportData, setExportData] = useExportData(coItems);

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
                    setExportData(prevData => {
                        const newQuantity = new UnitCounter(prevData.quantity);
                        const newTotalAmount = new UnitCounter(prevData.totalAmount);
                        newQuantity.addUnit(getOptionId(newItem.unit), diff);
                        newTotalAmount.addUnit(getOptionId(newItem.currency),
                            roundToNDecimal(newItem.price * diff, 2));
                        return {
                            quantity: newQuantity.data,
                            totalAmount: newTotalAmount.data
                        };
                    });
                    newItem.total = roundToNDecimal(newValue * newItem.price, 2);
                    newItem.quantity = newValue;
                    break;
                case 'unit':
                    const prevUnit = getOptionId(newItem.unit);
                    setExportData(prevData => {
                        const newQuantity = new UnitCounter(prevData.quantity);
                        newQuantity.subtractUnit(prevUnit, newItem.quantity);
                        newQuantity.addUnit(getOptionId(newValue), newItem.quantity);
                        return {
                            ...prevData,
                            quantity: newQuantity.data
                        };
                    });
                    newItem.unit = newValue;
                    break;
                case 'price':
                    newValue = newValue === '' ? newValue : roundToNDecimal(newValue, 2);
                    diff = newValue - newItem.price;
                    setExportData(prevData => {
                        const newTotalAmount = new UnitCounter(prevData.totalAmount);
                        newTotalAmount.addUnit(getOptionId(newItem.currency),
                            roundToNDecimal(newItem.quantity * diff, 2));
                        return {
                            ...prevData,
                            totalAmount: newTotalAmount.data
                        };
                    });
                    newItem.total = roundToNDecimal(newValue * newItem.quantity, 2);
                    newItem.price = newValue;
                    break;
                case 'currency':
                    const prevCurrency = getOptionId(newItem.currency);
                    diff = newItem.quantity * newItem.price;
                    setExportData(prevData => {
                        const newTotalAmount = new UnitCounter(prevData.totalAmount);
                        newTotalAmount.subtractUnit(prevCurrency, roundToNDecimal(diff, 2));
                        newTotalAmount.addUnit(getOptionId(newValue), roundToNDecimal(diff, 2));
                        return {
                            ...prevData,
                            totalAmount: newTotalAmount.data
                        };
                    });
                    newItem.currency = newValue;
                    break;
                default:
                    newItem[key] = newValue;
            }
            setValue(fieldNames.coItems, [...items.slice(0, rowIdx), newItem, ...items.slice(rowIdx + 1)])
        },
        [getValues, setValue, fieldNames, setExportData]);

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
            editType: 'autocomplete',
            options: products,
            getOptionLabel: product => product.hsc || product,
            width: 140
        },
        {
            field: 'localD',
            headerName: tableHeaderLabels.localD,
            editType: 'text'
        },
        {
            field: 'coo',
            headerName: tableHeaderLabels.coo,
            editType: 'dropdown',
            options: countryOptions,
            getOptionLabel: option => getOptionLabel(option, LOCALE),
            getOptionSelected: (option, value) => option.id === value.id
        },
        {
            field: 'fdc',
            headerName: tableHeaderLabels.fdc,
            editType: 'dropdown',
            options: countryOptions,
            getOptionLabel: option => getOptionLabel(option, LOCALE),
            getOptionSelected: (option, value) => option.id === value.id
        },
        {
            field: 'dop',
            headerName: tableHeaderLabels.dop,
            editType: 'text'
        },
        {
            field: 'quantity',
            headerName: tableHeaderLabels.quantity,
            editType: 'number'
        },
        {
            field: 'unit',
            headerName: tableHeaderLabels.unit,
            editType: 'dropdown',
            options: itemUnitOptions,
            getOptionLabel: option => getOptionLabel(option, LOCALE),
            getOptionSelected: (option, value) => option.id === value.id
        },
        {
            field: 'price',
            headerName: tableHeaderLabels.price,
            editType: 'number',
        },
        {
            field: 'currency',
            headerName: tableHeaderLabels.currency,
            editType: 'dropdown',
            options: currencyOptions,
            getOptionLabel: option => getOptionLabel(option, LOCALE),
            getOptionSelected: (option, value) => option.id === value.id,
            width: 100
        },
        {
            field: 'total',
            headerName: tableHeaderLabels.total,
            align: 'right',
            width: 120,
            format: row => formatCurrency(row.total, row.currency)
        }
    ], [countryOptions, currencyOptions, itemUnitOptions, onDeleteRow, products]);

    const rows = useMemo(() => coItems.map((item, idx) => ({
        idx: idx,
        hsc: item.hsc,
        localD: item.localD,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price,
        total: item.total,
        currency: item.currency,
        coo: item.coo,
        fdc: item.fdc,
        dop: item.dop
    })), [coItems]);

    const footer = useMemo(() => [[
        { field: 'label', value: totalLabel, colSpan: 6, align: 'right' },
        {
            field: 'quantity',
            value: formatItemsTotalQuantities(exportData.quantity, itemUnitsMap, LOCALE),
            colSpan: 3,
            align: 'center'
        },
        {
            field: 'totalAmount',
            value: formatCurrencyTotalAmount(exportData.totalAmount, currenciesMap),
            colSpan: 2,
            align: 'right'
        }
    ]], [itemUnitsMap, exportData, currenciesMap]);

    const options = useMemo(() => ({
        table: {
            isEdit: true
        },
        body: {
            maxEmptyRows: 0,
            onAddRow: onAddRow,
            onCellChange: onCellChange,
            hover: false
        },
        foot: {
            pagination: 'none'
        }
    }), [onAddRow, onCellChange]);

    return (
        <Grid container>
            { isError && <ErrorSnackbar error={ errMessages }/> }
            <Table
                columns={ columns }
                rows={ rows }
                footer={ footer }
                options={ options }
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
        marks: PropTypes.string.isRequired
    }).isRequired
};

export default RHFChinaExportTable;