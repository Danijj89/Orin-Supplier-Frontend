import React, { useMemo } from 'react';
import InfoCard from 'features/shared/wrappers/InfoCard.js';
import usePopulatedOrder from 'features/orders/utils/hooks/usePopulatedOrder.js';
import { useParams } from 'react-router-dom';
import ShippingSplits from 'features/orders/ShippingSplits.js';

const ShippingPlan = React.memo(function ShippingPlan() {
    const { id: orderId } = useParams();
    const order = usePopulatedOrder(orderId);

    const title = useMemo(
        () => `${ order.ref } | ${ order.to.name }`,
        [order.ref, order.to.name]);

    return (
        <InfoCard
            title={ title }
            content={
                <ShippingSplits shippingSplits={order.shippingSplits} />
            }
        />
    );
});

export default ShippingPlan;