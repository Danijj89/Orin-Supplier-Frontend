import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import OrderStatusDialog from '../shared/forms/OrderStatusDialog.js';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from './duck/thunks.js';

const {
    buttonLabel,
    titleLabel,
    submitLabel
} = LANGUAGE.order.order.orderInfoCards.statusInfoCard.editOrderStatusButton;

export default function EditOrderStatusButton({ orderId, status, className }) {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancel = () => setIsEdit(false);

    const onSubmit = (data) => {
        data.id = orderId;
        dispatch(updateOrderStatus(data));
        setIsEdit(false);
    };

    return (
        <Box className={ className }>
            <ThemedButton onClick={ onEdit }>
                { buttonLabel }
            </ThemedButton>
            <OrderStatusDialog
                isOpen={ isEdit }
                status={ status }
                titleLabel={ titleLabel }
                submitLabel={ submitLabel }
                onCancel={ onCancel }
                onSubmit={ onSubmit }
            />
        </Box>
    )
}