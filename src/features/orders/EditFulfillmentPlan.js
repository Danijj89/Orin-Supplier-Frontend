import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import InfoCard from 'features/shared/wrappers/InfoCard.js';
import usePopulatedOrder from 'features/orders/utils/hooks/usePopulatedOrder.js';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { getNextSplitRef } from 'features/orders/utils/helpers.js';
import { roundToNDecimal } from 'features/shared/utils/format.js';
import Grid from '@material-ui/core/Grid';
import EditShippingSplit from 'features/orders/EditShippingSplit.js';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import Footer from 'features/shared/components/Footer.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { IconButton } from '@material-ui/core';
import { Refresh as IconRefresh } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder } from 'features/orders/duck/thunks.js';
import { prepareShippingSplits } from 'features/shared/utils/entityConversion.js';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import clsx from 'clsx';
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
    infoCard: {
        height: '100vh'
    },
    contentContainer: {
        padding: theme.spacing(2),
    },
    newSplitButton: {
        marginTop: theme.spacing(2),
        marginBot: theme.spacing(2)
    },
    progressBarContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    progressBar: {
        width: 280,
        marginRight: theme.spacing(1)
    },
    red: {
        color: theme.palette.danger.main
    },
    green: {
        color: theme.palette.success.main
    }
}));

const {
    labels,
    errorMessages
} = LANGUAGE.order.order.editFulfillmentPlan;

function initializeCachedData(splits, totalItems) {
    let totalCount = 0;
    let totalAllocated = 0;
    const allocationMap = totalItems.reduce((map, item) => {
        map[item._id] = { quantity: item.quantity, allocated: 0 };
        totalCount += item.quantity;
        return map;
    }, {});
    for (const split of splits) {
        for (const item of split.items) {
            allocationMap[item._id].allocated += item.quantity;
            totalAllocated += item.quantity;
        }
    }
    return {
        allocationMap,
        totalCount,
        totalAllocated
    };
}

function validateSplits(splits, totalItems) {
    const allocationMap = totalItems.reduce((map, item) => {
        map[item._id] = { ref: item.ref, quantity: item.quantity, allocated: 0 };
        return map;
    }, {});
    for (const split of splits) {
        for (const item of split.items) {
            allocationMap[item._id].allocated += item.quantity;
        }
    }
    for (const allocationStatus of Object.entries(allocationMap)) {
        const diff = allocationStatus.quantity - allocationStatus.allocated;
        if (diff > 0) return errorMessages.itemOverflow(allocationStatus.ref);
        if (diff < 0) return errorMessages.itemTooFew(allocationStatus.ref);
    }
    return true;
}

const fieldNames = {
    shippingSplits: 'shippingSplits'
};

