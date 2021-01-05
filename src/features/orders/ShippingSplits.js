import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import ShippingSplitView from 'features/orders/ShippingSplitView.js';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { roundToNDecimal } from 'features/shared/utils/format.js';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import { LANGUAGE } from 'app/utils/constants.js';
import Grid from '@material-ui/core/Grid';
import { getNextSplitRef } from 'features/orders/utils/helpers.js';
import Footer from 'features/shared/components/Footer.js';
import { useHistory, useLocation } from 'react-router-dom';

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

const ShippingSplits = React.memo(function ShippingSplits(
    { shippingSplits, totalItems, isEdit }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
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

    // const onNewSplit = useCallback(() => {
    //     const splits = getValues('splits');
    //     let newItems = totalItems.map(item => ({ ...item }));
    //     for (const split of splits) {
    //         for (const item of split.items) {
    //             const newItem = newItems.find(i => i._id === item);
    //             newItem.quantity -= item.quantity;
    //         }
    //     }
    //     const newRef = getNextSplitRef(splits[splits.length - 1].ref);
    //     newItems = newItems.filter(item => item.quantity <= 0);
    //     if (newItems.length === 0) {
    //
    //     }
    //     const newSplit = {
    //         ref: newRef,
    //         crd: new Date(),
    //         items:
    //     };
    //     setValue('splits', [...splits, newSplit]);
    // }, [totalItems, getValues, setValue]);

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
        const item = newSplit.items[rowIdx];

        item.total = roundToNDecimal(newValue * item.price, 2);
        item.quantity = newValue;
        setValue('splits', [...splits.slice(0, splitIdx), newSplit, ...splits.slice(splitIdx + 1)]);
    }, [getValues, setValue]);

    return (
        <form onSubmit={ handleSubmit(onSubmit) } autoComplete="off" noValidate>
            <Grid container className={ classes.container } justify="center">
                <Grid item xs={ 12 }>
                    { splits.map((split, idx) =>
                        <ShippingSplitView
                            key={ `shipping-plan-${ split.ref }-view` }
                            split={ split }
                            splitNum={ idx + 1 }
                        />
                    ) }
                </Grid>
                { isEdit &&
                <ThemedButton
                    variant="outlined"
                    className={ classes.newSplitButton }
                >
                    { labels.newSplitButton }
                </ThemedButton>
                }
            </Grid>
            { isEdit &&
            <Footer
                prevLabel={ labels.cancelButton }
                nextLabel={ labels.submitButton }
                onPrevClick={ onCancel }
                nextButtonType="submit"
            />
            }
        </form>
    );
});

ShippingSplits.propTypes = {
    shippingSplits: PropTypes.arrayOf(PropTypes.object).isRequired,
    totalItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    isEdit: PropTypes.bool
};

export default ShippingSplits;