import React from 'react';
import { Paper, Grid, Typography, Divider, TextField } from '@material-ui/core';
import { LANGUAGE } from '../../constants.js';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from './duck/slice.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { updateCurrentUser } from './duck/thunks.js';

const { titleLabel, nameLabel, emailLabel, resetPasswordButtonLabel, saveButtonLabel } = LANGUAGE.home.accountSettingsTab;

export default function AccountSettingsTab() {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);

    const { register, errors, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            name: user.name,
            email: user.email
        }
    });

    const onSave = (data) => {
        data.id = user._id;
        dispatch(updateCurrentUser(data));
    }

    const onResetPassword = () => {}

    return (
        <Paper>
            <Typography variant="h5">{ titleLabel }</Typography>
            <Divider/>
            <form onSubmit={handleSubmit(onSave)}>
                <Grid container>
                    <Grid item xs={ 12 }>

                        <TextField
                            name="name"
                            inputRef={ register({ required: true }) }
                            label={ nameLabel }
                            error={ !!errors.name }
                            autoFocus
                        />
                        <TextField
                            name="email"
                            type="email"
                            inputRef={ register({ required: true }) }
                            label={ emailLabel }
                            error={ !!errors.email }
                        />

                    </Grid>
                    <Grid container item justify="flex-end" xs={ 12 }>
                        <ThemedButton
                            text={ resetPasswordButtonLabel }
                            onClick={ onResetPassword }
                        />
                        <ThemedButton
                            text={ saveButtonLabel }
                            type="submit"
                        />
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}