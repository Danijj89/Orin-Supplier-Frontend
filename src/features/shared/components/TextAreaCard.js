import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import TextArea from '../inputs/TextArea.js';
import FormDialog from '../wrappers/FormDialog.js';
import { LANGUAGE } from '../../../app/utils/constants.js';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        minHeight: 160
    },
    display: {
        flexGrow: 1,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    title: {
        fontWeight: 'bold',
        paddingTop: '12px',
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    dialog: {
        width: theme.spacing(80),
        height: theme.spacing(30),
        [theme.breakpoints.down('md')]: {
            width: theme.spacing(50),
            height: theme.spacing(30),
        },
        [theme.breakpoints.down('xs')]: {
            width: theme.spacing(30),
            height: theme.spacing(30),
        },
    }
}));

const { submitLabel } = LANGUAGE.shared.components.textAreaCard;

const TextAreaCard = React.memo(function TextAreaCard({ titleLabel, value, className, onSubmit }) {
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
            <Typography variant = "h5" className={classes.title}> { titleLabel }</Typography>
            <Divider/>
            { !isEdit &&
            <Typography onClick={ onDisplayClick } className={ classes.display }>
                { value }
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
                    className={classes.dialog}
                />
            </FormDialog>
            }
        </Card>
    )
});

TextAreaCard.propTypes = {
    titleLabel: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default TextAreaCard;