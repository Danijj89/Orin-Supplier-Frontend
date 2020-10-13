import React from 'react';
import { useHistory } from 'react-router-dom';
import ThemedButton from '../shared/buttons/ThemedButton.js';
import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../shared/components/Loader.js';
import { LANGUAGE } from '../../app/constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatus } from './duck/selectors.js';
import { startNewShipment } from './duck/thunks.js';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(4),
        minHeight: 800
    },
    buttonsRow: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

const { addShipmentButton } = LANGUAGE.shipments.overview;

export default function ShipmentOverview() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const status = useSelector(selectStatus);

    const onNewShipment = () => {
        // dispatch(startNewShipment());
        history.push('/home/shipments/new');
    }

    return (
        <Paper className={ classes.paper }>
            <Grid container>
                <Grid item xs={ 12 } className={ classes.buttonsRow }>
                    <ThemedButton
                        onClick={ onNewShipment }
                        text={ addShipmentButton }
                    />
                </Grid>
                { status === 'PENDING' &&
                <Grid item xs={ 12 }>
                    <Loader/>
                </Grid> }
                { status === 'IDLE' &&
                <Grid item xs={ 12 }>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid> }
            </Grid>
        </Paper>
    )
}