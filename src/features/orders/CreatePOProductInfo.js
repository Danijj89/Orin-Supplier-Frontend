import React, { useEffect } from 'react';
import { Grid, Paper, Checkbox, FormControlLabel } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import CreatePOProductTable from './CreatePOProductTable.js';
import { selectCurrentDefaults } from '../home/slice.js';
import { selectNewOrder } from './duck/selectors.js';
import { useForm } from 'react-hook-form';
import UnitCounter from '../shared/classes/UnitCounter.js';
import AddColumnButton from '../shared/buttons/addColumnButton.js';
import { submitPOProductInfo } from './duck/slice.js';
import { makeStyles } from '@material-ui/core/styles';
import ErrorMessage from '../shared/displays/ErrorMessage.js';
import RHFThemedDropdown from '../shared/rhf/RHFThemedDropdown.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { submitOrder } from './duck/thunks.js';

const { currencyLabel, prevButton, nextButton, errorMessages, saveItemsLabel } = LANGUAGE.order.orderProductInfo;

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        minHeight: 600
    },
    table: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    row: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
}));

export default function CreatePOProductInfo({ setActiveStep }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { currencies, itemUnits } = useSelector(selectCurrentDefaults);
    const newOrder = useSelector(selectNewOrder);


    const { register, control, handleSubmit, errors, setValue, watch, clearErrors, getValues } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            currency: newOrder.currency,
            unallocated: newOrder.unallocated,
            headers: newOrder.headers,
            totalQ: new UnitCounter(itemUnits, newOrder.totalQ),
            totalA: newOrder.totalA,
            saveItems: newOrder.saveItems
        }
    });

    const saveItems = watch('saveItems');

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
        register({ name: 'unallocated' }, { validate: validateItems });
        register({ name: 'headers' });
        register({ name: 'totalQ' });
        register({ name: 'totalA' });
        register({ name: 'saveItems' });
    }, [register]);

    const headersWatcher = watch('headers');
    const numActiveColumns = headersWatcher.reduce((acc, header) => header ? acc + 1 : acc, 0);
    const onAddColumnClick = (newColumnName) => {
        const newHeaders = [...headersWatcher];
        if (!newHeaders[2]) newHeaders[2] = newColumnName;
        else if (!newHeaders[3]) newHeaders[3] = newColumnName;
        setValue('headers', newHeaders, { shouldValidate: true });
    }

    const onPrevButtonClick = () => {
        clearErrors();
        const data = getValues();
        data.totalQ = data.totalQ.data;
        console.log(data);
        dispatch(submitPOProductInfo(data));
        setActiveStep(prevStep => prevStep - 1);
    }

    const onNextButtonClick = (data) => {
        data.totalQ = data.totalQ.data;
        dispatch(submitPOProductInfo(data));
        dispatch(submitOrder());
    };

    return (
        <Paper className={ classes.paper }>
            <form onSubmit={ handleSubmit(onNextButtonClick) } autoComplete="off">
                <Grid container>
                    <Grid
                        container
                        className={ classes.row }
                        item
                        justify="space-between"
                        alignItems="center"
                        xs={ 12 }
                    >
                        <RHFThemedDropdown
                            options={ currencies }
                            label={ currencyLabel }
                            error={ errors.currency }
                            name="currency"
                            control={ control }
                            errorMessage={ errorMessages.currency }
                        />
                        <AddColumnButton
                            maxNumColumns={ 7 }
                            currColNumbers={ numActiveColumns }
                            onConfirmClick={ onAddColumnClick }
                        />

                    </Grid>
                    <Grid container item justify="flex-end" alignItems="center" xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={ saveItems }
                                    onChange={ () => setValue('saveItems', !saveItems) }
                                    color="primary"
                                />
                            }
                            label={ saveItemsLabel }
                        />
                    </Grid>
                    <Grid
                        container
                        item
                        justify="center"
                        alignItems="center"
                        xs={ 12 }
                    >
                        { Object.keys(errors).length > 0 &&
                        <ErrorMessage errors={ Object.values(errors).map(err => err.message) }/> }
                    </Grid>
                </Grid>
                <Grid item className={ classes.table }>
                    <CreatePOProductTable
                        watch={ watch }
                        setValue={ setValue }
                        numActiveColumns={ numActiveColumns }
                    />
                </Grid>
                <Grid container className={ classes.row } item justify="space-around" xs={ 12 }>
                    <ThemedButton
                        variant="outlined"
                        onClick={ onPrevButtonClick }
                        text={ prevButton }
                    />
                    <ThemedButton
                        variant="contained"
                        type="submit"
                        text={ nextButton }
                    />
                </Grid>
            </form>
        </Paper>
    )
}