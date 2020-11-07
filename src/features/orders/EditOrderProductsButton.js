import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { Box } from '@material-ui/core';
import OrderProductsDialog from '../shared/forms/OrderProductsDialog.js';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch } from 'react-redux';
import { updateOrderProducts } from './duck/thunks.js';

const {
    buttonLabel,
    dialogTitleLabel,
    dialogSubmitLabel
} = LANGUAGE.order.order.orderDetails.orderProductTable.editOrderProductsButton;

export default function EditOrderProductsButton({ order, productMap, className }) {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancel = () => setIsEdit(false);

    const onSubmit = (data) => {
        data.id = order._id;
        data.items = data.items.map(item => {
            if (!item._id) {
                item.order = order._id;
            } else if (!item.product && productMap.hasOwnProperty(item._id)) {
                const newItem = { ...item };
                newItem.product = newItem._id;
                newItem.order = order._id;
                return newItem;
            }
            return item;
        });
        dispatch(updateOrderProducts(data));
        setIsEdit(false);
    };

    return (
        <Box className={ className }>
            <ThemedButton
                onClick={ onEdit }
            >
                { buttonLabel }
            </ThemedButton>
            <OrderProductsDialog
                order={ order }
                isOpen={ isEdit }
                titleLabel={ dialogTitleLabel }
                submitLabel={ dialogSubmitLabel }
                onCancel={ onCancel }
                onSubmit={ onSubmit }
            />
        </Box>
    )
}