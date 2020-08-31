import React, { useEffect } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Button, Grid } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import CreatePOProductTable from './CreatePOProductTable.js';
import { submitOrderForPreview } from './duck/thunks.js';
import { selectCurrentDefaults } from '../home/slice.js';
import { selectNewPO } from './duck/selectors.js';
import { Controller, useForm } from 'react-hook-form';
import UnitCounter from '../shared/classes/UnitCounter.js';
import AddColumnButton from '../shared/buttons/addColumnButton.js';
import { submitPOProductInfo } from './duck/slice.js';
import { makeStyles } from '@material-ui/core/styles';
import ErrorMessage from '../shared/displays/ErrorMessage.js';

const { currencyLabel, prevButton, nextButton, errorMessages } = LANGUAGE.order.orderProductInfo;

const useStyles = makeStyles({
    currency: {
        minWidth: 160,
        width: 200,
        marginLeft: 8,
        marginRight: 8
    }
})

export default function CreatePOProductInfo({ setActiveStep }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { currencies, itemUnits } = useSelector(selectCurrentDefaults);
    const { currency, items, headers, totalQ, totalA } = useSelector(selectNewPO);

    const { register, control, handleSubmit, errors, setValue, watch } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            currency,
            items,
            headers,
            totalQ: new UnitCounter(itemUnits, totalQ),
            totalA
        }
    });

    const validateItems = (items) => {
        if (items.length > 0) {
            const first = items[0];
            for (let i = 0; i < first.length; i++) {
                if (i === 2 || i === 3) continue;
                if (!first[i]) return false;
            }
            return true;
        }
        return false;
    }

    useEffect(() => {
        register({ name: 'items' }, { validate: (items) => validateItems(items) || errorMessages.items});
        register({ name: 'headers' });
        register({ name: 'totalQ' });
        register({ name: 'totalA' });
    }, [register]);

    const headersWatcher = watch('headers');
    const numActiveColumns = headersWatcher.reduce((acc, header) => header ? acc + 1 : acc, 0);
    const onAddColumnClick = (newColumnName) => {
        const newHeaders = [...headersWatcher];
        if (!newHeaders[2]) newHeaders[2] = newColumnName;
        else if (!newHeaders[3]) newHeaders[3] = newColumnName;
        setValue('headers', newHeaders, { shouldValidate: true });
    }

    const onPrevButtonClick = () =>
        setActiveStep(prevStep => prevStep - 1);

    const onNextButtonClick = (data) => {
        data.totalQ = data.totalQ.data;
        dispatch(submitPOProductInfo(data));
        dispatch(submitOrderForPreview());
        setActiveStep(prevStep => prevStep + 1);
    };

    return (
        <form onSubmit={ handleSubmit(onNextButtonClick) } autoComplete="off">
            <Grid container>
                <Grid
                    container
                    item
                    justify="space-between"
                    alignItems="center"
                    xs={ 12 }
                >
                    <Controller
                        render={ props => (
                            <Autocomplete
                                { ...props }
                                options={ currencies }
                                renderInput={ params => (
                                    <TextField
                                        { ...params }
                                        label={ currencyLabel }
                                        variant="outlined"
                                        error={ !!errors.currency }
                                        size="small"
                                        className={ classes.currency }
                                    />
                                ) }
                                onChange={ (_, data) => props.onChange(data) }
                            />
                        ) }
                        name="currency"
                        control={ control }
                        rules={ { required: errorMessages.currency } }
                    />
                    <AddColumnButton
                        maxNumColumns={ 7 }
                        currColNumbers={ numActiveColumns }
                        onConfirmClick={ onAddColumnClick }
                    />
                </Grid>
                <Grid
                    container
                    item
                    justify="center"
                    alignItems="center"
                    xs={ 12 }
                >
                    { Object.keys(errors).length > 0 && <ErrorMessage errors={ Object.values(errors) }/> }
                </Grid>
            </Grid>
            <CreatePOProductTable
                watch={ watch }
                setValue={ setValue }
                numActiveColumns={ numActiveColumns }
            />
            <div className="d-flex justify-content-around m-4">
                <Button variant="outlined" onClick={ onPrevButtonClick }>{ prevButton }</Button>
                <Button
                    variant="contained"
                    type="submit"
                >{ nextButton }</Button>
            </div>
        </form>
    )
}