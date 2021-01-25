import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import TextArea from '../inputs/TextArea.js';
import FormDialog from '../wrappers/FormDialog.js';
import { LANGUAGE } from 'app/utils/constants.js';
import Title6 from 'features/shared/display/Title6.js';
import Title7 from 'features/shared/display/Title7.js';

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
        <>
            <Card className={ clsx(classes.container, className) } onClick={ onDisplayClick }>
                <Title6 className={ classes.title } title={ titleLabel }/>
                <Divider/>
                <Title7 className={ classes.display } title={ value }/>
            </Card>
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
                    className={ classes.dialog }
                />
            </FormDialog>
            }
        </>
    )
});

TextAreaCard.propTypes = {
    titleLabel: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    value: PropTypes.string,
    className: PropTypes.string
};

export default TextAreaCard;