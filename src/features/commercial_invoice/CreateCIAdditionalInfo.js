import React, { useEffect, useState } from 'react';
import { Button, Typography, TextField, Container, Box } from '@material-ui/core';
import { ExpandLess as IconExpandLess, ExpandMore as IconExpandMore, Notes as IconNotes } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../constants.js';
import { Controller } from 'react-hook-form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useSelector } from 'react-redux';
import { selectCIAutocompleteOptions } from './duck/selectors.js';

const {
    title,
    additionalNotes,
    paymentReference,
    salesContract,
    portOfLoading,
    portOfDestination
} = LANGUAGE.commercialInvoice.createCIAdditionalInfo;

const useStyles = makeStyles({
    container: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#109CF1',
        borderRadius: 10,
        marginTop: 10,
        marginBot: 10,
        padding: 0
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    box: {
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '5%',
    },
    field: {
        marginTop: 8,
        marginBottom: 8
    }
})

export default function CreateCIAdditionalInfo({register, control}) {
    const classes = useStyles();
    const [hidden, setHidden] = useState(true);
    const { ports } = useSelector(selectCIAutocompleteOptions);

    useEffect(() => {
        if (!hidden) window.scrollTo(0, document.body.scrollHeight);
    }, [hidden]);

    const onAdditionalInfoClick = () => setHidden(!hidden);

    return (
        <Container className={classes.container}>
            {hidden &&
            <Button className={classes.title} onClick={onAdditionalInfoClick} fullWidth>
                <IconNotes/>
                <Typography variant="subtitle1">{title}</Typography>
                <IconExpandMore/>
            </Button>}
            {!hidden &&
            <>
                <Button className={classes.title} onClick={onAdditionalInfoClick} fullWidth>
                    <IconNotes/>
                    <Typography variant="subtitle1">{title}</Typography>
                    <IconExpandLess/>
                </Button>
                <Box className={classes.box}>
                    <Controller
                        render={props => (
                            <Autocomplete
                                freeSolo
                                autoSelect
                                {...props}
                                options={ports}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label={portOfLoading}
                                        variant="standard"
                                        className={classes.field}
                                        autoFocus
                                    />
                                )}
                                onChange={(_, data) => props.onChange(data)}
                            />
                        )}
                        name="pol"
                        control={control}
                    />
                    <Controller
                        render={props => (
                            <Autocomplete
                                freeSolo
                                autoSelect
                                {...props}
                                options={ports}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label={portOfDestination}
                                        variant="standard"
                                        className={classes.field}
                                    />
                                )}
                                onChange={(_, data) => props.onChange(data)}
                            />
                        )}
                        name="pod"
                        control={control}
                    />
                    <TextField
                        label={additionalNotes}
                        type="text"
                        name="notes"
                        inputRef={register}
                        className={classes.field}
                        fullWidth
                    />
                    <TextField
                        label={salesContract}
                        type="text"
                        name="scRef"
                        inputRef={register}
                        className={classes.field}
                        fullWidth
                    />
                    <TextField
                        label={paymentReference}
                        type="text"
                        name="paymentRef"
                        inputRef={register}
                        className={classes.field}
                        fullWidth
                    />
                </Box>
            </>
            }
        </Container>
    )
}