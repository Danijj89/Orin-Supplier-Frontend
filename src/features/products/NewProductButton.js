import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { Box } from '@material-ui/core';
import ProductDialog from '../shared/forms/ProductDialog.js';
import { useDispatch } from 'react-redux';
import { LANGUAGE } from '../../app/constants.js';
import { createProduct } from './duck/thunks.js';

const {
    buttonLabel,
    dialogTitleLabel,
    dialogSubmitLabel
} = LANGUAGE.product.overview.newProductButton;

export default function NewProductButton({ companyId }) {
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onClick = () => setIsDialogOpen(true);
    const onCancel = () => setIsDialogOpen(false);

    const onSubmit = (data) => {
        const { _id, ...rest } = data;
        rest.company = companyId;
        dispatch(createProduct(rest));
        setIsDialogOpen(false);
    };

    return (
        <Box>
            <ThemedButton
                onClick={ onClick }
            >{ buttonLabel }</ThemedButton>
            <ProductDialog
                isOpen={ isDialogOpen }
                titleLabel={ dialogTitleLabel }
                submitLabel={ dialogSubmitLabel }
                onCancel={ onCancel }
                onSubmit={ onSubmit }
            />
        </Box>
    )
}