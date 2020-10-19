import React, { useState } from 'react';
import { Card, Box, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import TextArea from '../inputs/TextArea.js';
import FormDialog from '../wrappers/FormDialog.js';
import { LANGUAGE } from '../../../app/constants.js';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: 160
    },
    display: {
        flexGrow: 1
    }
}));

const { submitLabel } = LANGUAGE.shared.components.textAreaCard;

export default function TextAreaCard({ titleLabel, value, className, onSubmit }) {
    const classes = useStyles();
    const [isEdit, setIsEdit] = useState(false);
    const [val, setVal] = useState(value);

    const onDisplayClick = () => setIsEdit(true);
    const onFormSubmit = () => {
        onSubmit(val);
        setIsEdit(false);
    };

    return (
        <Card className={ clsx(classes.container, className) }>
            <Typography>{ titleLabel }</Typography>
            <Divider/>
            { !isEdit &&
            <Typography onClick={ onDisplayClick } className={ classes.display }>
                { val }
            </Typography>
            }
            { isEdit &&
            <FormDialog
                isOpen={ isEdit }
                onSubmit={ onFormSubmit }
                onCancel={ () => setIsEdit(false) }
                titleLabel={ titleLabel }
                submitLabel={ submitLabel }
            >
                <TextArea
                    onChange={ e => setVal(e.target.value) }
                    value={ val }
                    rows={ 4 }
                    rowsMax={ 8 }
                    autoFocus
                />
            </FormDialog>
            }
        </Card>
    )
}