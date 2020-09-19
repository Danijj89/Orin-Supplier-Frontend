import React, { useEffect, useRef, useState } from 'react';
import { LANGUAGE } from '../../constants.js';
import OrderTableRow from './OrderTableRow.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, startNewOrder } from './duck/thunks.js';
import { selectAllOrders } from './duck/slice.js';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    Table,
    TableCell,
    TablePagination,
    Grid,
    Paper,
    Container
} from '@material-ui/core';
import { selectOrderStatus } from './duck/selectors.js';
import Loader from '../shared/components/Loader.js';
import ThemedButton from '../shared/buttons/ThemedButton.js';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3)
    },
    paper: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingTop: theme.spacing(1),
        minHeight: 800
    },
    row: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    header: {
        fontWeight: 'bold',
        color: theme.palette.tertiary['600']
    }
}));

const { newOrder, columns } = LANGUAGE.order.ordersOverview;

export default function OrderTableOverview() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const orders = useSelector(selectAllOrders);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const status = useSelector(selectOrderStatus);

    const mounted = useRef();
    useEffect(() => {
        if (orders.length === 0) {
            if (mounted.current !== status && status === 'IDLE') {
                dispatch(fetchOrders());
                mounted.current = status;
            }
        }
    }, [dispatch, status, orders]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onNewOrderClick = () => {
        dispatch(startNewOrder());
        history.push('/home/orders/create');
    }

    return (
        <Container className={ classes.container }>
            <Paper className={ classes.paper }>
                <Grid container>
                    <Grid container item justify="flex-end" xs={ 12 } className={ classes.row }>
                        <ThemedButton
                            onClick={ onNewOrderClick }
                            text={ newOrder }
                        />
                    </Grid>
                    <Grid item xs={ 12 } className={ classes.row }>
                        { status === 'PENDING' && <Loader/> }
                        { status === 'IDLE' &&
                        <>
                            <TableContainer>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell/>
                                            { columns && columns.map((col, index) =>
                                                <TableCell key={ index } align="center" className={ classes.header }>
                                                    { col }
                                                </TableCell>
                                            ) }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        { orders && orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((order, index) => <OrderTableRow key={ index } order={ order }/>)
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={ [10, 25, 100] }
                                component="div"
                                count={ orders.length }
                                rowsPerPage={ rowsPerPage }
                                page={ page }
                                onChangePage={ handleChangePage }
                                onChangeRowsPerPage={ handleChangeRowsPerPage }
                            /></> }
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}