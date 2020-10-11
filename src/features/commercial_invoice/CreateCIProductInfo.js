import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentDefaults } from '../../app/duck/slice.js';
import {
    Grid,
    Button,
    TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../constants.js';
import { selectCIAutocompleteOptions, selectNewCI } from './duck/selectors.js';
import CreateCIOrderSelector from './CreateCIOrderSelector.js';
import { submitTableInfo } from './duck/slice.js';
import CreateCIProductTable from './CreateCIProductTable.js';
import AddColumnButton from '../shared/buttons/addColumnButton.js';
import { submitCIForPreview } from './duck/thunks.js';
import { useForm } from 'react-hook-form';
import UnitCounter from '../shared/classes/UnitCounter.js';
import RHFThemedDropdown from '../shared/rhf/RHFThemedDropdown.js';
import ErrorMessage from '../shared/displays/ErrorMessage.js';

const { currencyLabel, marksLabel, buttonNext, buttonPrev, errorMessages } = LANGUAGE.commercialInvoice.createCIProductInfo;

const useStyles = makeStyles((theme) => ({
    row: {
        marginTop: 10,
        marginBottom: 10
    },
    currenciesDropdown: {
        minWidth: 120,
        width: 160
    },
    marks: {
        width: '100%',
        border: 'none'
    }
}));

export default function CreateCIProductInfo({ setActiveStep }) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const {
        poRefs: initialPORefs, currency, items: initialItems,
        headers, totalQ, totalA, marks
    } = useSelector(selectNewCI);
    const { orderItemMap, ordersRef } = useSelector(selectCIAutocompleteOptions);
    const { currencies, itemUnits } = useSelector(selectCurrentDefaults);
    const [poRefsOptions, setPoRefsOptions] = useState(ordersRef.filter(ref => !initialPORefs.includes(ref)));

    const addOrderItemsToRows = (rows, orderRef) => {
        const items = orderItemMap[orderRef].items;
        const newRows = {
            [orderRef]: [],
            ...rows
        };
        items.forEach(item => newRows[orderRef].push([
            item.ref,
            item.description,
            '',
            '',
            item.quantity,
            item.unit,
            item.price,
            item.total
        ]));
        return newRows;
    }

    const {
        register, control, handleSubmit, errors, setValue, watch
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            poRefs: initialPORefs,
            currency,
            items: initialItems,
            headers,
            marks,
            totalQ: new UnitCounter(itemUnits, totalQ),
            totalA: totalA,
        }
    });

    useEffect(() => {
        register({ name: 'poRefs' }, { validate: (refs) => refs.length > 0 || errorMessages.poRefs });
        register({ name: 'items' }, {
            validate: validateItems
        });
        register({ name: 'headers' });
        register({ name: 'totalQ' });
        register({ name: 'totalA' });

    }, [register]);

    const items = watch('items');
    const poRefs = watch('poRefs');

    const validateItems = (items) => {
        if (Object.keys(items).length === 1) return errorMessages.atLeastOneOrder;
        for (const orderItems of Object.values(items)) {
            for (const item of orderItems) {
                for (let i = 0; i < item.length; i++) {
                    if (i >= 1 && i <= 3) continue;
                    if (!item[i]) {
                        return errorMessages.missingItemInfo;
                    }
                }
            }
        }
        return true;
    }

    // table default values
    const numActiveColumns = headers.reduce((acc, header) => header ? acc + 1 : acc, 0);
    const onAddColumnClick = (newColumnName) => {
        const newHeaders = [...headers];
        if (!newHeaders[2]) newHeaders[2] = newColumnName;
        else if (!newHeaders[3]) newHeaders[3] = newColumnName;
        setValue('headers', newHeaders);
    }

    const computeRowsForChosenOrders = (newRefs) => {
        const removed = poRefs.filter(order => !newRefs.includes(order));
        const added = newRefs.filter(ref => !poRefs.includes(ref));
        if (removed?.length) {
            const toRemove = removed[0];
            const { [toRemove]: omit, ...remainingRows } = items;
            return remainingRows;
        } else {
            return addOrderItemsToRows(items, added[0]);
        }
    }

    const onChosenOrderChange = (newOptions) => {
        setValue('items', computeRowsForChosenOrders(newOptions));
        setValue('poRefs', newOptions);
        setPoRefsOptions([...ordersRef.filter(option => !newOptions.includes(option))]);
    }

    const onPrevButtonClick = (data) => {
        dispatch(submitTableInfo(data));
        setActiveStep(step => step - 1);
    }


    const onNextButtonClick = async (data) => {
        data.poIds = data.poRefs.map(ref => orderItemMap[ref]._id);
        data.totalQ = data.totalQ.data;
        dispatch(submitTableInfo(data));
        dispatch(submitCIForPreview());
        setActiveStep(step => step + 1);
    };

    return (
        <form onSubmit={ handleSubmit(onNextButtonClick) } autoComplete="off">
            <Grid container>
                <Grid item className={ classes.row } xs={ 12 }>
                    <CreateCIOrderSelector
                        poRefs={ poRefs }
                        poRefsOptions={ poRefsOptions }
                        onChosenOrderChange={ onChosenOrderChange }
                    />
                </Grid>
                <Grid container item justify="space-between" alignItems="center" xs={ 12 } className={ classes.row }>
                    <RHFThemedDropdown
                        options={ currencies }
                        label={ currencyLabel }
                        error={ errors.currency }
                        name="currency"
                        control={ control }
                        errorMessage={ errorMessages.currency }
                    />
                    <AddColumnButton
                        currColNumbers={ numActiveColumns }
                        onConfirmClick={ onAddColumnClick }
                        maxNumColumns={ 8 }
                    />
                </Grid>
                <Grid
                    container
                    item
                    justify="center"
                    alignItems="center"
                    xs={ 12 }
                >
                    { Object.keys(errors).length > 0 && <ErrorMessage errors={ Object.values(errors).map(err => err.message) }/> }
                </Grid>
                <Grid item xs={ 12 } className={ classes.row }>
                    <CreateCIProductTable
                        watch={ watch }
                        setValue={ setValue }
                        numActiveColumns={ numActiveColumns }
                    />
                </Grid>
                <hr/>
                <Grid
                    item
                    className={ classes.row }
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
                    <Button variant="outlined" onClick={ handleSubmit(onPrevButtonClick) }>{ buttonPrev }</Button>
                    <Button variant="contained" type="submit">{ buttonNext }</Button>
                </Grid>
            </Grid>
        </form>
    )
}