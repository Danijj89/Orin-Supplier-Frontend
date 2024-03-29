import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useWatch } from 'react-hook-form';
import { Grid, IconButton } from '@material-ui/core';
import { LANGUAGE, LOCALE } from 'app/utils/constants.js';
import TableTextField from '../../inputs/TableTextField.js';
import { Add as IconAdd, Close as IconClose } from '@material-ui/icons';
import UnitCounter from '../../classes/UnitCounter.js';
import { formatItemsTotalQuantities, formatQuantityWithUnit, roundToNDecimal } from '../../utils/format.js';
import ErrorSnackbar from 'features/shared/components/ErrorSnackbar.js';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import RHFAutoComplete from '../inputs/RHFAutoComplete.js';
import { useSelector } from 'react-redux';
import {
    selectMeasurementUnits,
    selectPackageUnits,
    selectPackageUnitsMap,
    selectWeightUnits
} from 'app/duck/selectors.js';
import { getOptionId, getOptionLabel } from 'app/utils/options/getters.js';
import Table from 'features/shared/components/table/Table.js';
import useMeasuresData from 'features/shared/hooks/useMeasuresData.js';

const useStyles = makeStyles((theme) => ({
    marks: {
        padding: theme.spacing(2)
    },
    marksLabel: {
        fontWeight: 'bold',
        marginRight: theme.spacing(2)
    },
    options: {
        marginBottom: theme.spacing(2),
    }
}));

const {
    formLabels,
    tableHeaderLabels,
    totalLabel,
    marksLabel,
    errorMessages
} = LANGUAGE.shared.rhf.forms.measureTable;

export const validateItemMeasures = (items) => {
    if (!items.length) return errorMessages.missingItems;
    for (const item of items) {
        if (!(item.package && item.pUnit && item.netW && item.grossW && item.dim)) {
            return errorMessages.missingItemInfo;
        }
    }
    return true;
}

