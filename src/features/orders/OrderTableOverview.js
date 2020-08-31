import React, { useEffect, useRef, useState } from 'react';
import { LANGUAGE } from '../../constants.js';
import OrderTableRow from './OrderTableRow.js';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, fetchOrders } from './duck/thunks.js';
import { selectAllOrders, startNewOrder } from './duck/slice.js';
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
    DialogTitle,
    DialogActions,
    Button,
    Dialog,
    Grid,
    Paper,
    Container
} from '@material-ui/core';
import { selectPOStatus } from './duck/selectors.js';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3)
    },
    paper: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingTop: theme.spacing(1)
    },
    row: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    header: {
        fontWeight: 'bold',
        color: theme.palette.primary.dark
    },
    newOrderButton: {
        color: 'white',
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.light,
        '&:hover': {
            color: theme.palette.secondary.light,
            backgroundColor: 'white',
            borderColor: theme.palette.secondary.main,
        }
    }
}));

const {
    newOrder, columns, deleteOrderDialogMessage,
    deleteOrderDialogCancelButton, deleteOrderDialogConfirmButton
} = LANGUAGE.order.OrdersOverview;

export default function OrderTableOverview() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const orders = useSelector(selectAllOrders);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const status = useSelector(selectPOStatus);

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

    const onDialogOpen = (event, orderId) => {
        event.stopPropagation();
        setIsDialogOpen(true);
        setSelectedOrderId(orderId);
    }
    const onDialogClose = () => setIsDialogOpen(false);

    const handleDeleteRow = () => {
        dispatch(deleteOrder(selectedOrderId));
        onDialogClose();
    }

    const onNewOrderClick = () => {
        dispatch(startNewOrder());
        history.push('/home/orders/create');
    }

    return (
        <Container className={ classes.container }>
            <Paper className={ classes.paper }>
                <Grid container>
                    <Grid container item justify="flex-end" xs={ 12 } className={ classes.row }>
                        <Button
                            variant="outlined"
                            className={ classes.newOrderButton }
                            onClick={ onNewOrderClick }
                        >
                            { newOrder }
                        </Button>
                    </Grid>
                    { status === 'IDLE' &&
                    <Grid item xs={ 12 } className={ classes.row }>
                        <TableContainer>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell />
                                        { columns && columns.map((col, index) =>
                                            <TableCell key={ index } align="center" className={ classes.header }>
                                                { col }
                                            </TableCell>
                                        ) }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { orders && orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((order, index) => <OrderTableRow key={ index } order={ order }
                                                                              onDialogOpen={ onDialogOpen }/>)
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
                        />
                        <Dialog onClose={ onDialogClose } open={ isDialogOpen }>
                            <DialogTitle id="simple-dialog-title">{ deleteOrderDialogMessage }</DialogTitle>
                            <DialogActions>
                                <Button onClick={ onDialogClose } color="primary" variant="outlined">
                                    { deleteOrderDialogCancelButton }
                                </Button>
                                <Button onClick={ handleDeleteRow } color="primary" variant="outlined">
                                    { deleteOrderDialogConfirmButton }
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                    }
                </Grid>
            </Paper>
        </Container>
    )
}