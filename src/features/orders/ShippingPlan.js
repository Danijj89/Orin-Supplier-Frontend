import React, { useCallback, useMemo } from 'react';
import InfoCard from 'features/shared/wrappers/InfoCard.js';
import usePopulatedOrder from 'features/orders/utils/hooks/usePopulatedOrder.js';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import ShippingSplits from 'features/orders/ShippingSplits.js';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { UPDATE_ANY, UPDATE_OWN } from 'features/admin/utils/actions.js';
import OrderPermission from 'features/shared/permissions/OrderPermission.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    infoCard: {
        height: '100vh'
    }
}))

const {
    editButtonLabel
} = LANGUAGE.order.order.shippingPlan;

const ShippingPlan = React.memo(function ShippingPlan() {
    const classes = useStyles();
    const { id: orderId } = useParams();
    const history = useHistory();
    const location = useLocation();
    const { mode = 'view' } = queryString.parse(location.search);
    const order = usePopulatedOrder(orderId);
    const isEdit = useMemo(() => mode === 'edit', [mode]);

    const title = useMemo(
        () => `${ order.ref } | ${ order.to.name }`,
        [order.ref, order.to.name]);

    const onEdit = useCallback(() =>
            history.push(`${ location.pathname }?tab=shippingPlan&mode=edit`),
        [history, location.pathname]);

    const tools = useMemo(() =>
            isEdit
                ? null
                : <OrderPermission action={ [UPDATE_ANY, UPDATE_OWN] } orderId={ orderId }>
                    <ThemedButton onClick={ onEdit }>
                        { editButtonLabel }
                    </ThemedButton>
                </OrderPermission>,
        [isEdit, onEdit, orderId]);

    return (
        <InfoCard
            title={ title }
            content={
                <ShippingSplits
                    totalItems={ order.items }
                    shippingSplits={ order.shippingSplits }
                    isEdit={ isEdit }
                />
            }
            tools={ tools }
            className={ classes.infoCard }
        />
    );
});

export default ShippingPlan;