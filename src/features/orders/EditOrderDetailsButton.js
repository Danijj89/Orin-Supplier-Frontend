import React, { useCallback, useState } from 'react';
import { Box } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import OrderDetailsDialog from '../shared/forms/OrderDetailsDialog.js';
import { useDispatch } from 'react-redux';
import { deleteOrder, updateOrder } from './duck/thunks.js';
import { addressToDocAddress } from '../shared/utils/entityConversion.js';

const {
    buttonLabel,
    dialogTitleLabel,
    dialogSubmitLabel
} = LANGUAGE.order.order.orderDetails.detailsInfoCard.editOrderDetailsButton;

const EditOrderDetailsButton = React.memo(function EditOrderDetailsButton({ order, className }) {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = useCallback(() => setIsEdit(true), []);
    const onCancel = useCallback(() => setIsEdit(false), []);

    const onDelete = useCallback(
        () => dispatch(deleteOrder({ orderId: order._id })),
        [dispatch, order._id]);

    const onSubmit = useCallback((data) => {
        data.to = data.to._id;
        data.fromAdd = addressToDocAddress(data.fromAdd);
        data.toAdd = addressToDocAddress(data.toAdd);
        if (data.shipAdd) data.shipAdd = addressToDocAddress(data.shipAdd);
        dispatch(updateOrder({ orderId: order._id, update: data }));
        setIsEdit(false);
    }, [dispatch, order._id]);

    return (
        <Box className={ className }>
            <ThemedButton
                onClick={ onEdit }
            >
                { buttonLabel }
            </ThemedButton>
            <OrderDetailsDialog
                order={ order }
                isOpen={ isEdit }
                titleLabel={ dialogTitleLabel }
                submitLabel={ dialogSubmitLabel }
                onCancel={ onCancel }
                onSubmit={ onSubmit }
                onDelete={ onDelete }
            />
        </Box>
    )
});

export default EditOrderDetailsButton;