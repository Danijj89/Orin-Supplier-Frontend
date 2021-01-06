import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import ShippingSplit from 'features/orders/ShippingSplit.js';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { roundToNDecimal } from 'features/shared/utils/format.js';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import { LANGUAGE } from 'app/utils/constants.js';
import Grid from '@material-ui/core/Grid';
import { getNextSplitRef } from 'features/orders/utils/helpers.js';
import Footer from 'features/shared/components/Footer.js';
import { useHistory, useLocation } from 'react-router-dom';
import useCachedSplitItems from 'features/orders/utils/hooks/useCachedSplitItems.js';

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(2),
    },
    newSplitButton: {
        marginTop: theme.spacing(2),
        marginBot: theme.spacing(2)
    }
}));

const {
    labels
} = LANGUAGE.order.order.shippingPlan.shippingSplits;

function validateSplits() { return true; }

const ShippingSplits = React.memo(function ShippingSplits({ order }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { shippingSplits, custom1, custom2, items } = order;
    const [cachedSplitItemsMap, setCachedSplitItemsMap] = useCachedSplitItems(shippingSplits, items);
    const initialSplits = useMemo(() => shippingSplits.map(split => ({
        ref: split.ref,
        crd: split.crd,
        items: split.items,
    })), [shippingSplits]);

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
        if (rowIdx === 0) {
            setValue('splits', splits.filter((_, idx) => idx !== splitIdx));
        } else {
            newSplit.items = newSplit.items.filter((_, idx) => idx !== rowIdx);
            setValue('splits', [...splits.slice(0, splitIdx), newSplit, ...splits.slice(splitIdx + 1)]);
        }
    }, [getValues, setValue, setCachedSplitItemsMap]);

    return (
        <form onSubmit={ handleSubmit(onSubmit) } autoComplete="off" noValidate>
            <Grid container className={ classes.container } justify="center">
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
    );
});

ShippingSplits.propTypes = {
    order: PropTypes.object
};

export default ShippingSplits;