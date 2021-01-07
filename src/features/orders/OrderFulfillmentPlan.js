import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import InfoCard from 'features/shared/wrappers/InfoCard.js';
import { LANGUAGE } from 'app/utils/constants.js';
import OrderPermission from 'features/shared/permissions/OrderPermission.js';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import { UPDATE_ANY, UPDATE_OWN } from 'features/admin/utils/actions.js';
import { useHistory, useLocation } from 'react-router-dom';
import FulfillmentPlan from 'features/orders/FulfillmentPlan.js';

const {
    titles,
    buttons
} = LANGUAGE.order.order;

const OrderFulfillmentPlan = React.memo(function OrderFulfillmentPlan({ order }) {
    const history = useHistory();
    const location = useLocation();
    const { _id: orderId } = order;

    const onEditFulfillment = useCallback(() =>
            history.push(`${ location.pathname }?mode=edit`),
        [history, location.pathname]);

    const tools = useMemo(() =>
            <OrderPermission action={ [UPDATE_ANY, UPDATE_OWN] } orderId={ orderId }>
                <ThemedButton variant="outlined" onClick={ onEditFulfillment }>
                    { buttons.editFulfillment }
                </ThemedButton>
            </OrderPermission>,
        [onEditFulfillment, orderId]);

    return (
        <InfoCard
            title={ titles.fulfillmentPlan }
            content={ <FulfillmentPlan order={ order }/> }
            tools={ tools }
        />
    );
});

OrderFulfillmentPlan.propTypes = {
    order: PropTypes.object.isRequired
};

export default OrderFulfillmentPlan;