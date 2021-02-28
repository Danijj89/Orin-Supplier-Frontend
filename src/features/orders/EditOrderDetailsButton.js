import React, { useCallback, useState } from 'react';
import { useHistory }  from 'react-router-dom';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from 'app/utils/constants.js';
import OrderDetailsDialog from '../shared/forms/OrderDetailsDialog.js';
import { useDispatch } from 'react-redux';
import { deleteOrder, updateOrder } from './duck/thunks.js';
import { addressToDocAddress } from '../shared/utils/entityConversion.js';
import { getOptionId } from 'app/utils/options/getters.js';
import { UPDATE_ANY, UPDATE_OWN } from '../admin/utils/actions.js';
import OrderPermission from '../shared/permissions/OrderPermission.js';

const {
    buttons,
    titles
} = LANGUAGE.order.order;

const EditOrderDetailsButton = React.memo(function EditOrderDetailsButton({ order, className }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = useCallback(() => setIsEdit(true), []);
    const onCancel = useCallback(() => setIsEdit(false), []);

    const onDelete = useCallback(
        () => {
            dispatch(deleteOrder({ orderId: order._id }));
            history.push('/home/orders');
        },
        [history, dispatch, order._id]);

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
            <ThemedButton
                onClick={ onEdit }
                className={ className }
            >
                { buttons.editDetails }
            </ThemedButton>
            <OrderDetailsDialog
                order={ order }
                isOpen={ isEdit }
                titleLabel={ titles.editDetailsDialog }
                submitLabel={ buttons.submitDetails }
                onCancel={ onCancel }
                onSubmit={ onSubmit }
                onDelete={ onDelete }
            />
        </OrderPermission>
    );
});

export default EditOrderDetailsButton;