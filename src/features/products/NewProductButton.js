import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { Box } from '@material-ui/core';
import ProductDialog from '../shared/forms/ProductDialog.js';
import { useDispatch } from 'react-redux';
import { LANGUAGE } from '../../app/utils/constants.js';
import { createProduct } from './duck/thunks.js';
import { makeStyles } from '@material-ui/core/styles';

const {
    buttonLabel,
    dialogTitleLabel,
    dialogSubmitLabel,
} = LANGUAGE.product.overview.newProductButton;

const useStyles = makeStyles((theme) => ({
    newProduct: {
        margin: theme.spacing(2),
    },
}));

export default function NewProductButton({ companyId }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const product = { company: companyId };

    const onClick = () => setIsDialogOpen(true);
    const onCancel = () => setIsDialogOpen(false);

    const onSubmit = (data) => {
        const { _id, ...rest } = data;
        dispatch(createProduct(rest));
        setIsDialogOpen(false);
    };

    return (
        <Box>
            <ThemedButton onClick={onClick} className={classes.newProduct}>
                {buttonLabel}
            </ThemedButton>
            <ProductDialog
                isOpen={isDialogOpen}
                product={product}
                titleLabel={dialogTitleLabel}
                submitLabel={dialogSubmitLabel}
                onCancel={onCancel}
                onSubmit={onSubmit}
            />
        </Box>
    );
}
