import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Typography, Grid, Button, DialogTitle, DialogActions, Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../constants.js';
import DeleteIcon from '@material-ui/icons/Delete.js';
import { useDispatch } from 'react-redux';
import { deleteOrder } from './duck/thunks.js';
import { getStringFromTotalQuantityObject, yymmddToLocaleDate } from '../shared/utils.js';
import DocumentTag from '../shared/displays/DocumentTag.js';
import FeatureInProgressTag from '../shared/displays/FeatureInProgressTag.js';

const { dateTitle, crdTitle , editButton, incotermTitle , quantityTitle,
    deleteOrderDialogCancelButton, deleteOrderDialogConfirmButton, deleteOrderDialogMessage } = LANGUAGE.order.orderInfoTile;

const useStyles = makeStyles({
    card: {
        margin: '2% 0',
        padding: '2%'
    },
    status: {
        display: 'inline-block',
        borderRadius: '6px',
        background: 'grey',
        padding: '0.5% 3%',
        color: 'white',
        margin: '0.5%'
    },
    poRef: {
        margin: '1% 0.5%',
        fontWeight: 'bold'
    },
    info: {
        margin: '0.5%',
    },
    title: {
        display: 'inline-block',
        fontWeight: 'lighter'
    },
    value: {
        display: 'inline-block',
    },
    edit: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 55
    }
})

export default function OrderInfoTile({order}) {
    const classes = useStyles();
    const {
        status,
        poRef: orderNumber,
        date: orderDate,
        crd: cargoReadyDay,
        totalQ: totalQuantity,
        incoterm,
        documents
    } = order;
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const history = useHistory();

    const onDialogOpen = () => setIsDialogOpen(true);
    const onDialogClose = () => setIsDialogOpen(false);

    const onDeleteClick = () => {
        dispatch(deleteOrder(order._id));
        history.push('/home/orders');
    }

    return (
        <Card className={classes.card}>
            <Grid
                container
            >
                <Grid item xs={10}>
                    <Typography className={classes.status}>{status}</Typography>
                    <Typography className={classes.poRef}>{orderNumber}</Typography>
                    <div className={classes.info}>
                        <Typography className={classes.title}>{`${dateTitle}:`}&nbsp;</Typography>
                        <Typography className={classes.value}>{yymmddToLocaleDate(orderDate)}</Typography>
                    </div>
                    <div className={classes.info}>
                        <Typography className={classes.title}>{`${crdTitle}:`}&nbsp;</Typography>
                        <Typography className={classes.value}>{yymmddToLocaleDate(cargoReadyDay)}</Typography>
                    </div>
                    <div className={classes.info}>
                        <Typography className={classes.title}>{`${quantityTitle}:`}&nbsp;</Typography>
                        <Typography className={classes.value}>
                            {getStringFromTotalQuantityObject(totalQuantity)}
                        </Typography>
                    </div>
                    <div className={classes.info}>
                        <Typography className={classes.title}>{`${incotermTitle}:`}&nbsp;</Typography>
                        <Typography className={classes.value}>
                            {incoterm}
                        </Typography>
                    </div>
                </Grid>
                <Grid
                    container
                    item
                    direction="column"
                    justify="space-between"
                    alignItems="flex-end"
                    xs={2}
                >
                    <Button onClick={onDialogOpen}><DeleteIcon/></Button>
                    <Dialog onClose={onDialogClose} open={isDialogOpen}>
                        <DialogTitle>{deleteOrderDialogMessage}</DialogTitle>
                        <DialogActions>
                            <Button onClick={onDialogClose} color="primary" variant="outlined">
                                {deleteOrderDialogCancelButton}
                            </Button>
                            <Button onClick={onDeleteClick} color="primary" variant="outlined">
                                {deleteOrderDialogConfirmButton}
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Button variant="outlined">
                        <Typography className={classes.edit}>{editButton}<FeatureInProgressTag /></Typography>
                    </Button>
                </Grid>
                <Grid
                    container
                    item
                    justify="flex-end"
                    xs={12}
                >
                    {documents && Object.entries(documents).map(([docType, docId], index) =>
                        <DocumentTag key={index} docType={docType}/>
                    )}
                </Grid>
            </Grid>
        </Card>
    )
}