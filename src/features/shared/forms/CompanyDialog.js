import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import FormDialog from '../wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import { LANGUAGE } from '../../../app/utils/constants.js';
import SideTextField from '../inputs/SideTextField.js';
import { currenciesOptions, industriesOptions } from '../constants.js';
import RHFAutoComplete from '../rhf/inputs/RHFAutoComplete.js';

const { taxNumberLabel, currencyLabel, industriesLabel } = LANGUAGE.shared.forms.companyDialog;

const CompanyDialog = React.memo(function CompanyDialog(
    { company, isOpen, titleLabel, submitLabel, onSubmit, onCancel, className }) {

    const { register, errors, handleSubmit, control, reset } = useForm({
        mode: 'onSubmit'
    });

    useEffect(() => {
        reset({
            taxNumber: company?.taxNumber,
            currency: company?.currency || null,
            industries: company?.industries || []
        });
    }, [reset, company]);

    return (
        <FormDialog
            className={ className }
            isOpen={ isOpen }
            titleLabel={ titleLabel }
            submitLabel={ submitLabel }
            onCancel={ onCancel }
            onSubmit={ handleSubmit(onSubmit) }
        >
            <SideTextField
                label={ taxNumberLabel }
                name="taxNumber"
                inputRef={ register({ required: true }) }
                autoFocus
            />
            <RHFAutoComplete
                rhfControl={ control }
                name="currency"
                label={ currencyLabel }
                options={ currenciesOptions }
            />
            <RHFAutoComplete
                rhfControl={ control }
                name="industries"
                label={ industriesLabel }
                options={ industriesOptions }
                error={ !!errors.industries }
                multiple
                required
            />
        </FormDialog>
    )
});

CompanyDialog.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    titleLabel: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    className: PropTypes.string,
    company: PropTypes.object
};

export default CompanyDialog;