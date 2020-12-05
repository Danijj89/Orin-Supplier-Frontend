import React, { useCallback, useState } from 'react';
import { Box } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import OrderStatusDialog from './OrderStatusDialog.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from './duck/thunks.js';

const {
    buttonLabel,
    titleLabel,
    submitLabel
} = LANGUAGE.order.order.orderDetails.statusInfoCard.editOrderStatusButton;

const EditOrderStatusButton = React.memo(function EditOrderStatusButton(
    { orderId, procurement, production, qa, className }) {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancel = () => setIsEdit(false);

    const onSubmit = useCallback((data) => {
        dispatch(updateOrderStatus({ orderId: orderId, update: data }));
        setIsEdit(false);
    }, [dispatch, orderId]);

    return (
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
    )
});

export default EditOrderStatusButton;