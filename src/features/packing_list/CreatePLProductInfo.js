import React, { useEffect } from 'react';
import { LANGUAGE } from '../../app/constants.js';
import { Grid, TextField, Button } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentDefaults } from '../../app/duck/slice.js';
import AddColumnButton from '../shared/buttons/addColumnButton.js';
import { selectNewPL } from './duck/selectors.js';
import { submitPLTableInfo } from './duck/slice.js';
import CreatePLProductTable from './CreatePLProductTable.js';
import UnitCounter from '../shared/classes/UnitCounter.js';
import { submitPLForPreview } from './duck/thunks.js';
import ErrorDisplayer from '../shared/components/ErrorMessages.js';


const {
    measurementUnitLabel,
    weightUnitLabel,
    marksLabel,
    prevButton,
    nextButton,
    errorMessages
} = LANGUAGE.packingList.createPLProductInfo;

const useStyles = makeStyles((theme) => ({
    measurementsRow: {
        marginTop: 40,
        marginBottom: 10
    },
    tableRow: {
        marginTop: 10,
        marginBottom: 40
    },
    marksRow: {
        marginTop: 40,
        marginBottom: 40
    },
    unitDropdown: {
        minWidth: 160,
        width: 200,
        marginLeft: 8,
        marginRight: 8
    },
    marks: {
        width: '100%',
        border: 'none'
    }
}));

export default function CreatePLProductInfo({ setActiveStep }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { itemUnits, measurementUnits, weightUnits, packageUnits } = useSelector(selectCurrentDefaults);
    const {
        headers: defaultHeaders, measurementUnit, weightUnit, totalP,
        totalNW, totalGW, totalD, items, totalQ
    } = useSelector(selectNewPL);

    const {
        register, control, handleSubmit, errors, setValue, watch
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            measurementUnit,
            weightUnit,
            items: items,
            headers: defaultHeaders,
            marks: '',
            totalQ: new UnitCounter(itemUnits, totalQ),
            totalP: new UnitCounter(packageUnits, totalP),
            totalNW,
            totalGW,
            totalD
        }
    });

    const validateItems = (items) => {
        for (const item of items) {
            for (let i = 0; i < item.length; i++) {
                if (i >= 1 && i <= 3) continue;
                if (!item[i]) return errorMessages.missingItemInfo;
            }
        }
        return true;
    }

    useEffect(() => {
        register({ name: 'items' }, { validate: validateItems});
        register({ name: 'headers' });
        register({ name: 'totalQ '});
        register({ name: 'totalP' });
        register({ name: 'totalNW' });
        register({ name: 'totalGW' });
        register({ name: 'totalD' });
    }, [register])

    const headersWatcher = watch('headers');
    const numActiveColumns = headersWatcher.reduce((acc, header) => header ? acc + 1 : acc, 0);
    const onAddColumnClick = (newColumnName) => {
        const newHeaders = [...headersWatcher];
        if (!newHeaders[2]) newHeaders[2] = newColumnName;
        else if (!newHeaders[3]) newHeaders[3] = newColumnName;
        setValue('headers', newHeaders, { shouldValidate: true });
    }

    const onPrevButtonClick = (data) => {
        dispatch(submitPLTableInfo(data));
        setActiveStep(prevStep => prevStep - 1);
    }

    const onButtonNextClick = (data) => {
        data.totalQ = data.totalQ.data;
        data.totalP = data.totalP.data;
        dispatch(submitPLTableInfo(data));
        dispatch(submitPLForPreview());
        setActiveStep(preStep => preStep + 1);
    };

    return (
        <form onSubmit={ handleSubmit(onButtonNextClick) } autoComplete="off">
            <Grid
                container
            >
                <Grid
                    container
                    item
                    justify="flex-start"
                    className={ classes.measurementsRow }
                    xs={ 8 }
                >
                        <Controller
                            render={ props => (
                                <Autocomplete
                                    { ...props }
                                    options={ measurementUnits }
                                    renderInput={ params => (
                                        <TextField
                                            { ...params }
                                            label={ measurementUnitLabel }
                                            variant="outlined"
                                            error={ !!errors.measurementUnit }
                                            size="small"
                                            className={ classes.unitDropdown }
                                        />
                                    ) }
                                    onChange={ (_, data) => props.onChange(data) }
                                />
                            ) }
                            name="measurementUnit"
                            control={ control }
                            rules={ { required: errorMessages.mUnit } }
                        />
                        <Controller
                            render={ props => (
                                <Autocomplete
                                    { ...props }
                                    options={ weightUnits }
                                    renderInput={ params => (
                                        <TextField
                                            { ...params }
                                            label={ weightUnitLabel }
                                            variant="outlined"
                                            error={ !!errors.weightUnit }
                                            className={ classes.unitDropdown }
                                            size="small"
                                        />
                                    ) }
                                    onChange={ (_, data) => props.onChange(data) }
                                />
                            ) }
                            name="weightUnit"
                            control={ control }
                            rules={ { required: errorMessages.mUnit } }
                        />
                </Grid>
                <Grid
                    container
                    item
                    justify="flex-end"
                    className={classes.measurementsRow}
                    xs={ 4 }
                >
                    <AddColumnButton
                        currColNumbers={ numActiveColumns }
                        onConfirmClick={ onAddColumnClick }
                        maxNumColumns={ 9 }
                    />
                </Grid>
                { Object.keys(errors).length > 0 &&
                <Grid
                    container
                    item
                    justify="center"
                    alignItems="center"
                    xs={ 12 }
                >
                    <ErrorDisplayer errors={ Object.values(errors).map(err => err.message) }/>
                </Grid>
                }
                <Grid item xs={ 12 } className={ classes.tableRow }>
                    <CreatePLProductTable
                        watch={ watch }
                        setValue={ setValue }
                        numActiveColumns={ numActiveColumns }
                    />
                </Grid>
                <Grid
                    item
                    className={ classes.marksRow }
                    xs={ 12 }
                >
                    <TextField
                        multiline
                        placeholder={ marksLabel }
                        rows={ 3 }
                        fullWidth
                        variant="outlined"
                        rowsMax={ Infinity }
                        name="marks"
                        inputRef={ register }
                    />
                </Grid>
                <Grid
                    container
                    item
                    className={ classes.row }
                    justify="space-around"
                    xs={ 12 }
                >
                    <Button variant="outlined" onClick={ handleSubmit(onPrevButtonClick) }>{ prevButton }</Button>
                    <Button variant="contained" type="submit">{ nextButton }</Button>
                </Grid>
            </Grid>
        </form>
    )
}
