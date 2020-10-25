import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';
import OrderDetailsDialog from '../shared/forms/OrderDetailsDialog.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCompany } from '../home/duck/selectors.js';
import { selectClientsMap } from '../clients/duck/selectors.js';
import { updateOrderDetails } from './duck/thunks.js';

const {
    buttonLabel,
    dialogTitleLabel,
    dialogSubmitLabel
} = LANGUAGE.order.order.orderInfoCards.detailsInfoCard.editOrderDetailsButton;

export default function EditOrderDetailsButton({ order, className }) {
    const dispatch = useDispatch();
    const company = useSelector(selectCurrentCompany);
    const clients = useSelector(selectClientsMap);
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancel = () => setIsEdit(false);

    const onDelete = (id) => dispatch();

    const onSubmit = (data) => {
        const { fromAdd, toAdd, ...rest } = data;
        rest._id = order._id;
        rest.to = rest.to._id;
        if (!fromAdd.addressId) {
            const { _id, type, phone, email, ...address } = fromAdd;
            rest.fromAdd = { addressId: _id, ...address };
        }
        if (!toAdd.addressId) {
            const { _id, type, phone, email, ...address } = toAdd;
            rest.toAdd = { addressId: _id, ...address };
        }
        dispatch(updateOrderDetails(rest));
        setIsEdit(false);
    };

    return (
        <Box className={ className }>
            <ThemedButton
                onClick={ onEdit }
            >
                { buttonLabel }
            </ThemedButton>
            <OrderDetailsDialog
                order={ order }
                company={ company }
                clients={ clients }
                isOpen={ isEdit }
                titleLabel={ dialogTitleLabel }
                submitLabel={ dialogSubmitLabel }
                onCancel={ onCancel }
                onSubmit={ onSubmit }
                onDelete={ () => onDelete(order._id) }
            />
        </Box>
    )
}