import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField as MuiTextField, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '4px 8px',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: props => props.labelPositionTop
            ? 'flex-start'
            : 'center',
        flexDirection: props => props.labelPositionTop
            ? 'column'
            : ''
    },
    label: {
        marginRight: 8,
        marginLeft: props => props.labelPositionTop
            ? 4
            : 0
    },
    input: {
        width: 240,
        height: 32,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 8,
        borderColor: theme.palette.tertiary['400'],
        backgroundColor: 'white',
        paddingLeft: 8,
        paddingRight: 8
    },
    required: {
        color: 'red',
        marginLeft: 2
    },
    inputInvalid: {
        borderColor: 'red'
    }
}));


export default function TextField({ label, labelPositionTop, required, ...props }) {
    const classes = useStyles({ labelPositionTop });
    const styles = `${ classes.input } ${ props.className } ${props.error ? classes.inputInvalid : '' }`


    return (
        <Box className={ classes.container }>
            <Typography
                className={ classes.label }
                variant="subtitle1"
            >
                { label }
                { required && <span className={ classes.required }>*</span> }
            </Typography>
            <MuiTextField
                className={ styles }
                InputProps={ { disableUnderline: true } }
                required={ required }
                { ...props }
            />
        </Box>
    )
}