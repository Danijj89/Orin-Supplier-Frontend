import React from 'react';
import PropTypes from 'prop-types';
import {Box, Grid, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    tableBox: {
        height: '100%',
        padding: theme.spacing(0.2)
    }
}));

const docTableHeaders = {
    'CI': ['Item Ref', 'Product Description', 'Quantity', 'Unit', 'Unit price', 'Amount'],
    'PL': ['Item Ref', 'Product Description', 'Packing', 'Unit', 'Net wt', 'Gross wt', 'Dimension'],
    'SC': ['Product | 产品', 'Quantity | 数量', 'Unit price | 单价', 'Amount | 金额'],
    'CE': ['项号', '商品编号', ' 品名', '数量单位', '单价', '总价', '币制', '原产国', '目的国', '货源地', '征免',],
}

const docHeaderSizes = {
    'CI': [2, 3, 2, 1, 2, 2],
    'PL': [2, 4, 2, 1, 1, 1, 1],
    'SC': [3, 3, 3, 3],
    'CE': [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
}

const docKeys = {
    'CI': ['ref', 'description', 'quantity', 'unit', 'price', 'total'],
    'PL': ['ref', 'description', 'package', 'pUnit', 'netW', 'grossW', 'dim'],
    'SC': ['description', 'quantity', 'price', 'total'],
    'CE': ['', 'hsc', 'localD', 'quantity', 'price', 'total', 'currency', 'coo', 'fdc', 'dop', ''],
}


const DocumentTable = React.memo(function DocumentTable({type, items, custom1, custom2, currency}) {
    const classes = useStyles();
    let localHeaders = [...docTableHeaders[type]];
    let localSizes = [...docHeaderSizes[type]];
    let localKeys = [...docKeys[type]];

    if (custom1) {
        localHeaders.splice(2, 0, custom1);
        localSizes.splice(2, 0, 1);
        localSizes[1] = 2;
        localKeys.splice(2, 0, "custom1")
    }
    if (custom2) {
        localHeaders.splice(3, 0, custom2);
        localSizes.splice(3, 0, 1);
        localSizes[6] = 1;
        localKeys.splice(3, 0, "custom2")
    }

    let actualHeaders = []
    localHeaders.forEach((item, index) => {
        actualHeaders.push(
            <Grid item xs={localSizes[index]} key={index + 'head'}>
                <Box bgcolor="grey.light" border={1} borderColor="grey.main" fontWeight="fontWeightBold">
                    <Typography className={classes.box} variant="caption">
                        {item}
                    </Typography></Box>
            </Grid>
        )
    })

    let itemRows = []
    items.forEach((item, index) => {
        let itemRow = []
        localKeys.forEach((key, index) => {
            if (key === 'unit' || key === 'pUnit') {
                itemRow.push(
                    <Grid item xs={localSizes[index]} key={index + 'unit'}>
                        <Box border={1} borderColor="grey.light" className={classes.tableBox}>
                            <Typography className={classes.box} display="inline" variant="caption"
                                        style={{wordWrap: "break-word"}}>
                                {item[key].id}
                            </Typography>
                        </Box>
                    </Grid>)
            } else if (key === 'price' || key === 'total') {
                itemRow.push(
                    <Grid item xs={localSizes[index]} key={index + 'price'}>
                        <Box border={1} borderColor="grey.light" className={classes.tableBox}>
                            <Typography variant="caption" display="inline" style={{wordWrap: "break-word"}}>
                                {currency ? currency.symbol + ' ' + item[key] : item[key]}
                            </Typography>
                        </Box>
                    </Grid>)
            } else if (key === 'coo' || key === 'fdc' || key === 'currency') {
                itemRow.push(
                    <Grid item xs={localSizes[index]} key={index + 'price'}>
                        <Box border={1} borderColor="grey.light" className={classes.tableBox}>
                            <Typography variant="caption" display="inline" style={{wordWrap: "break-word"}}>
                                {item[key].label.zh}
                            </Typography>
                        </Box>
                    </Grid>)
            } else {
                itemRow.push(
                    <Grid item xs={localSizes[index]} key={index + 'a'}>
                        <Box border={1} borderColor="grey.light" className={classes.tableBox}>
                            <Typography display="inline" variant="caption" style={{wordWrap: "break-word"}}>
                                {item[key]}
                            </Typography>
                        </Box>
                    </Grid>
                )
            }
        })
        itemRows.push(
            <Grid container key={index + 'cont'}>
                {itemRow}
            </Grid>
        )
    })

    if (itemRows.length < 3) {
        for (let i = itemRows.length; i < 3; i++) {
            // Do Stuff
            itemRows.push(
                <Grid container key={i + 'empty'}>
                    <Grid item xs={12}>
                        <Box border={1}>
                            <Typography className={classes.box} variant="caption">
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            )
        }
    }

    return <Grid container direction="row">
        {actualHeaders}
        {itemRows}
    </Grid>
})

DocumentTable.propTypes = {
    type: PropTypes.string,
    items: PropTypes.object,
    custom1: PropTypes.string,
    custom2: PropTypes.string,
    currency: PropTypes.object,
}

export default DocumentTable;