const RHFMeasureTable = React.memo(function RHFMeasureTable(
    {
        rhfControl: control,
        rhfGetValues: getValues,
        rhfSetValue: setValue,
        rhfErrors: errors,
        fieldNames,
        className
    }) {
    const classes = useStyles();
    const packageUnitOptions = useSelector(selectPackageUnits);
    const packageUnitsMap = useSelector(selectPackageUnitsMap);
    const weightUnitOptions = useSelector(selectWeightUnits);
    const measurementUnitOptions = useSelector(selectMeasurementUnits);

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

    const initialNumColumns = useMemo(() => {
        const custom1 = getValues(fieldNames.custom1);
        const custom2 = getValues(fieldNames.custom2);
        return 8 + (custom1 ? 1 : 0) + (custom2 ? 1 : 0) - (custom1 && custom1 ? 1 : 0);
    }, [getValues, fieldNames.custom1, fieldNames.custom2]);

    const [numColumns, setNumColumns] = useState(initialNumColumns);
    const [measuresData, setMeasuresData] = useMeasuresData(items);

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

    const onCellChange = useCallback((rowIdx, key, newValue) => {
        const items = getValues(fieldNames.items);
        const newItem = { ...items[rowIdx] };
        let diff;
        switch (key) {
            case 'package':
                newValue = newValue === '' ? newValue : parseInt(newValue);
                diff = newValue - newItem.package;
                setMeasuresData(prevData => {
                    const newPackage = new UnitCounter(prevData.package);
                    newPackage.addUnit(getOptionId(newItem.pUnit), diff);
                    return {
                        ...prevData,
                        package: newPackage.data
                    };
                });
                newItem.package = newValue;
                break;
            case 'pUnit':
                const prevUnit = getOptionId(newItem.pUnit);
                setMeasuresData(prevData => {
                    const newPackage = new UnitCounter(prevData.package);
                    newPackage.subtractUnit(prevUnit, newItem.package);
                    newPackage.addUnit(getOptionId(newValue), newItem.package);
                    return {
                        ...prevData,
                        package: newPackage.data
                    };
                });
                newItem.pUnit = newValue;
                break;
            case 'netW':
                newValue = newValue === '' ? newValue : roundToNDecimal(newValue, 3);
                diff = newValue - newItem.netW;
                setMeasuresData(prevData => ({
                    ...prevData,
                    netWeight: roundToNDecimal(prevData.netWeight + diff, 3)
                }));
                newItem.netW = newValue;
                break;
            case 'grossW':
                newValue = newValue === '' ? newValue : roundToNDecimal(newValue, 3);
                diff = newValue - newItem.grossW;
                setMeasuresData(prevData => ({
                    ...prevData,
                    grossWeight: roundToNDecimal(prevData.grossWeight + diff, 3)
                }));
                newItem.grossW = newValue;
                break;
            case 'dim':
                newValue = newValue === '' ? newValue : roundToNDecimal(newValue, 3);
                diff = newValue - newItem.dim;
                setMeasuresData(prevData => ({
                    ...prevData,
                    dimension: roundToNDecimal(prevData.dimension + diff, 3)
                }));
                newItem.dim = newValue;
                break;
            case 'custom1':
                newItem[fieldNames.custom1] = newValue;
                break;
            case 'custom2':
                newItem[fieldNames.custom2] = newValue;
                break;
            default:
                newItem[key] = newValue;
        }
        setValue(fieldNames.items, [...items.slice(0, rowIdx), newItem, ...items.slice(rowIdx + 1)])
    }, [fieldNames, setValue, getValues, setMeasuresData]);

    const createRenderColumn = useCallback((column, value) => () =>
        <TableTextField
            value={ value }
            onChange={ e => setValue(column, e.target.value) }
            InputProps={ {
                endAdornment:
                    <IconButton size="small" onClick={ () => onDeleteColumn(column) }>
                        <IconClose fontSize="small"/>
                    </IconButton>
            } }
        />, [setValue, onDeleteColumn]);

    const columns = useMemo(() => ([
        {
            field: 'ref',
            headerName: tableHeaderLabels.ref
        },
        {
            field: 'description',
            headerName: tableHeaderLabels.description
        },
        {
            field: 'custom1',
            renderHeader: createRenderColumn(fieldNames.custom1, custom1),
            editType: 'text',
            hide: custom1 == null,
            width: 160
        },
        {
            field: 'custom2',
            renderHeader: createRenderColumn(fieldNames.custom2, custom2),
            editType: 'text',
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
            editType: 'number',
            width: 100
        },
        {
            field: 'pUnit',
            headerName: tableHeaderLabels.pUnit,
            editType: 'dropdown',
            options: packageUnitOptions,
            getOptionLabel: option => getOptionLabel(option, LOCALE),
            getOptionSelected: (option, value) => option.id === value.id,
            width: 70,
        },
        {
            field: 'netW',
            headerName: tableHeaderLabels.netW,
            editType: 'number',
            width: 100
        },
        {
            field: 'grossW',
            headerName: tableHeaderLabels.grossW,
            editType: 'number',
            width: 100
        },
        {
            field: 'dim',
            headerName: tableHeaderLabels.dim,
            editType: 'number',
            width: 100
        }
    ]), [
        custom1,
        custom2,
        fieldNames,
        onAddColumn,
        packageUnitOptions,
        createRenderColumn
    ]);

    const rows = useMemo(() => items.map((row, index) => ({
        id: row._id,
        idx: index,
        ref: row.ref,
        description: row.description,
        custom1: row[fieldNames.custom1],
        custom2: row[fieldNames.custom2],
        package: row.package,
        pUnit: row.pUnit,
        netW: row.netW,
        grossW: row.grossW,
        dim: row.dim
    })), [items, fieldNames.custom1, fieldNames.custom2]);

    const footer = useMemo(() => [[
        { field: 'label', value: totalLabel, colSpan: numColumns - 5, align: 'right' },
        {
            field: 'package',
            value: formatItemsTotalQuantities(measuresData.package, packageUnitsMap, LOCALE),
            colSpan: 2,
            align: 'center'
        },
        {
            field: 'netWeight',
            value: formatQuantityWithUnit(measuresData.netWeight, weightUnit),
            colSpan: 1,
            align: 'center'
        },
        {
            field: 'grossWeight',
            value: formatQuantityWithUnit(measuresData.grossWeight, weightUnit),
            colSpan: 1,
            align: 'center'
        },
        {
            field: 'dimension',
            value: formatQuantityWithUnit(measuresData.dimension, measurementUnit),
            colSpan: 1,
            align: 'center'
        }
    ]], [
        numColumns,
        weightUnit,
        measurementUnit,
        packageUnitsMap,
        measuresData
    ]);

    const options = useMemo(() => ({
        table: {
            isEdit: true,
            dense: true,
        },
        body: {
            maxEmptyRows: 0,
            onCellChange: onCellChange,
            hover: false
        },
        foot: {
            pagination: 'none'
        }
    }), [onCellChange]);

    return (
        <Grid container className={ className }>
            { isError &&
            <Grid container  item justify="center" xs={ 12 }>
                <ErrorSnackbar error={ errMessages }/>
            </Grid>
            }
            <Grid container item justify="flex-end" xs={ 12 }>
                <RHFAutoComplete
                    className={classes.options}
                    rhfControl={ control }
                    name={ fieldNames.weightUnit }
                    label={ formLabels.weightUnit }
                    options={ weightUnitOptions }
                    getOptionLabel={ option => getOptionLabel(option, LOCALE) }
                    getOptionSelected={ (option, value) => option.id === value.id }
                    error={ !!errors.weightUnit }
                    required={ errorMessages.missingWeightUnit }
                />
                <RHFAutoComplete
                    className={classes.options}
                    rhfControl={ control }
                    name={ fieldNames.measurementUnit }
                    label={ formLabels.measurementUnit }
                    options={ measurementUnitOptions }
                    getOptionLabel={ option => getOptionLabel(option, LOCALE) }
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
            <Grid container item xs={ 12 } className={ classes.marks }>
                <Typography className={ classes.marksLabel }>{ marksLabel }</Typography>
                <Typography>{ getValues(fieldNames.marks) }</Typography>
            </Grid>
        </Grid>
    )
});

RHFMeasureTable.propTypes = {
    rhfControl: PropTypes.object.isRequired,
    rhfGetValues: PropTypes.func.isRequired,
    rhfSetValue: PropTypes.func.isRequired,
    rhfErrors: PropTypes.object.isRequired,
    fieldNames: PropTypes.exact({
        custom1: PropTypes.string.isRequired,
        custom2: PropTypes.string.isRequired,
        items: PropTypes.string.isRequired,
        weightUnit: PropTypes.string.isRequired,
        measurementUnit: PropTypes.string.isRequired,
        marks: PropTypes.string.isRequired
    }).isRequired,
    className: PropTypes.string
};

export default RHFMeasureTable;