import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectOrderOwnerById } from '../../orders/duck/selectors.js';
import { selectSessionUserId } from '../../../app/duck/selectors.js';
import Permission from './Permission.js';
import { ORDER_STATUS } from '../../admin/utils/resources.js';

const OrderStatusPermission = React.memo(function OrderStatusPermission(
    { action = [], orderId, children }) {
    const orderOwner = useSelector(state => selectOrderOwnerById(state, { orderId }));
    const sessionUserId = useSelector(selectSessionUserId);
    const isOwner = useMemo(
        () => orderId ? sessionUserId === orderOwner : true,
        [orderOwner, sessionUserId, orderId]);

    return (
        <Permission resource={ ORDER_STATUS } action={ action } isOwner={ isOwner }>
            { children }
        </Permission>
    );
});

OrderStatusPermission.propTypes = {
    action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    orderId: PropTypes.string,
    children: PropTypes.node.isRequired
};

export default OrderStatusPermission;