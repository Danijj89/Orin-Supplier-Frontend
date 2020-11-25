import React from 'react';
import { Paper } from '@material-ui/core';
import NewProductButton from './NewProductButton.js';
import ProductTable from './ProductTable.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    productOverviewRoot: {
        margin: theme.spacing(2),
    },
}));

const ProductOverview = React.memo(function ProductOverview() {
    const classes = useStyles();

    return (
        <Paper className={ classes.productOverviewRoot }>
            <NewProductButton />
            <ProductTable />
        </Paper>
    );
});

export default ProductOverview;