const EditFulfillmentPlan = React.memo(function EditFulfillmentPlan({ orderId }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const order = usePopulatedOrder(orderId);
    const { shippingSplits, custom1, custom2, items: totalItems } = order;
    const title = useMemo(
        () => `${ order.ref } | ${ order.to.name }`,
        [order.ref, order.to.name]);
    const cachedData = useMemo(
        () => initializeCachedData(shippingSplits, totalItems),
        [shippingSplits, totalItems]);
    const [allocationMap, setAllocationMap] = useState(_.cloneDeep(cachedData.allocationMap));
    const [totalAllocated, setTotalAllocated] = useState(cachedData.totalAllocated);
    const totalCount = useMemo(() => cachedData.totalCount, [cachedData.totalCount]);

    const progress = useMemo(
        () => Math.round((totalAllocated / totalCount) * 100),
        [totalAllocated, totalCount]);

    const { register, getValues, setValue, watch, handleSubmit, errors } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            [fieldNames.shippingSplits]: _.cloneDeep(shippingSplits)
        }
    });

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {
            register({ name: fieldNames.shippingSplits }, { validate: splits => validateSplits(splits, totalItems) });
            mounted.current = true;
        }
    }, [register, totalItems]);

    const splits = watch(fieldNames.shippingSplits);

    const onCancel = useCallback(() =>
            history.push(`${ location.pathname }?mode=view&tab=fulfillment`),
        [history, location.pathname]);

    const onSubmit = useCallback(data => {
        console.log(data)
        // const shippingSplits = prepareShippingSplits(data.shippingSplits);
        // dispatch(updateOrder({ orderId: order._id, update: { shippingSplits } }));
    }, [dispatch, order._id]);

    const onNewSplit = useCallback(() => {
        const newSplit = { crd: new Date(), items: [] };
        if (totalCount > totalAllocated) {
            const splitItems = [];
            for (const item of totalItems) {
                const { quantity, allocated } = allocationMap[item._id];
                const remaining = quantity - allocated;
                if (remaining > 0) {
                    splitItems.push({
                        ...item,
                        quantity: remaining
                    });
                }
            }
            newSplit.items = splitItems;
            setAllocationMap(prevMap => Object.entries(prevMap).reduce((map, [id, allocationStatus]) => {
                map[id] = {
                    quantity: allocationStatus.quantity,
                    allocated: allocationStatus.quantity
                };
                return map;
            }, {}));
            setTotalAllocated(totalCount);
        }
        setValue(fieldNames.shippingSplits, [
            ...getValues(fieldNames.shippingSplits),
            newSplit
        ]);
    }, [getValues, setValue, allocationMap, totalCount, totalItems, totalAllocated]);

    const onReset = useCallback(
        () => {
            setValue(fieldNames.shippingSplits, _.cloneDeep(shippingSplits));
            setAllocationMap(_.cloneDeep(cachedData.allocationMap));
            setTotalAllocated(cachedData.totalAllocated);
        },
        [
            setValue,
            cachedData.allocationMap,
            cachedData.totalAllocated,
            shippingSplits
        ]);

    const onCrdChange = useCallback((splitIdx, newValue) => {
        const splits = getValues(fieldNames.shippingSplits);
        const newSplit = { ...splits[splitIdx] };
        newSplit.crd = newValue && new Date(newValue);
        setValue(fieldNames.shippingSplits, [...splits.slice(0, splitIdx), newSplit, ...splits.slice(splitIdx + 1)]);
    }, [getValues, setValue]);

    const onCellChange = useCallback((splitIdx, rowIdx, key, newValue) => {
        const splits = getValues(fieldNames.shippingSplits);
        const newSplit = { ...splits[splitIdx] };
        newSplit.items = [...newSplit.items];
        const item = newSplit.items[rowIdx];
        switch (key) {
            case 'ref':
                const { quantity, allocated } = allocationMap[newValue._id];
                const remaining = quantity - allocated;
                newSplit.items[rowIdx] = {
                    ...newValue,
                    quantity: remaining,
                    total: roundToNDecimal(remaining * newValue.price, 2),
                };
                setAllocationMap(prevMap => {
                    const newAllocationMap = { ...prevMap };
                    newAllocationMap[newValue._id] = {
                        ...newAllocationMap[newValue._id],
                        allocated: newAllocationMap[newValue._id].quantity
                    };
                    if (item._id) {
                        newAllocationMap[item._id] = {
                            ...newAllocationMap[item._id],
                            allocated: newAllocationMap[item._id].allocated - item.quantity
                        };
                    }
                    return newAllocationMap;
                });
                setTotalAllocated(prevCount => {
                    let newCount = prevCount + remaining;
                    if (item._id) newCount -= item.quantity;
                    return newCount;
                });
                break;
            case 'quantity':
                newValue = newValue === '' ? newValue : parseInt(newValue);
                const diff = newValue - item.quantity;
                if (item._id) {
                    setAllocationMap(prevItemsMap => {
                        prevItemsMap[item._id].allocated += diff;
                        return prevItemsMap;
                    });
                    setTotalAllocated(prevCount => prevCount + diff);
                }
                item.total = roundToNDecimal(newValue * item.price, 2);
                item.quantity = newValue;
                break;
            default:
        }
        setValue(fieldNames.shippingSplits, [...splits.slice(0, splitIdx), newSplit, ...splits.slice(splitIdx + 1)]);
    }, [getValues, setValue, allocationMap]);

    const createAddRowHandler = useCallback(splitIdx => () => {
        const splits = getValues(fieldNames.shippingSplits);
        const newSplit = { ...splits[splitIdx] };
        newSplit.items = [...newSplit.items, { _id: null, quantity: 0 }];
        setValue(fieldNames.shippingSplits, [...splits.slice(0, splitIdx), newSplit, ...splits.slice(splitIdx + 1)]);
    }, [setValue, getValues]);

    const onDeleteRow = useCallback((splitIdx, rowIdx) => {
        const splits = getValues(fieldNames.shippingSplits);
        const newSplit = { ...splits[splitIdx] };
        const item = newSplit.items[rowIdx];
        if (item.quantity > 0) {
            setAllocationMap(prevItemsMap => {
                const newAllocated = prevItemsMap[item._id].allocated - item.quantity;
                return {
                    ...prevItemsMap,
                    [item._id]: {
                        ...prevItemsMap[item._id],
                        allocated: newAllocated
                    }
                };
            });
            setTotalAllocated(prevCount => prevCount - item.quantity);
        }
        if (newSplit.items.length > 1) {
            newSplit.items = newSplit.items.filter((_, idx) => idx !== rowIdx);
            setValue(fieldNames.shippingSplits, [...splits.slice(0, splitIdx), newSplit, ...splits.slice(splitIdx + 1)]);
        } else {
            setValue(fieldNames.shippingSplits, splits.filter((_, idx) => idx !== splitIdx));
        }
    }, [getValues, setValue]);

    const tools = useMemo(() => [
        <ThemedButton
            className={ clsx(
                classes.progressBarContainer,
                progress !== 100 && classes.red,
                progress === 100 && classes.green
            ) }
            variant="text"
        >
            <LinearProgress className={ classes.progressBar } variant="determinate" value={ progress }/>
            <Typography>{ `${ progress }%` }</Typography>
        </ThemedButton>,
        <IconButton size="small" onClick={ onReset }>
            <IconRefresh color="primary"/>
        </IconButton>
    ], [onReset, classes, progress]);

    return (
        <InfoCard
            className={ classes.infoCard }
            title={ title }
            content={
                <form onSubmit={ handleSubmit(onSubmit) } autoComplete="off" noValidate>

                    <Grid container className={ classes.contentContainer } justify="center">
                        <Grid item xs={ 12 }>
                            { splits.map((split, idx) =>
                                <EditShippingSplit
                                    key={ `shipping-plan-${ split.ref }-view` }
                                    split={ split }
                                    splitIdx={ idx }
                                    itemOptions={ totalItems }
                                    allocationMap={ allocationMap }
                                    onCrdChange={ onCrdChange }
                                    onCellChange={ onCellChange }
                                    onAddRow={ createAddRowHandler(idx) }
                                    onDeleteRow={ onDeleteRow }
                                    custom1={ custom1 }
                                    custom2={ custom2 }
                                />
                            ) }
                        </Grid>
                        <ThemedButton
                            variant="outlined"
                            className={ classes.newSplitButton }
                            onClick={ onNewSplit }
                        >
                            { labels.newSplitButton }
                        </ThemedButton>
                    </Grid>
                    <Footer
                        prevLabel={ labels.cancelButton }
                        nextLabel={ labels.submitButton }
                        onPrevClick={ onCancel }
                        nextButtonType="submit"
                    />
                </form>
            }
            tools={ tools }
        />
    );
});

export default EditFulfillmentPlan;