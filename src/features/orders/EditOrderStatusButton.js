import React, { useCallback, useState } from 'react';
import { Box } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import OrderStatusDialog from './OrderStatusDialog.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { useDispatch } from 'react-redux';
import { updateSplit } from './duck/thunks.js';
import { UPDATE_ANY, UPDATE_OWN } from '../admin/utils/actions.js';
import OrderStatusPermission from '../shared/permissions/OrderStatusPermission.js';

const {
    buttons,
    titles
} = LANGUAGE.order.order;

const EditOrderStatusButton = React.memo(function EditOrderStatusButton(
    { orderId, splitId, procurement, production, qa, className }) {
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancel = () => setIsEdit(false);

    const onSubmit = useCallback((data) => {
        dispatch(updateSplit({ orderId, splitId, update: data }));
        setIsEdit(false);
    }, [dispatch, orderId, splitId]);

    return (
        <OrderStatusPermission action={ [UPDATE_ANY, UPDATE_OWN] } orderId={ orderId }>
            <Box className={ className }>
                <ThemedButton onClick={ onEdit }>
                    { buttons.editSplitStatus }
                </ThemedButton>
                <OrderStatusDialog
                    isOpen={ isEdit }
                    procurement={ procurement }
                    production={ production }
                    qa={ qa }
                    titleLabel={ titles.editSplitStatusDialog }
                    submitLabel={ buttons.submitSplitStatus }
                    onCancel={ onCancel }
                    onSubmit={ onSubmit }
                />
            </Box>
        </OrderStatusPermission>
    )
});

export default EditOrderStatusButton;