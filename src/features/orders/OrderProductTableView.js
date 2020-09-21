import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import { getCurrencySymbol } from '../shared/utils.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        fontWeight: 'bold',
        color: theme.palette.tertiary['600']
    }
}));

export default function OrderProductTableView({ headers, items, currency }) {
    const classes = useStyles();

    const renderedHeaders = headers.map((header) => {
        if (!header) return null;
        else return <TableCell className={ classes.header } key={ header }>{ header }</TableCell>;
    });

    return (
        <TableContainer>
            <Typography>{}</Typography>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        { renderedHeaders }
                    </TableRow>
                </TableHead>
                <TableBody>
                    { items.map((item, idx) =>
                        <TableRow key={ idx }>
                            <TableCell>{ item[0] }</TableCell>
                            <TableCell>{ item[1] }</TableCell>
                            { headers[2] && <TableCell>{ item[2] }</TableCell> }
                            { headers[3] && <TableCell>{ item[3] }</TableCell> }
                            <TableCell>{ `${ item[4] } ${ item[5] }` }</TableCell>
                            <TableCell>{ `${ getCurrencySymbol(currency) } ${ item[6] }` }</TableCell>
                            <TableCell>{ `${ getCurrencySymbol(currency) } ${ item[7] }` }</TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}