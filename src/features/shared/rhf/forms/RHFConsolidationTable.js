import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import EditableTable from '../../components/editable_table/EditableTable.js';
import DeleteIconButton from '../../buttons/DeleteIconButton.js';
import { LANGUAGE } from '../../../../app/constants.js';
import TableTextField from '../../inputs/TableTextField.js';
import { Grid, IconButton } from '@material-ui/core';
import { Add as IconAdd, Close as IconClose } from '@material-ui/icons';
import { Controller, useWatch } from 'react-hook-form';
import { measurementUnitsOptions, packageUnitsOptions, weightUnitsOptions } from '../../constants.js';
import SideAutoComplete from '../../inputs/SideAutoComplete.js';
import UnitCounter from '../../classes/UnitCounter.js';
import { roundToNDecimal } from '../../utils/format.js';
import ErrorDisplay from '../../components/ErrorDisplay.js';

export const defaultConsolidationItemValues = {
    _id: null,
    shipment: null,
    description: '',
    localD: '',
    hsc: '',
    dg: false,
    package: 0,
    pUnit: packageUnitsOptions[0],
    netW: 0,
    grossW: 0,
    dim: 0,
    custom1: '',
    custom2: ''
};

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
            setValue(fieldNames.items, [...getValues(fieldNames.items), defaultConsolidationItemValues])
        },
        [setValue, getValues, fieldNames]);

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
                newPackage = new UnitCounter(packageUnitsOptions, getValues(fieldNames.package));
                newPackage.addUnit(newItem.pUnit, diff);
                setValue(fieldNames.package, newPackage.data);
                newItem.package = newValue;
                break;
            case 'pUnit':
                const prevUnit = newItem.pUnit;
                newPackage = new UnitCounter(packageUnitsOptions, getValues(fieldNames.package));
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
            options: packageUnitsOptions,
            getOptionLabel: (option) => option,
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
        { field: 'package', value: UnitCounter.stringRep(pkg), colSpan: 2, align: 'center' },
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
        measurementUnit
    ]);

    return (
        <Grid container className={ className }>
            { isError &&
            <Grid container item justify="center" xs={ 12 }>
                <ErrorDisplay errors={ errMessages }/>
            </Grid>
            }
            <Grid container item justify="flex-end" xs={ 12 }>
                <Controller
                    render={ props =>
                        <SideAutoComplete
                            { ...props }
                            options={ weightUnitsOptions }
                            label={ formLabels.weightUnit }
                            error={ !!errors.weightUnit }
                            required
                        />
                    }
                    name={ fieldNames.weightUnit }
                    control={ control }
                    rules={ { required: errorMessages.missingWeightUnit } }
                />
                <Controller
                    render={ props =>
                        <SideAutoComplete
                            { ...props }
                            options={ measurementUnitsOptions }
                            label={ formLabels.measurementUnit }
                            error={ !!errors.measurementUnit }
                            required
                        />
                    }
                    name={ fieldNames.measurementUnit }
                    control={ control }
                    rules={ { required: errorMessages.missingMeasurementUnit } }
                />
            </Grid>
            <Grid item xs={ 12 }>
                <EditableTable
                    rows={ rows }
                    columns={ columns }
                    onCellChange={ onCellChange }
                    onAddRow={ onAddRow }
                    footer={ footer }
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

