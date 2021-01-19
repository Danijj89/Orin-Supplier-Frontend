import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    ChatBubble as IconChatFull,
    ChatBubbleOutline as IconChatEmpty,
} from '@material-ui/icons';
import Popover from '@material-ui/core/Popover';
import { useForm } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import TextArea from '../inputs/TextArea.js';
import { makeStyles } from '@material-ui/core/styles';
import ThemedButton from '../buttons/ThemedButton.js';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(2),
    },
    cancelButton: {
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        color: theme.palette.danger.light,
        borderColor: theme.palette.danger.light,
        '&:hover': {
            color: theme.palette.white.main,
            borderColor: theme.palette.danger.dark,
            backgroundColor: theme.palette.danger.main,
        },
    },
    updateButton: {
        marginTop: theme.spacing(1),
    },
}));

const PopoverNotes = React.memo(function PopoverNotes({ notes, onSubmit }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const { register, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            notes: notes,
        },
        shouldUnregister: false,
    });

    const handleClick = (e) => {
        e.stopPropagation();
        setAnchorEl(anchorEl ? null : e.currentTarget);
    };

    const onCancel = () => setAnchorEl(null);

    const onFromSubmit = (data) => {
        onSubmit(data);
        setAnchorEl(null);
    };

    return (
        <>
            { notes && (
                <ThemedButton variant="text" onClick={ handleClick }>
                    <IconChatFull/>
                </ThemedButton>
            ) }
            { !notes && (
                <ThemedButton variant="text" onClick={ handleClick }>
                    <IconChatEmpty/>
                </ThemedButton>
            ) }
            <Popover
                open={ Boolean(anchorEl) }
                anchorEl={ anchorEl }
                onClose={ onCancel }
                anchorOrigin={ {
                    vertical: 'bottom',
                    horizontal: 'left',
                } }
                transformOrigin={ {
                    vertical: 'top',
                    horizontal: 'right',
                } }
            >
                <form onSubmit={ handleSubmit(onFromSubmit) } autoComplete="off">
                    <Grid
                        container
                        onClick={ (e) => e.stopPropagation() }
                        className={ classes.container }
                    >
                        <Grid container item>
                            <TextArea
                                name="notes"
                                inputRef={ register }
                                autoFocus
                                rowsMax={ 8 }
                                rows={ 4 }
                            />
                        </Grid>
                        <Grid container item justify="flex-end">
                            <ThemedButton
                                onClick={ onCancel }
                                variant="outlined"
                                className={ classes.cancelButton }
                            >
                                Cancel
                            </ThemedButton>
                            <ThemedButton
                                type="submit"
                                className={ classes.updateButton }
                            >
                                Update
                            </ThemedButton>
                        </Grid>
                    </Grid>
                </form>
            </Popover>
        </>
    );
});

PopoverNotes.propTypes = {
    notes: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
};

export default PopoverNotes;
