import React, { useEffect, useState } from 'react';
import { Paper, Grid, Typography, Box, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import OrderProductTableView from './OrderProductTableView.js';
import OrderProductTableEdit from './OrderProductTableEdit.js';
import { Check as IconCheck, Clear as IconClear } from '@material-ui/icons';
import { LANGUAGE } from '../../constants.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import { defaultTableHeaders } from './duck/slice.js';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        minHeight: 500,
        overflow: 'auto'
    },
    container: {
        height: '100%',
    },
    topPanel: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        color: theme.palette.tertiary['700'],
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        minHeight: 52
    },
    title: {
        fontWeight: 'bold'
    },
    buttons: {
        display: 'flex',
        height: '80%'
    },
    botPanel: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(1),
    },
    editCancel: {
        color: 'red'
    },
    editConfirm: {
        color: 'green'
    }
}));

const { tableTitleLabel, editButtonLabel, errorMessages } = LANGUAGE.order.orderProductTable;

export default function OrderProductTable({ order }) {
    const classes = useStyles();
    const [isEdit, setIsEdit] = useState(false);
    const { unallocated: unallocatedItems, allocated: allocatedItems, currency: initialCurrency } = order;

    const getHeaders = () => {
        const headers = [...defaultTableHeaders];
        if (order.hasOwnProperty('customColumns') && order.customColumns[0]) {
            headers[2] = order.customColumns[0];
        }
        if (order.hasOwnProperty('customColumns') && order.customColumns[1]) {
            headers[3] = order.customColumns[1];
        }
        return headers;
    }
    const initialHeaders = getHeaders();

    const initialUnallocatedItems = unallocatedItems.map(row => [
        row.ref,
        row.description,
        row.customValues[0],
        row.customValues[1],
        row.quantity,
        row.unit,
        row.price,
        row.total
    ]);

    const { register, setValue, errors, watch, handleSubmit } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            headers: initialHeaders,
            unallocated: initialUnallocatedItems,
            currency: initialCurrency
        }
    });

    const validateItems = (items) => {
        for (const item of items) {
            for (let i = 0; i < item.length; i++) {
                if (i >= 1 && i <= 3) continue;
                if (!item[i]) return errorMessages.missingItemInfo;
            }
        }
        return true;
    }

    useEffect(() => {
        register({ name: 'headers' });
        register({ name: 'unallocated' }, { validate: items => validateItems(items) });
        register({ name: 'currency' }, { required: errorMessages.currencyRequired });
    }, [register]);

    const onEditClick = () => setIsEdit(true);
    const onEditCancelClick = () => setIsEdit(false);
    const onEditConfirmClick = (data) => {
        setIsEdit(false);
    }

    return (
        <Paper className={ classes.root }>
            <Grid container className={ classes.container }>
                <Grid item xs={ 12 } className={ classes.topPanel }>
                    <Typography variant="h5" className={ classes.title }>{ tableTitleLabel }</Typography>
                    { !isEdit && <Box className={ classes.buttons }>
                        <ThemedButton
                            onClick={ onEditClick }
                            text={ editButtonLabel }
                            variant="outlined"
                        />
                    </Box> }
                    { isEdit && <Box className={ classes.buttons }>
                        <IconButton
                            className={ classes.editCancel }
                            onClick={ onEditCancelClick }
                            size="small"
                        >
                            <IconClear/>
                        </IconButton>
                        <IconButton
                            className={ classes.editConfirm }
                            onClick={ handleSubmit(onEditConfirmClick) }
                            size="small"
                        >
                            <IconCheck/>
                        </IconButton>
                    </Box> }
                </Grid>
                <Grid item xs={ 12 } className={ classes.botPanel }>
                    { !isEdit &&
                    <OrderProductTableView
                        headers={ initialHeaders }
                        items={ initialUnallocatedItems }
                        currency={ initialCurrency }
                    /> }
                    { isEdit &&
                    <OrderProductTableEdit
                        watch={ watch }
                        setValue={ setValue }
                        errors={ errors }
                    />
                    }
                </Grid>
            </Grid>
        </Paper>
    )
}