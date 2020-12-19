import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLeadById } from './duck/selectors.js';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';
import FormContainer from '../shared/wrappers/FormContainer.js';
import { LANGUAGE } from '../../app/utils/constants.js';
import SideTextField from '../shared/inputs/SideTextField.js';
import RHFDateField from '../shared/rhf/inputs/RHFDateField.js';
import RHFAutoComplete from '../shared/rhf/inputs/RHFAutoComplete.js';
import {
    selectAllActiveUsers,
    selectUsersMap,
} from '../users/duck/selectors.js';
import Box from '@material-ui/core/Box';
import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { dateToLocaleDate } from '../shared/utils/format.js';
import StatusDropdown from '../shared/components/StatusDropdown.js';
import {
    selectSessionUserId,
    selectLeadPotentials,
    selectLeadTypes,
    selectSalesStatuses,
} from '../../app/duck/selectors.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { getOptionId } from '../../app/utils/options/getters.js';
import { convertLeadToClient, deleteLead, updateLead } from './duck/thunks.js';
import DeleteButton from '../shared/buttons/DeleteButton.js';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { DELETE_ANY, DELETE_OWN, UPDATE_ANY, UPDATE_OWN } from '../admin/utils/actions.js';
import LeadPermission from '../shared/permissions/LeadPermission.js';

const {
    formLabels,
    createdAtLabel,
    leadInfoTitleLabel,
    salesInfoTitleLabel,
    saveButtonLabel,
    deleteMessage,
    convertButtonLabel,
} = LANGUAGE.lead.lead.leadDetails;

const useStyles = makeStyles((theme) => ({
    actionButton: {
        margin: theme.spacing(2),
    },
    selector: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    selectorLabel: {
        width: theme.spacing(19.5),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(4),
    },
    convertButton: {
        marginRight: theme.spacing(7.5),
        marginBottom: theme.spacing(3),
    },
    createdAtCaption: {
        marginRight: theme.spacing(2),
    },
}));

