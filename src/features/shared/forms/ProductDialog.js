import React, { useEffect } from 'react';
import FormDialog from '../wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import SideTextField from '../inputs/SideTextField.js';
import { LANGUAGE } from '../../../app/utils/constants.js';
import PropTypes from 'prop-types';
import RHFCheckBox from '../rhf/inputs/RHFCheckBox.js';

const {
    autoGenerateRefLabel,
    skuLabel,
    nameLabel,
    descriptionLabel,
    localDescriptionLabel,
    hscLabel,
    deleteMessage
} = LANGUAGE.shared.forms.productDialog;

const ProductDialog = React.memo(function ProductDialog(
    { isOpen, onSubmit, onCancel, submitLabel, product, titleLabel, onDelete, isEdit }) {
    const { register, control, errors, handleSubmit, reset, watch } = useForm({
        mode: 'onSubmit'
    });

    useEffect(() => {
        reset({
            _id: product?._id,
            autoGenerateRef: false,
            company: product?.company,
            sku: product?.sku,
            name: product?.name,
            description: product?.description,
            localD: product?.localD,
            hsc: product?.hsc
        });
    }, [reset, product]);

    const autoGenerate = watch('autoGenerateRef');

    return (
        <FormDialog
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onSubmit) }
            onDelete={ onDelete }
            deleteMessage={ deleteMessage }
        >
            { !isEdit &&
            <RHFCheckBox
                name="autoGenerateRef"
                label={ autoGenerateRefLabel }
                rhfControl={ control }
            /> }
            <SideTextField
                label={ skuLabel }
                name="sku"
                inputRef={ register({ required: !autoGenerate }) }
                error={ !!errors.sku }
                required={ !autoGenerate }
                disabled={ autoGenerate || isEdit }
                autoFocus
            />
            <SideTextField
                label={ nameLabel }
                name="name"
                inputRef={ register }
            />
            <SideTextField
                label={ descriptionLabel }
                name="description"
                inputRef={ register({ required: true }) }
                error={ !!errors.description }
                required
            />
            <SideTextField
                label={ localDescriptionLabel }
                name="localD"
                inputRef={ register }
            />
            <SideTextField
                label={ hscLabel }
                name="hsc"
                inputRef={ register }
            />
        </FormDialog>
    )
});

ProductDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    titleLabel: PropTypes.string.isRequired,
    product: PropTypes.object,
    onDelete: PropTypes.func,
    isEdit: PropTypes.bool
};

export default ProductDialog;