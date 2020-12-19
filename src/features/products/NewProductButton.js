import React, { useState } from 'react';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import ProductDialog from '../shared/forms/ProductDialog.js';
import { useDispatch, useSelector } from 'react-redux';
import { LANGUAGE } from '../../app/utils/constants.js';
import { createProduct } from './duck/thunks.js';
import { makeStyles } from '@material-ui/core/styles';
import { selectSessionUserCompanyId } from '../../app/duck/selectors.js';
import Permission from '../shared/permissions/Permission.js';
import { CREATE_ANY } from '../admin/utils/actions.js';
import ProductPermission from '../shared/permissions/ProductPermission.js';

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

const NewProductButton = React.memo(function NewProductButton() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const companyId = useSelector(selectSessionUserCompanyId);
    const product = { company: companyId };

    const onClick = () => setIsDialogOpen(true);
    const onCancel = () => setIsDialogOpen(false);

    const onSubmit = (data) => {
        const { _id, ...product } = data;
        dispatch(createProduct({ product }));
        setIsDialogOpen(false);
    };

    return (
        <ProductPermission action={ CREATE_ANY }>
            <ThemedButton onClick={ onClick } className={ classes.newProduct }>
                { buttonLabel }
            </ThemedButton>
            <ProductDialog
                isOpen={ isDialogOpen }
                product={ product }
                titleLabel={ dialogTitleLabel }
                submitLabel={ dialogSubmitLabel }
                onCancel={ onCancel }
                onSubmit={ onSubmit }
            />
        </ProductPermission>
    );
});

export default NewProductButton;
