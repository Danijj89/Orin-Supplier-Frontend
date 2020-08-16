import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LANGUAGE } from '../../constants.js';
import OrderTableRow from './OrderTableRow.js';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, fetchOrders } from './duck/thunks.js';
import { selectAllOrders } from './duck/slice.js';
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
    }
});

const { newOrder, columns, deleteOrderDialogMessage,
    deleteOrderDialogCancelButton, deleteOrderDialogConfirmButton } = LANGUAGE.OrdersOverview;

export default function OrderTableOverview() {
    const classes = useStyles();
    const dispatch = useDispatch();
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

    return (
        <div className="container-fluid h-100 p-5">
            <Link to="/home/orders/create" className="btn btn-primary my-2 float-right">{newOrder}</Link>
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