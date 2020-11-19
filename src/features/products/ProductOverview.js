import React from 'react';
import { Paper } from '@material-ui/core';
import NewProductButton from './NewProductButton.js';
import { useSelector } from 'react-redux';
import {
    selectProductsMap,
} from './duck/selectors.js';
import ProductTable from './ProductTable.js';
import { makeStyles } from '@material-ui/core/styles';
import { selectCompanyId } from '../home/duck/selectors.js';

const useStyles = makeStyles((theme) => ({
    productOverviewRoot: {
        margin: theme.spacing(2),
    },
}));

export default function ProductOverview() {
    const classes = useStyles();
    const products = useSelector(selectProductsMap);
    const companyId = useSelector(selectCompanyId);

    return (
        <Paper className={ classes.productOverviewRoot }>
            <NewProductButton companyId={ companyId }/>
            <ProductTable products={ products }/>
        </Paper>
    );
}
