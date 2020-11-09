import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { LANGUAGE } from '../../app/constants.js';
import OrderDetailsDialog from '../shared/forms/OrderDetailsDialog.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyActiveAddresses, selectCompanyPorts } from '../home/duck/selectors.js';
import { selectClientsMap } from '../clients/duck/selectors.js';
import { deleteOrder, updateOrderDetails } from './duck/thunks.js';

const {
    buttonLabel,
    dialogTitleLabel,
    dialogSubmitLabel
} = LANGUAGE.order.order.orderDetails.detailsInfoCard.editOrderDetailsButton;

export default function EditOrderDetailsButton({ order, className }) {
    const dispatch = useDispatch();
    const companyAddresses = useSelector(selectCompanyActiveAddresses);
    const companyPorts = useSelector(selectCompanyPorts);
    const clientsMap = useSelector(selectClientsMap);
    const [isEdit, setIsEdit] = useState(false);

    const onEdit = () => setIsEdit(true);
    const onCancel = () => setIsEdit(false);

    const onDelete = () => dispatch(deleteOrder(order._id));

    const onSubmit = (data) => {
        data._id = order._id;
        data.to = data.to._id;
        dispatch(updateOrderDetails(data));
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
                companyAddresses={ companyAddresses }
                companyPorts={ companyPorts }
                clientsMap={ clientsMap }
                isOpen={ isEdit }
                titleLabel={ dialogTitleLabel }
                submitLabel={ dialogSubmitLabel }
                onCancel={ onCancel }
                onSubmit={ onSubmit }
                onDelete={ onDelete }
            />
        </Box>
    )
}