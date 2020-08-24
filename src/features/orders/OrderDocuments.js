import React, { useState } from 'react';
import {
    Grid,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    Typography,
    TableBody,
    TableContainer,
    Table,
    Button, Dialog, DialogTitle, DialogActions
} from '@material-ui/core';
import IconDelete from '@material-ui/icons/Delete';
import DocumentGenerationButton from '../shared/buttons/DocumentGenerationButton.js';
import { LANGUAGE } from '../../constants.js';
import { makeStyles } from '@material-ui/core/styles';
import { yymmddToLocaleDate } from '../shared/utils.js';
import CIService from '../commercial_invoice/services.js';

const { tableTitle, tableHeaders, docTypeMap,
    deleteDocumentMessage, deleteDocumentButtonCancel, deleteDocumentButtonConfirm } = LANGUAGE.order.orderDocuments;

const useStyles = makeStyles({
    row: {
        marginTop: '3%'
    },
    tableContainer: {
        padding: '2% 1%'
    },
    generateButton: {
        margin: 16
    },
    header: {
        fontWeight: 'bold'
    }
})

const headers = [
    { align: 'left', label: tableHeaders[0] },
    { align: 'left', label: tableHeaders[1] },
    { align: 'right', label: tableHeaders[2] }
];

export default function OrderDocuments({ order }) {
    const classes = useStyles();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const onDialogOpen = () => setIsDialogOpen(true);
    const onDialogClose = () => setIsDialogOpen(false);

    const onDeleteClick = async (docType, docId) => {
        switch(docType) {
            case 'CI':
                await CIService.deleteCI(docId);
                break;
            default: alert('There was some error deleting the document. Please try again later.');
        }
        setIsDialogOpen(false);
    }

    return (
        <Grid container>
            <Grid
                container
                className={ classes.row }
                justify="flex-end"
                item
                xs={ 12 }
            >
                <DocumentGenerationButton orderId={ order._id } styles={ classes.generateButton }/>
            </Grid>
            <Grid className={ classes.row } item xs={ 12 }>
                <Paper className={ classes.tableContainer }>
                    <Typography variant="h6">{ tableTitle }</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox"/>
                                    { headers.map((header, index) => {

                                        return <TableCell
                                            key={ index }
                                            align={ header.align }
                                            className={ classes.header }
                                        >
                                            { header.label }
                                        </TableCell>
                                    }) }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { order && Object.entries(order.documents).map(([docType, doc]) => (
                                    <TableRow key={docType}>
                                        <TableCell padding="checkbox">
                                            <Button
                                                onClick={onDialogOpen}
                                                size="small"
                                            >
                                                <IconDelete />
                                            </Button>
                                            <Dialog onClose={onDialogClose} open={isDialogOpen}>
                                                <DialogTitle>{deleteDocumentMessage}</DialogTitle>
                                                <DialogActions>
                                                    <Button onClick={onDialogClose} variant="outlined">
                                                        {deleteDocumentButtonCancel}
                                                    </Button>
                                                    <Button onClick={() => onDeleteClick(docType, doc._id)} variant="outlined">
                                                        {deleteDocumentButtonConfirm}
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                            </TableCell>
                                        <TableCell align={ headers[0].align }>{docTypeMap[docType]}</TableCell>
                                        <TableCell align={ headers[1].align }>{doc.createdBy.name}</TableCell>
                                        <TableCell align={ headers[2].align }>{yymmddToLocaleDate(doc.date)}</TableCell>
                                    </TableRow>
                                )) }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
        </Grid>
    )
}