import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';
import OrderDialog from '../shared/forms/OrderDialog.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCompany } from '../home/duck/selectors.js';
import { selectClientsMap } from '../clients/duck/selectors.js';

const { buttonLabel, dialogTitleLabel, dialogSubmitLabel } = LANGUAGE.order.order.editOrderDetailsButton;

export default function EditOrderDetailsButton({ order, className }) {
    const dispatch = useDispatch();
    const company = useSelector(selectCurrentCompany);
    const clients = useSelector(selectClientsMap);
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancel = () => setIsEdit(false);

    const onDelete = (id) => dispatch();

    const onSubmit = (data) => {
        setIsEdit(false);
    };

    return (
        <Box className={ className }>
            <ThemedButton
                onClick={ onEdit }
            >
                { buttonLabel }
            </ThemedButton>
            <OrderDialog
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