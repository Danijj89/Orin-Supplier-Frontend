import React, { useCallback, useEffect, useMemo, useState } from 'react';
import InfoCard from 'features/shared/wrappers/InfoCard.js';
import usePopulatedOrder from 'features/orders/utils/hooks/usePopulatedOrder.js';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { getNextSplitRef } from 'features/orders/utils/helpers.js';
import { roundToNDecimal } from 'features/shared/utils/format.js';
import Grid from '@material-ui/core/Grid';
import ShippingSplit from 'features/orders/ShippingSplit.js';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import Footer from 'features/shared/components/Footer.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { IconButton } from '@material-ui/core';
import { Refresh as IconRefresh } from '@material-ui/icons';

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
    }
}));

const {
    labels
} = LANGUAGE.order.order.shippingPlan;

function validateSplits() { return true; }

function createInitialCachedSplitItemsMap(splits, totalItems) {
    const itemsMap = totalItems.reduce((map, item) => {
        map[item._id] = { ...item };
        return map;
    }, {});
    for (const split of splits) {
        for (const item of split.items) {
            if (itemsMap.hasOwnProperty(item._id))
                itemsMap[item._id].quantity -= item.quantity;
            else itemsMap[item._id] = -1 * item.quantity;
        }
    }
    return itemsMap;
}

const ShippingPlan = React.memo(function ShippingPlan() {
    const classes = useStyles();
    const { id: orderId } = useParams();
    const history = useHistory();
    const location = useLocation();
    const order = usePopulatedOrder(orderId);
    const { shippingSplits, custom1, custom2, items } = order;
    const title = useMemo(
        () => `${ order.ref } | ${ order.to.name }`,
        [order.ref, order.to.name]);

    const initialSplits = useMemo(() => shippingSplits.map(split => ({
        ref: split.ref,
        crd: split.crd,
        items: split.items,
    })), [shippingSplits]);

    const [cachedSplitItemsMap, setCachedSplitItemsMap] =
        useState(createInitialCachedSplitItemsMap(initialSplits, items));

    const { register, getValues, setValue, watch, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            splits: initialSplits
        }
    });

    useEffect(() => {
        register({ name: 'splits' }, { validate: validateSplits })
    }, [register]);

    const splits = watch('splits');

    const onCancel = useCallback(() =>
            history.push(`${ location.pathname }?tab=shippingPlan&mode=view`),
        [history, location.pathname]);

    const onSubmit = useCallback(data => {

    }, []);

    const onNewSplit = useCallback(() => {
        const splits = getValues('splits');
        const newRef = getNextSplitRef(splits[splits.length - 1].ref);
        const newCachedSplitItemsMap = { ...cachedSplitItemsMap };
        const splitItems = [];
        for (const item of Object.values(cachedSplitItemsMap)) {
            if (item.quantity > 0) {
                splitItems.push({ ...item });
                newCachedSplitItemsMap[item._id].quantity -= item.quantity;
            }
        }

        if (splitItems.length > 0) {
            const newSplit = {
                ref: newRef,
                crd: new Date(),
                items: splitItems
            };
            setValue('splits', [...splits, newSplit]);
            setCachedSplitItemsMap(newCachedSplitItemsMap);
        }
    }, [getValues, setValue, cachedSplitItemsMap, setCachedSplitItemsMap]);

    const onReset = useCallback(
        () => {
            setValue('splits', initialSplits);
            setCachedSplitItemsMap(createInitialCachedSplitItemsMap(initialSplits, items));
        },
        [setValue, initialSplits, setCachedSplitItemsMap, items]);

    const onCrdChange = useCallback((splitIdx, newValue) => {
        const splits = getValues('splits');
        const newSplit = { ...splits[splitIdx] };
        newSplit.crd = newValue && new Date(newValue);
        setValue('splits', [...splits.slice(0, splitIdx), newSplit, ...splits.slice(splitIdx + 1)]);
    }, [getValues, setValue]);

    const onItemQuantityChange = useCallback((splitIdx, rowIdx, newValue) => {
        newValue = newValue === '' ? newValue : parseInt(newValue);
        const splits = getValues('splits');
        const newSplit = { ...splits[splitIdx] };
        newSplit.items = [...newSplit.items];
        const item = newSplit.items[rowIdx];
        const diff = item.quantity - newValue;
        setCachedSplitItemsMap(prevItemsMap => {
            prevItemsMap[item._id].quantity += diff;
            return prevItemsMap;
        });
        item.total = roundToNDecimal(newValue * item.price, 2);
        item.quantity = newValue;
        setValue('splits', [...splits.slice(0, splitIdx), newSplit, ...splits.slice(splitIdx + 1)]);

    }, [getValues, setValue, setCachedSplitItemsMap]);

    const onDeleteRow = useCallback((splitIdx, rowIdx) => {
        const splits = getValues('splits');
        const newSplit = { ...splits[splitIdx] };
        const item = newSplit.items[rowIdx];
        setCachedSplitItemsMap(prevItemsMap => {
            prevItemsMap[item._id].quantity += item.quantity;
            return prevItemsMap;
        });
        if (newSplit.items.length > 1) {
            newSplit.items = newSplit.items.filter((_, idx) => idx !== rowIdx);
            setValue('splits', [...splits.slice(0, splitIdx), newSplit, ...splits.slice(splitIdx + 1)]);
        } else {
            setValue('splits', splits.filter((_, idx) => idx !== splitIdx));
        }
    }, [getValues, setValue, setCachedSplitItemsMap]);

    return (
        <InfoCard
            className={ classes.infoCard }
            title={ title }
            content={
                <form onSubmit={ handleSubmit(onSubmit) } autoComplete="off" noValidate>
                    <Grid container className={ classes.contentContainer } justify="center">
                        <Grid item xs={ 12 }>
                            { splits.map((split, idx) =>
                                <ShippingSplit
                                    key={ `shipping-plan-${ split.ref }-view` }
                                    split={ split }
                                    splitIdx={ idx }
                                    onCrdChange={ onCrdChange }
                                    onItemQuantityChange={ onItemQuantityChange }
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
            tools={
                <IconButton size="small" onClick={ onReset }>
                    <IconRefresh color="primary"/>
                </IconButton>
            }
        />
    );
});

export default ShippingPlan;