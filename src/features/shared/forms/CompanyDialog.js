import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import FormDialog from '../wrappers/FormDialog.js';
import { useForm } from 'react-hook-form';
import { LANGUAGE, LOCALE } from '../../../app/utils/constants.js';
import SideTextField from '../inputs/SideTextField.js';
import RHFAutoComplete from '../rhf/inputs/RHFAutoComplete.js';
import { useSelector } from 'react-redux';
import { selectCurrencies, selectIndustries } from '../../../app/duck/selectors.js';
import { getOptionLabel } from '../../../app/utils/options/getters.js';

const { taxNumberLabel, currencyLabel, industriesLabel } = LANGUAGE.shared.forms.companyDialog;

const CompanyDialog = React.memo(function CompanyDialog(
    { company, isOpen, titleLabel, submitLabel, onSubmit, onCancel, className }) {
    const currencyOptions = useSelector(selectCurrencies);
    const industryOptions = useSelector(selectIndustries);

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
                options={ currencyOptions }
                getOptionLabel={ option => getOptionLabel(option, LOCALE) }
                getOptionSelected={ (option, value) => option.id === value.id }
            />
            <RHFAutoComplete
                rhfControl={ control }
                name="industries"
                label={ industriesLabel }
                options={ industryOptions }
                getOptionLabel={ option => getOptionLabel(option, LOCALE) }
                getOptionSelected={ (option, value) => option.id === value.id }
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