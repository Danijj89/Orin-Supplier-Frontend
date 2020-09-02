import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentCI, selectNewPL } from './duck/selectors.js';
import { TextField, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../constants.js';
import { submitPLDetails } from './duck/slice.js';
import { selectCurrentUser } from '../home/slice.js';
import { getFileName } from '../shared/utils.js';

const { plRefLabel, dateLabel, notesLabel, cancelButton, nextButton } = LANGUAGE.packingList.createPLDetailsForm;

const useStyles = makeStyles({
    form: {
        padding: '24px 25%'
    },
    field: {
        margin: '10px 0'
    },
    buttons: {
        marginTop: '5%'
    },
    button: {
        width: '45%',
        height: '50%',
        margin: 'auto'
    }
})

export default function CreateOrderDetailsForm({ setActiveStep }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const { _id: userId } = useSelector(selectCurrentUser);
    const { plRef, date, notes } = useSelector(selectNewPL);
    const { register, handleSubmit, errors } = useForm({
        mode: 'onBlur',
        defaultValues: {
            plRef,
            date: date.substr(0, 10),
            notes
        }
    });

    const onButtonNextClick = (data) => {
        data.createdBy = userId;
        data.fileName = getFileName('PL', data.plRef, data.createdBy);
        dispatch(submitPLDetails(data));
        setActiveStep(prev => prev + 1);
    }

    const onButtonCancelClick = () => history.goBack();

    return (
        <form className={ classes.form } onSubmit={ handleSubmit(onButtonNextClick) } autoComplete="off">
            <TextField
                label={ plRefLabel }
                type="text"
                name="plRef"
                error={ !!errors.plRef }
                inputRef={ register({ required: true }) }
                className={ classes.field }
                fullWidth
                autoFocus
            />
            <TextField
                label={ dateLabel }
                type="date"
                name="date"
                error={ !!errors.date }
                inputRef={ register({ required: true }) }
                className={ classes.field }
                fullWidth
                required
            />
            <TextField
                label={ notesLabel }
                type="text"
                name="notes"
                error={ !!errors.notes }
                inputRef={ register }
                className={ classes.field }
                fullWidth
            />
            <Grid
                container
                justify="space-around"
                className={ classes.buttons }
            >
                <Button
                    variant="outlined"
                    className={classes.button}
                    onClick={ onButtonCancelClick }
                >
                    { cancelButton }
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                    type="submit"
                >
                    { nextButton }
                </Button>
            </Grid>
        </form>
    )
}