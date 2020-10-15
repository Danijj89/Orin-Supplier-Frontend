import React, { useEffect } from 'react';
import FormDialog from '../wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import SideTextField from '../inputs/SideTextField.js';
import { LANGUAGE } from '../../../app/constants.js';
import SideCheckBox from '../inputs/SideCheckBox.js';
import PropTypes from 'prop-types';

const {
    autoGenerateLabel,
    skuLabel,
    nameLabel,
    descriptionLabel,
    localDescriptionLabel,
    hscLabel,
    deleteMessage
} = LANGUAGE.shared.forms.productDialog;

export default function ProductDialog(
    { isOpen, onSubmit, onCancel, submitLabel, product, titleLabel, onDelete }) {

    const { register, errors, handleSubmit, formState, reset, watch } = useForm({
        mode: 'onChange'
    });
    const { isValid } = formState;
    const onFormSubmit = (data) => {
        if (isValid) onSubmit(data);
    };

    useEffect(() => {
        reset({
            _id: product?._id,
            autoGenerate: false,
            sku: product?.sku,
            name: product?.name,
            description: product?.description,
            localD: product?.localD,
            hsc: product?.hsc
        });
    }, [reset, product]);

    const autoGenerate = watch('autoGenerate');

    return (
        <FormDialog
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onFormSubmit) }
            onDelete={ onDelete }
            deleteMessage={ deleteMessage }
        >
            <SideCheckBox
                label={ autoGenerateLabel }
                name="autoGenerate"
                inputRef={ register }
            />
            <SideTextField
                label={ skuLabel }
                name="sku"
                inputRef={ register(autoGenerate ? {} : { required: true }) }
                error={ !autoGenerate && !!errors.sku }
                required={ !autoGenerate }
                disabled={ autoGenerate }
                autoFocus
            />
            <SideTextField
                label={ nameLabel }
                name="name"
                inputRef={ register({ required: true }) }
                error={ !!errors.name }
                required
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
}

ProductDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    titleLabel: PropTypes.string.isRequired,
    product: PropTypes.object,
    onDelete: PropTypes.func
};