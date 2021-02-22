import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { Box } from '@material-ui/core';
import OrderProductsDialog from '../shared/forms/OrderProductsDialog.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { useDispatch } from 'react-redux';
import { updateOrder } from './duck/thunks.js';
import { productTableItemsToOrderItems } from '../shared/utils/entityConversion.js';
import { getOptionId } from 'app/utils/options/getters.js';
import { UPDATE_ANY, UPDATE_OWN } from '../admin/utils/actions.js';
import OrderPermission from '../shared/permissions/OrderPermission.js';

const {
    buttons,
    titles
} = LANGUAGE.order.order;

const EditOrderProductsButton = React.memo(function EditOrderProductsButton({ order, className }) {
    const dispatch = useDispatch();
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
        <OrderPermission action={ [UPDATE_ANY, UPDATE_OWN] } orderId={ order._id }>
            <ThemedButton
                onClick={ onEdit }
                className={ className }
            >
                { buttons.editProducts }
            </ThemedButton>
            <OrderProductsDialog
                order={ order }
                isOpen={ isEdit }
                titleLabel={ titles.editProductsDialog }
                submitLabel={ buttons.submitProducts }
                onCancel={ onCancel }
                onSubmit={ onSubmit }
            />
        </OrderPermission>
    )
});

export default EditOrderProductsButton;