const LeadDetails = React.memo(function LeadDetails({ leadId }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const users = useSelector(selectAllActiveUsers);
    const usersMap = useSelector(selectUsersMap);
    const salesStatusOptions = useSelector(selectSalesStatuses);
    const leadTypeOptions = useSelector(selectLeadTypes);
    const leadPotentialOptions = useSelector(selectLeadPotentials);
    const lead = useSelector((state) => selectLeadById(state, { leadId }));
    const sessionUserId = useSelector(selectSessionUserId);

    const {
        register,
        control,
        errors,
        watch,
        setValue,
        handleSubmit,
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            name: lead.name,
            contactName: lead.contact?.name,
            contactEmail: lead.contact?.email,
            phone: lead.contact?.phone,
            additional: lead.contact?.additional,
            source: lead.source,
            quotation: lead.quotation,
            sample: lead.sample,
            lastContact: lead.lastContact,
            assignedTo: usersMap[lead.assignedTo] || null,
            notes: lead.notes,
            salesStatus: lead.salesStatus,
            leadType: lead.leadType,
            leadPotential: lead.leadPotential,
        },
    });

    useEffect(() => {
        register({ name: 'salesStatus' }, { required: true });
        register({ name: 'leadType' }, { required: true });
        register({ name: 'leadPotential' }, { required: true });
    }, [register]);

    const salesStatus = watch('salesStatus');
    const leadType = watch('leadType');
    const leadPotential = watch('leadPotential');

    const createStatusChangeHandler = useCallback(
        (statusType) => (newStatus) => setValue(statusType, newStatus),
        [setValue]
    );

    const onConvert = useCallback(() => {
        dispatch(convertLeadToClient({ leadId, sessionUserId }));
        history.push('/home/leads');
    }, [dispatch, history, leadId, sessionUserId]);

    const onDelete = useCallback(() => {
        dispatch(deleteLead({ leadId }));
        history.push('/home/leads');
    }, [dispatch, history, leadId]);

    const onSubmit = useCallback(
        (data) => {
            const {
                contactName,
                contactEmail,
                phone,
                additional,
                ...update
            } = data;
            update.contact = {
                name: contactName,
                email: contactEmail,
                phone: phone,
                additional: additional,
            };
            update.salesStatus = getOptionId(update.salesStatus);
            update.leadType = getOptionId(update.leadType);
            update.leadPotential = getOptionId(update.leadPotential);
            if (update.assignedTo) update.assignedTo = update.assignedTo._id;
            dispatch(updateLead({ leadId, update }));
        },
        [dispatch, leadId]
    );

    return (
        <form onSubmit={ handleSubmit(onSubmit) } autoComplete="off" noValidate>
            <Grid container>
                <Grid container item justify="flex-end" xs={ 12 }>
                    <LeadPermission action={ [UPDATE_ANY, UPDATE_OWN] }>
                        <ThemedButton
                            className={ classes.convertButton }
                            onClick={ onConvert }
                            variant="outlined"
                        >
                            { convertButtonLabel }
                        </ThemedButton>
                    </LeadPermission>
                </Grid>
                <Grid container item alignItems="flex-start" xs={ 12 }>
                    <Grid container item justify="center" md>
                        <Typography variant="h5">
                            { leadInfoTitleLabel }
                        </Typography>
                        <FormContainer>
                            <SideTextField
                                label={ formLabels.name }
                                name="name"
                                inputRef={ register({ required: true }) }
                                error={ !!errors.name }
                                required
                            />
                            <SideTextField
                                label={ formLabels.contactName }
                                name="contactName"
                                inputRef={ register }
                            />
                            <SideTextField
                                label={ formLabels.contactEmail }
                                name="contactEmail"
                                inputRef={ register }
                                type="email"
                            />
                            <SideTextField
                                label={ formLabels.phone }
                                name="phone"
                                inputRef={ register }
                            />
                            <SideTextField
                                label={ formLabels.additional }
                                name="additional"
                                inputRef={ register }
                            />
                            <Grid
                                className={ classes.selector }
                                container
                                item
                                xs={ 12 }
                            >
                                <Typography
                                    className={ classes.selectorLabel }
                                    align="right"
                                    variant="subtitle1"
                                >
                                    { formLabels.salesStatus }
                                </Typography>
                                <StatusDropdown
                                    status={ salesStatus }
                                    statuses={ salesStatusOptions }
                                    colorMap="salesStatus"
                                    onStatusChange={ createStatusChangeHandler(
                                        'salesStatus'
                                    ) }
                                />
                            </Grid>
                            <Grid
                                className={ classes.selector }
                                container
                                item
                                xs={ 12 }
                            >
                                <Typography
                                    className={ classes.selectorLabel }
                                    align="right"
                                    variant="subtitle1"
                                >
                                    { formLabels.leadType }
                                </Typography>
                                <StatusDropdown
                                    status={ leadType }
                                    statuses={ leadTypeOptions }
                                    colorMap="leadType"
                                    onStatusChange={ createStatusChangeHandler(
                                        'leadType'
                                    ) }
                                />
                            </Grid>
                            <Grid
                                className={ classes.selector }
                                container
                                item
                                xs={ 12 }
                            >
                                <Typography
                                    className={ classes.selectorLabel }
                                    align="right"
                                    variant="subtitle1"
                                >
                                    { formLabels.leadPotential }
                                </Typography>
                                <StatusDropdown
                                    status={ leadPotential }
                                    statuses={ leadPotentialOptions }
                                    colorMap="leadPotential"
                                    onStatusChange={ createStatusChangeHandler(
                                        'leadPotential'
                                    ) }
                                />
                            </Grid>
                        </FormContainer>
                    </Grid>
                    <Grid container item justify="center" md={ 1 }>
                        <Box
                            component={ Divider }
                            display={ { xs: 'none', lg: 'block' } }
                            orientation="vertical"
                        />
                    </Grid>
                    <Grid container item justify="center" md>
                        <Typography variant="h5">
                            { salesInfoTitleLabel }
                        </Typography>
                        <FormContainer>
                            <SideTextField
                                label={ formLabels.source }
                                name="source"
                                inputRef={ register }
                            />
                            <RHFDateField
                                rhfControl={ control }
                                name="quotation"
                                label={ formLabels.quotation }
                            />
                            <RHFDateField
                                rhfControl={ control }
                                name="sample"
                                label={ formLabels.sample }
                            />
                            <RHFDateField
                                rhfControl={ control }
                                name="lastContact"
                                label={ formLabels.lastContact }
                            />
                            <RHFAutoComplete
                                rhfControl={ control }
                                name="assignedTo"
                                label={ formLabels.assignedTo }
                                options={ users }
                                getOptionLabel={ (option) => option.name }
                                getOptionSelected={ (option, value) =>
                                    option._id === value._id || !value.active
                                }
                            />
                            <SideTextField
                                name="notes"
                                multiline
                                rows={ 4 }
                                rowsMax={ 8 }
                                label={ formLabels.notes }
                                inputRef={ register }
                            />
                            <Typography
                                className={ classes.createdAtCaption }
                                variant="caption"
                            >
                                { `${ createdAtLabel } ${ dateToLocaleDate(
                                    lead.createdAt
                                ) }` }
                            </Typography>
                        </FormContainer>
                    </Grid>
                </Grid>
                <Grid container item justify="center" xs={ 12 }>
                    <LeadPermission action={ [DELETE_ANY, DELETE_OWN] } leadId={ leadId }>
                        <DeleteButton
                            onDelete={ onDelete }
                            deleteMessage={ deleteMessage }
                            className={ classes.actionButton }
                        />
                    </LeadPermission>
                    <LeadPermission action={ [UPDATE_ANY, UPDATE_OWN] } leadId={ leadId }>
                        <ThemedButton
                            type="submit"
                            className={ classes.actionButton }
                        >
                            { saveButtonLabel }
                        </ThemedButton>
                    </LeadPermission>
                </Grid>
            </Grid>
        </form>
    );
});

export default LeadDetails;
