import React, { useCallback, useState } from 'react';
import { Box } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import OrderStatusDialog from './OrderStatusDialog.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatus } from './duck/thunks.js';
import Permission from '../shared/permissions/Permission.js';
import { ORDER_STATUS } from '../admin/utils/resources.js';
import { UPDATE_ANY, UPDATE_OWN } from '../admin/utils/actions.js';
import { selectSessionUser } from '../../app/duck/selectors.js';

const {
    buttonLabel,
    titleLabel,
    submitLabel
} = LANGUAGE.order.order.orderDetails.statusInfoCard.editOrderStatusButton;

const EditOrderStatusButton = React.memo(function EditOrderStatusButton(
    { orderId, procurement, production, qa, createdBy, className }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(selectSessionUser);
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancel = () => setIsEdit(false);

    const onSubmit = useCallback((data) => {
        dispatch(updateOrderStatus({ orderId: orderId, update: data }));
        setIsEdit(false);
    }, [dispatch, orderId]);

    return (
        <Permission
            resource={ ORDER_STATUS }
            action={ [UPDATE_ANY, UPDATE_OWN] }
            isOwner={ sessionUser._id === createdBy }
        >
            <Box className={ className }>
                <ThemedButton onClick={ onEdit }>
                    { buttonLabel }
                </ThemedButton>
                <OrderStatusDialog
                    isOpen={ isEdit }
                    procurement={ procurement }
                    production={ production }
                    qa={ qa }
                    titleLabel={ titleLabel }
                    submitLabel={ submitLabel }
                    onCancel={ onCancel }
                    onSubmit={ onSubmit }
                />
            </Box>
        </Permission>
    )
});

export default EditOrderStatusButton;