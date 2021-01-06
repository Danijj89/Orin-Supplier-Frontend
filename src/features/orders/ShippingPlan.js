import React, { useMemo } from 'react';
import InfoCard from 'features/shared/wrappers/InfoCard.js';
import usePopulatedOrder from 'features/orders/utils/hooks/usePopulatedOrder.js';
import { useParams } from 'react-router-dom';
import ShippingSplits from 'features/orders/ShippingSplits.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    infoCard: {
        height: '100vh'
    }
}))

const ShippingPlan = React.memo(function ShippingPlan() {
    const classes = useStyles();
    const { id: orderId } = useParams();
    const order = usePopulatedOrder(orderId);

    const title = useMemo(
        () => `${ order.ref } | ${ order.to.name }`,
        [order.ref, order.to.name]);

    return (
        <InfoCard
            title={ title }
            content={
                <ShippingSplits order={ order }/>
            }
            className={ classes.infoCard }
        />
    );
});

export default ShippingPlan;