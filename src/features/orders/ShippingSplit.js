import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { dateToLocaleDate } from 'features/shared/utils/format.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        backgroundColor: theme.palette.backgroundSecondary.main
    },
    left: {
        minWidth: 140,
        minHeight: 140,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: theme.spacing(4)
    },
    right: {
        flex: 1
    }
}))

const {
    labels
} = LANGUAGE.order.order.shippingPlan.shippingSplits;

const ShippingSplit = React.memo(function ShippingSplit(
    { split, splitNum }) {
    const classes = useStyles();

    return (
        <>
            <Typography>{ split.ref }</Typography>
            <Box className={ classes.container }>
                <Box className={ classes.left }>
                    <Avatar>{ splitNum }</Avatar>
                    <Typography>{ labels.crd }</Typography>
                    <Typography>{ dateToLocaleDate(split.crd) }</Typography>
                </Box>
                <TableContainer className={ classes.right }>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
});

ShippingSplit.propTypes = {
    split: PropTypes.object.isRequired
};

export default ShippingSplit;