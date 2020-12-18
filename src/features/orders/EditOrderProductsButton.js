import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { Box } from '@material-ui/core';
import OrderProductsDialog from '../shared/forms/OrderProductsDialog.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder } from './duck/thunks.js';
import { productTableItemsToOrderItems } from '../shared/utils/entityConversion.js';
import { getOptionId } from '../../app/utils/options/getters.js';
import Permission from '../shared/components/Permission.js';
import { ORDER } from '../admin/utils/resources.js';
import { UPDATE_ANY, UPDATE_OWN } from '../admin/utils/actions.js';
import { selectSessionUser } from '../../app/duck/selectors.js';

const {
    buttonLabel,
    dialogTitleLabel,
    dialogSubmitLabel
} = LANGUAGE.order.order.orderDetails.orderProductTable.editOrderProductsButton;

const EditOrderProductsButton = React.memo(function EditOrderProductsButton({ order, className }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(selectSessionUser);
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancel = () => setIsEdit(false);

    const onSubmit = (data) => {
        data.items = productTableItemsToOrderItems(data.items);
        data.currency = getOptionId(data.currency);
        dispatch(updateOrder({ orderId: order._id, update: data }));
        setIsEdit(false);
    };

    return (
        <Permission resource={ ORDER } action={ [UPDATE_ANY, UPDATE_OWN] } isOwner={ sessionUser._id === order.createdBy }>
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
        </Permission>
    )
});

export default EditOrderProductsButton;