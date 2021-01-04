import React, { useCallback, useState } from 'react';
import { Box } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import OrderStatusDialog from './OrderStatusDialog.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useDispatch } from 'react-redux';
import { updateSplit } from './duck/thunks.js';
import { UPDATE_ANY, UPDATE_OWN } from '../admin/utils/actions.js';
import OrderStatusPermission from '../shared/permissions/OrderStatusPermission.js';

const {
    buttonLabel,
    titleLabel,
    submitLabel
} = LANGUAGE.order.order.orderDetails.statusInfoCard.editOrderStatusButton;

const EditOrderStatusButton = React.memo(function EditOrderStatusButton(
    { orderId, procurement, production, qa, createdBy, className }) {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancel = () => setIsEdit(false);

    const onSubmit = useCallback((data) => {
        dispatch(updateSplit({ orderId: orderId, update: data }));
        setIsEdit(false);
    }, [dispatch, orderId]);

    return (
        <OrderStatusPermission action={ [UPDATE_ANY, UPDATE_OWN] } orderId={ orderId }>
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
        </OrderStatusPermission>
    )
});

export default EditOrderStatusButton;