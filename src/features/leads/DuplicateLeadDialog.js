import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@material-ui/core';
import ThemedButton from 'features/shared/buttons/ThemedButton.js';
import { makeStyles } from '@material-ui/core/styles';
import { CREATE_ANY } from 'features/admin/utils/actions.js';
import { LANGUAGE } from 'app/utils/constants.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogContentText from '@material-ui/core/DialogContentText';
import LeadPermission from 'features/shared/permissions/LeadPermission.js';

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: '100vw'
    },
    onSubmitButton: {
        marginRight: theme.spacing(4),
        marginBottom: theme.spacing(1),
    },
    onCancelButton: {
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(2),
        color: theme.palette.danger.main,
        borderColor: theme.palette.danger.main,
        '&:hover': {
            color: theme.palette.danger.dark,
            borderColor: theme.palette.danger.dark,
        },
    },
    dialogAction: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    warningText: {
        color: 'red'
    },
    title: {
        paddingBottom: 0
    }
}));

const {
    messages,
    buttons
} = LANGUAGE.lead.overview;

const DuplicateLeadDialog = React.memo(function DuplicateLeadDialog(
    { isOpen, onCancel, onSubmit, duplicates = [] }) {
    const classes = useStyles();

    return (
        <Dialog
            open={ isOpen }
            classes={ { paper: classes.container } }
            scroll='paper'
        >
            <DialogTitle className={classes.title}>{ messages.duplicate }</DialogTitle>
            <DialogContent className={ classes.warningText }>{ messages.duplicate2 }</DialogContent>
            <Divider/>
            <LeadPermission action={ [CREATE_ANY] }>
                <DialogContent>
                    <DialogContentText>{ messages.duplicateCreate }</DialogContentText>
                    <List dense>
                        { duplicates.map((duplicate, i) =>
                            <ListItem key={ `duplicate-${ i }-${ duplicate.primary }` }>
                                <ListItemText
                                    primary={ duplicate.primaryText }
                                    secondary={ duplicate.secondaryText }
                                />
                            </ListItem>
                        ) }
                    </List>
                </DialogContent>
            </LeadPermission>
            <DialogActions className={ classes.dialogAction }>
                <ThemedButton
                    className={ classes.onCancelButton }
                    variant="outlined"
                    onClick={ onCancel }
                >
                    { buttons.duplicateCancel }
                </ThemedButton>
                <LeadPermission action={ [CREATE_ANY] }>
                    <ThemedButton
                        className={ classes.onSubmitButton }
                        onClick={ onSubmit }
                    >
                        { buttons.duplicateSubmit }
                    </ThemedButton>
                </LeadPermission>
            </DialogActions>
        </Dialog>
    );
});

DuplicateLeadDialog.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    duplicates: PropTypes.arrayOf(PropTypes.exact({
        primaryText: PropTypes.string.isRequired,
        secondaryText: PropTypes.string
    }))
};

export default DuplicateLeadDialog;