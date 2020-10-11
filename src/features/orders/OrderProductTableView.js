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
import { getCurrencySymbol } from '../shared/utils/random.js';
import { makeStyles } from '@material-ui/core/styles';
import { LANGUAGE } from '../../constants.js';

const useStyles = makeStyles((theme) => ({
    header: {
        fontWeight: 'bold',
        color: theme.palette.tertiary['600']
    }
}));

const { totalsLabel } = LANGUAGE.order.orderProductTable;

export default function OrderProductTableView({ headers, items, currency, totalQ, totalA }) {
    const classes = useStyles();

    const numHeaders = headers.reduce((acc, header) => header ? acc + 1: acc, 0);
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
                            <TableCell>{ item.ref }</TableCell>
                            <TableCell>{ item.description }</TableCell>
                            { headers[2] && <TableCell>{ item.custom1 }</TableCell> }
                            { headers[3] && <TableCell>{ item.custom2 }</TableCell> }
                            <TableCell>{ `${ item[4] } ${ item[5] }` }</TableCell>
                            <TableCell>{ `${ getCurrencySymbol(currency) } ${ item[6] }` }</TableCell>
                            <TableCell>{ `${ getCurrencySymbol(currency) } ${ item[7] }` }</TableCell>
                        </TableRow>)
                    }
                    <TableRow>
                        <TableCell colSpan={ numHeaders - 3 } padding="none">
                        </TableCell>
                        <TableCell align="right">{ totalsLabel }</TableCell>
                        <TableCell align="right" className={ classes.totals }>{ totalQ.stringRep }</TableCell>
                        <TableCell colSpan={2} align="right" className={ classes.totals }>{ `${getCurrencySymbol(currency)} ${totalA}` }</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}