import React, { useEffect, useRef, useState } from 'react';
import { Button, Typography, TextField, Container, Box } from '@material-ui/core';
import { ExpandLess as IconExpandLess, ExpandMore as IconExpandMore, Notes as IconNotes } from '@material-ui/icons';
import { Controller } from 'react-hook-form';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../constants.js';

const {
    title,
    additionalNotes,
    countryOfManufacture,
    paymentReference,
    salesContract
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
    const mounted = useRef();
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if (mounted && !hidden) window.scrollTo(0, document.body.scrollHeight);
    }, [hidden]);

    const onShippingInfoClick = () => setHidden(!hidden);

    return (
        <Container className={classes.container}>
            {hidden &&
            <Button className={classes.title} onClick={onShippingInfoClick} fullWidth>
                <IconNotes/>
                <Typography variant="subtitle1">{title}</Typography>
                <IconExpandMore/>
            </Button>}
            {!hidden &&
            <>
                <Button className={classes.title} onClick={onShippingInfoClick} fullWidth>
                    <IconNotes/><Typography variant="subtitle1">{title}</Typography>
                    <IconExpandLess/>
                </Button>
                <Box className={classes.box}>
                    <TextField
                        label={countryOfManufacture}
                        type="text"
                        name="com"
                        inputRef={register}
                        className={classes.field}
                        fullWidth
                        autoFocus
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