import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    DialogActions,
    DialogTitle,
    Divider,
    DialogContent,
    Box
} from '@material-ui/core';
import ThemedButton from '../buttons/ThemedButton.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { makeStyles } from '@material-ui/core/styles';
import DeleteButton from '../buttons/DeleteButton.js';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
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
        justifyContent: props => props.onDelete ? 'space-between' : 'flex-end',
    },
    onDeleteButton: {
        paddingBottom: theme.spacing(1),
    },
    dialogPaper: {
        maxWidth: '100vw'
    }
}));

const { cancelLabel } = LANGUAGE.shared.wrappers.formDialog;

const FormDialog = React.memo(function FormDialog(
    {
        children,
        onSubmit,
        onCancel,
        onDelete,
        deleteMessage,
        isOpen,
        titleLabel,
        submitLabel,
        className,
        onClose
    }) {
    const classes = useStyles({ onDelete });

    const onClick = useCallback(e => e.stopPropagation(), []);

    return (
        <Dialog
            open={ isOpen }
            classes={ { paper: classes.dialogPaper } }
            className={ className }
            onClick={ onClick }
            scroll='paper'
        >
            <form onSubmit={ onSubmit } autoComplete="off" noValidate>
                <DialogTitle>{ titleLabel }</DialogTitle>
                <Divider/>
                <DialogContent className={ classes.container }>
                    { children }
                </DialogContent>
                <DialogActions className={ classes.dialogAction }>
                    { onDelete &&
                    <DeleteButton
                        onDelete={ onDelete }
                        deleteMessage={ deleteMessage }
                        className={ classes.onDeleteButton }
                    />
                    }
                    <Box>
                        <ThemedButton
                            className={ classes.onCancelButton }
                            variant="outlined"
                            onClick={ onCancel }
                        >
                            { cancelLabel }
                        </ThemedButton>
                        <ThemedButton
                            className={ classes.onSubmitButton }
                            type="submit"
                        >
                            { submitLabel }
                        </ThemedButton>
                    </Box>
                </DialogActions>
            </form>
        </Dialog>
    );
});

FormDialog.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    titleLabel: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    onDelete: PropTypes.func,
    deleteMessage: PropTypes.string
};

export default FormDialog;
