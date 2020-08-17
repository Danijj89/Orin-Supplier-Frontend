import React, { useEffect, useState } from 'react';
import { LANGUAGE } from '../../constants.js';
import OrderTableRow from './OrderTableRow.js';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, fetchOrders } from './duck/thunks.js';
import { selectAllOrders, startNewOrder } from './duck/slice.js';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TableContainer,
    TableHead,
    TableRow,
    TableBody,
    Table,
    TableCell,
    TablePagination,
    DialogTitle,
    DialogActions,
    Button,
    Dialog
} from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        maxHeight: '70vh'
    },
    header: {
        fontWeight: 'bold'
    },
    newOrderButton: {
        float: 'right'
    }
});

const { newOrder, columns, deleteOrderDialogMessage,
    deleteOrderDialogCancelButton, deleteOrderDialogConfirmButton } = LANGUAGE.order.OrdersOverview;

export default function OrderTableOverview() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const orders = useSelector(selectAllOrders);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onDialogOpen = (orderId) => {
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
        <div className="container-fluid h-100 p-5">
            <Button
                variant="outlined"
                className={classes.newOrderButton}
                onClick={onNewOrderClick}
            >{newOrder}</Button>
            <TableContainer className={classes.container}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>&nbsp;</TableCell>
                            {columns && columns.map((col, index) =>
                                <TableCell key={index} align="center" className={classes.header}>
                                    {col}
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders && orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((order, index) => <OrderTableRow key={index} order={order} onDialogOpen={onDialogOpen}/>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <Dialog onClose={onDialogClose} open={isDialogOpen}>
                <DialogTitle id="simple-dialog-title">{deleteOrderDialogMessage}</DialogTitle>
                <DialogActions>
                    <Button onClick={onDialogClose} color="primary" variant="outlined">
                        {deleteOrderDialogCancelButton}
                    </Button>
                    <Button onClick={handleDeleteRow} color="primary" variant="outlined">
                        {deleteOrderDialogConfirmButton}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}