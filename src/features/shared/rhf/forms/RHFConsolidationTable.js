import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DeleteIconButton from '../../buttons/DeleteIconButton.js';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import TableTextField from '../../inputs/TableTextField.js';
import { Grid, IconButton } from '@material-ui/core';
import { Add as IconAdd, Close as IconClose } from '@material-ui/icons';
import { useWatch } from 'react-hook-form';
import UnitCounter from '../../classes/UnitCounter.js';
import { roundToNDecimal } from '../../utils/format.js';
import ErrorMessages from '../../components/ErrorMessages.js';
import RHFAutoComplete from '../inputs/RHFAutoComplete.js';
import { useSelector } from 'react-redux';
import {
    selectDefaultConsolidationRowItem,
    selectMeasurementUnits,
    selectPackageUnits, selectPackageUnitsMap,
    selectWeightUnits
} from 'app/duck/selectors.js';
import { getOptionLabel } from 'app/utils/options/getters.js';
import Table from 'features/shared/components/table/Table.js';

const {
    formLabels,
    tableHeaderLabels,
    totalLabel,
    errorMessages
} = LANGUAGE.shared.rhf.forms.consolidationTable;

const RHFConsolidationTable = React.memo(function RHFConsolidationTable(
    {
        rhfRegister: register,
        rhfControl: control,
        rhfSetValue: setValue,
        rhfGetValues: getValues,
        rhfErrors: errors,
        fieldNames,
        className
    }) {

    const defaultConsolidationRowItem = useSelector(selectDefaultConsolidationRowItem);

    const packageUnitOptions = useSelector(selectPackageUnits);
    const weightUnitOptions = useSelector(selectWeightUnits);
    const measurementUnitOptions = useSelector(selectMeasurementUnits);
    const packageUnitsMap = useSelector(selectPackageUnitsMap);

    const custom1 = useWatch({
        control,
        name: fieldNames.custom1
    });

    const custom2 = useWatch({
        control,
        name: fieldNames.custom2
    });

    const items = useWatch({
        control,
        name: fieldNames.items
    });

    const pkg = useWatch({
        control,
        name: fieldNames.package
    });

    const netWeight = useWatch({
        control,
        name: fieldNames.netWeight
    });

    const grossWeight = useWatch({
        control,
        name: fieldNames.grossWeight
    });

    const dimension = useWatch({
        control,
        name: fieldNames.dimension
    });

    const weightUnit = useWatch({
        control,
        name: fieldNames.weightUnit
    });

    const measurementUnit = useWatch({
        control,
        name: fieldNames.measurementUnit
    });

    const errMessages = useMemo(() => Object.values(errors).map(err => err.message), [errors]);
    const isError = useMemo(() => errMessages.length > 0, [errMessages]);

    const initialNumColumns = 11
        + (typeof custom1 === 'string' ? 1 : 0)
        + (typeof custom2 === 'string' ? 1 : 0)
        - (typeof custom1 === 'string' && typeof custom2 === 'string' ? 1 : 0);
    const [numColumns, setNumColumns] = useState(initialNumColumns);

    const onAddColumn = useCallback(() => {
        if (getValues(fieldNames.custom1) == null) {
            setNumColumns(prev => prev + 1);
            return setValue(fieldNames.custom1, '');
        }
        if (getValues(fieldNames.custom2) == null) {
            return setValue(fieldNames.custom2, '');
        }
    }, [setValue, getValues, fieldNames]);

    const onDeleteColumn = useCallback(name => {
        if (name === fieldNames.custom1) setNumColumns(prev => prev - 1);
        setValue(name, null);
        setValue(
            fieldNames.items,
            getValues(fieldNames.items).map(item => {
                const newItem = { ...item };
                newItem[name] = '';
                return newItem;
            })
        );
    }, [setValue, getValues, fieldNames]);

    const onAddRow = useCallback(
        () => {
            setValue(fieldNames.items, [...getValues(fieldNames.items), defaultConsolidationRowItem])
        },
        [setValue, getValues, fieldNames, defaultConsolidationRowItem]);

    const onDeleteRow = useCallback(
        idx => () => setValue(fieldNames.items, getValues(fieldNames.items).filter((_, i) => i !== idx)),
        [getValues, setValue, fieldNames]);

    const onCellChange = useCallback((rowIdx, key, newValue) => {
        const items = getValues(fieldNames.items);
        const newItem = { ...items[rowIdx] };
        let newPackage;
        let diff;
        switch (key) {
            case 'package':
                newValue = newValue === '' ? newValue : parseInt(newValue);
                diff = newValue - newItem.package;
                newPackage = new UnitCounter(getValues(fieldNames.package));
                newPackage.addUnit(newItem.pUnit, diff);
                setValue(fieldNames.package, newPackage.data);
                newItem.package = newValue;
                break;
            case 'pUnit':
                const prevUnit = newItem.pUnit;
                newPackage = new UnitCounter(getValues(fieldNames.package));
                newPackage.subtractUnit(prevUnit, newItem.package);
                newPackage.addUnit(newValue, newItem.package);
                setValue(fieldNames.package, newPackage.data);
                newItem.pUnit = newValue;
                break;
            case 'netW':
                newValue = newValue === '' ? newValue : roundToNDecimal(newValue, 3);
                diff = newValue - newItem.netW;
                setValue(fieldNames.netWeight, roundToNDecimal(getValues(fieldNames.netWeight) + diff, 3));
                newItem.netW = newValue;
                break;
            case 'grossW':
                newValue = newValue === '' ? newValue : roundToNDecimal(newValue, 3);
                diff = newValue - newItem.grossW;
                setValue(fieldNames.grossWeight, roundToNDecimal(getValues(fieldNames.grossWeight) + diff, 3));
                newItem.grossW = newValue;
                break;
            case 'dim':
                newValue = newValue === '' ? newValue : roundToNDecimal(newValue, 3);
                diff = newValue - newItem.dim;
                setValue(fieldNames.dimension, roundToNDecimal(getValues(fieldNames.dimension) + diff, 3));
                newItem.dim = newValue;
                break;
            default:
                newItem[key] = newValue;
        }
        setValue(fieldNames.items, [...items.slice(0, rowIdx), newItem, ...items.slice(rowIdx + 1)])
    }, [fieldNames, setValue, getValues]);

    const columns = [
        { field: 'id', hide: true },
        {
            field: 'delete',
            renderCell: params =>
                params.idx === 0 ? null : <DeleteIconButton onClick={ onDeleteRow(params.idx) }/>,
            width: 50,
            align: 'center'
        },
        {
            field: 'description',
            headerName: tableHeaderLabels.description,
            type: 'text'
        },
        {
            field: 'localD',
            headerName: tableHeaderLabels.localD,
            type: 'text'
        },
        {
            field: 'hsc',
            headerName: tableHeaderLabels.hsc,
            type: 'text',
            width: 140
        },
        {
            field: 'dg',
            headerName: tableHeaderLabels.dg,
            type: 'checkbox',
            align: 'center',
            width: 50
        },
        {
            field: 'custom1',
            renderHeader: () =>
                <TableTextField
                    name={ fieldNames.custom1 }
                    inputRef={ register({ required: errorMessages.missingCustomColumnName }) }
                    InputProps={ {
                        endAdornment:
                            <IconButton size="small" onClick={ () => onDeleteColumn('custom1') }>
                                <IconClose fontSize="small"/>
                            </IconButton>
                    } }
                />,
            type: 'text',
            hide: custom1 == null,
            width: 160
        },
        {
            field: 'custom2',
            renderHeader: () =>
                <TableTextField
                    name={ fieldNames.custom2 }
                    inputRef={ register({ required: errorMessages.missingCustomColumnName }) }
                    InputProps={ {
                        endAdornment:
                            <IconButton size="small" onClick={ () => onDeleteColumn('custom2') }>
                                <IconClose fontSize="small"/>
                            </IconButton>
                    } }
                />,
            type: 'text',
            hide: custom2 == null,
            width: 160
        },
        {
            field: 'addColumn',
            renderHeader: () =>
                <IconButton onClick={ onAddColumn } color="primary" size="small">
                    <IconAdd/>
                </IconButton>,
            renderCell: () => null,
            hide: custom1 != null && custom2 != null
        },
        {
            field: 'package',
            headerName: tableHeaderLabels.package,
            type: 'number',
            width: 80
        },
        {
            field: 'pUnit',
            headerName: tableHeaderLabels.pUnit,
            type: 'dropdown',
            options: packageUnitOptions,
            getOptionLabel: option => getOptionLabel(option),
            getOptionSelected: (option, value) => option.id === value.id,
            width: 50
        },
        {
            field: 'netW',
            headerName: tableHeaderLabels.netW,
            type: 'number',
            width: 80
        },
        {
            field: 'grossW',
            headerName: tableHeaderLabels.grossW,
            type: 'number',
            width: 80
        },
        {
            field: 'dim',
            headerName: tableHeaderLabels.dim,
            type: 'number',
            width: 80
        }
    ];

    const rows = items.map((row, index) => ({
        id: row._id,
        idx: index,
        description: row.description,
        localD: row.localD,
        hsc: row.hsc,
        dg: row.dg,
        custom1: row.custom1,
        custom2: row.custom2,
        package: row.package,
        pUnit: row.pUnit,
        netW: row.netW,
        grossW: row.grossW,
        dim: row.dim
    }));

    const footer = useMemo(() => [[
        { field: 'label', value: totalLabel, colSpan: numColumns - 5, align: 'right' },
        { field: 'package', value: UnitCounter.stringRep(pkg, packageUnitsMap, LOCALE), colSpan: 2, align: 'center' },
        { field: 'netWeight', value: `${ weightUnit } ${ netWeight }`, colSpan: 1, align: 'center' },
        { field: 'grossWeight', value: `${ weightUnit } ${ grossWeight }`, colSpan: 1, align: 'center' },
        { field: 'dimension', value: `${ measurementUnit } ${ dimension }`, colSpan: 1, align: 'center' }
    ]], [
        numColumns,
        pkg,
        netWeight,
        grossWeight,
        dimension,
        weightUnit,
        measurementUnit,
        packageUnitsMap
    ]);

    const options = useMemo(() => ({
        table: {
            isEdit: true
        },
        body: {
            onAddRow: onAddRow,
            onCellChange: onCellChange
        },
        foot: {
            pagination: false
        }
    }), [onAddRow, onCellChange]);

    return (
        <Grid container className={ className }>
            { isError &&
            <Grid container item justify="center" xs={ 12 }>
                <ErrorMessages error={ errMessages }/>
            </Grid>
            }
            <Grid container item justify="flex-end" xs={ 12 }>
                <RHFAutoComplete
                    rhfControl={ control }
                    name={ fieldNames.weightUnit }
                    label={ formLabels.weightUnit }
                    options={ weightUnitOptions }
                    getOptionLabel={ option => getOptionLabel(option) }
                    getOptionSelected={ (option, value) => option.id === value.id }
                    error={ !!errors.weightUnit }
                    required={ errorMessages.missingWeightUnit }
                />
                <RHFAutoComplete
                    rhfControl={ control }
                    name={ fieldNames.measurementUnit }
                    label={ formLabels.measurementUnit }
                    options={ measurementUnitOptions }
                    getOptionLabel={ option => getOptionLabel(option) }
                    getOptionSelected={ (option, value) => option.id === value.id }
                    error={ !!errors.measurementUnit }
                    required={ errorMessages.missingMeasurementUnit }
                />
            </Grid>
            <Grid item xs={ 12 }>
                <Table
                    columns={ columns }
                    rows={ rows }
                    footer={ footer }
                    options={ options }
                />
            </Grid>
        </Grid>
    )
});

RHFConsolidationTable.propTypes = {
    rhfRegister: PropTypes.func.isRequired,
    rhfControl: PropTypes.object.isRequired,
    rhfSetValue: PropTypes.func.isRequired,
    rhfGetValues: PropTypes.func.isRequired,
    rhfErrors: PropTypes.object.isRequired,
    fieldNames: PropTypes.exact({
        custom1: PropTypes.string.isRequired,
        custom2: PropTypes.string.isRequired,
        items: PropTypes.string.isRequired,
        package: PropTypes.string.isRequired,
        netWeight: PropTypes.string.isRequired,
        grossWeight: PropTypes.string.isRequired,
        dimension: PropTypes.string.isRequired,
        weightUnit: PropTypes.string.isRequired,
        measurementUnit: PropTypes.string.isRequired
    }).isRequired,
    className: PropTypes.string
};

export default RHFConsolidationTable;

