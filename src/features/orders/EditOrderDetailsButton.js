import React, { useCallback, useState } from 'react';
import { Box } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import OrderDetailsDialog from '../shared/forms/OrderDetailsDialog.js';
import { useDispatch } from 'react-redux';
import { deleteOrder, updateOrder } from './duck/thunks.js';
import { addressToDocAddress } from '../shared/utils/entityConversion.js';
import { getOptionId } from '../../app/utils/options/getters.js';
import { UPDATE_ANY, UPDATE_OWN } from '../admin/utils/actions.js';
import OrderPermission from '../shared/permissions/OrderPermission.js';

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
        if (data.del) data.del = getOptionId(data.del);
        dispatch(updateOrder({ orderId: order._id, update: data }));
        setIsEdit(false);
    }, [dispatch, order._id]);

    return (
        <OrderPermission action={ [UPDATE_ANY, UPDATE_OWN] } orderId={ order._id }>
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
        </OrderPermission>
    )
});

export default EditOrderDetailsButton;