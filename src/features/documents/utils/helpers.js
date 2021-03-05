import React from 'react';
import { Grid, Box, Typography} from '@material-ui/core';
import { format } from 'date-fns';

import { makeStyles } from '@material-ui/core/styles';

const docTableHeaders = {
        'CI' : ['Item Ref', 'Product Description', 'Quantity', 'Unit', 'Unit price', 'Amount'],
        'PL' : ['Item Ref', 'Product Description', 'Packing', 'Unit', 'Net wt', 'Gross wt', 'Dimension'],
        'SC' : ['Product | 产品', 'Quantity | 数量', 'Unit price | 单价', 'Amount | 金额'],
}

const docHeaderSizes = {
        'CI' : [2,3,2,1,2,2],
        'PL' : [2,4,2,1,1,1,1],
        'SC' : [3,3,3,3]
}

const docKeys = {
        'CI' : ['ref','description', 'quantity', 'unit', 'price', 'total'],
        'PL' : ['ref','description', 'package', 'pUnit', 'netW', 'grossW', 'dim'],
        'SC' : ['description', 'quantity', 'price', 'total'],
}

const useStyles = makeStyles((theme) => ({
    titleHead: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    band: {
      padding: theme.spacing(1)
    },
    box: {
      marginLeft: theme.spacing(0.5)
    }, 
    footer: {
      margin: theme.spacing(2)
    },
    totals: {
      marginTop: theme.spacing(1)
    },
}));


export function GenerateTitleHead(add) {
   const classes = useStyles();
  return <Grid container item direction = "column" alignContent="center"  className={classes.titleHead}>
            <Typography align="center">{add.name}</Typography>
            <Typography align="center">{add.address + ', '} {add.address2? add.address2 + ', ' : ''} {add.city} </Typography>
            <Typography align="center">{add.zip? add.zip + ', ' : ''} {add.administrative? add.administrative + ', ' : '' } {add.country.label.en}</Typography>
          </Grid>
}

export function GenerateDocBand(createdAt, type, ref) {
  const classes = useStyles();
  return <Box bgcolor="grey.main" className={classes.band}>
            <Grid container item direction="row"
              justify="space-between"
              alignItems="center">
            <Box color="white.main" >Date: {format(new Date(Date.parse(createdAt)), 'MMM d , yyy')}</Box>
            <Box color="white.main" >{type.label.en}</Box>
            <Box color="white.main" >Doc No.:{ref}</Box>
          </Grid>
          </Box>
}

export function GenerateAddress(label, add) {
  const classes = useStyles();
  return <Grid item xs={12} sm={6} >
          <Box border={1} borderColor="grey.main">
            <Grid container direction="row">
            <Grid item xs={3}>
                <Typography component="div" className={classes.box} variant="subtitle1">    
                  <Box fontWeight="fontWeightBold" lineHeight={1.2} >
                    {label}
                  </Box>
              </Typography>
            </Grid>
            <Grid item xs={9}>
            <Typography component="div" className={classes.box}>
              <Box lineHeight={1.2} borderColor="grey.main">
                <Grid container item direction = "column">
                  <Typography>{add.name}</Typography>
                  <Typography>{add.address + ', '} {add.address2? add.address2 + ', ' : ''} {add.city} </Typography>
                  <Typography>{add.zip? add.zip + ', ' : ''} {add.administrative? add.administrative + ', ' : '' } {add.country.label.en}</Typography>
                </Grid>
              </Box>
            </Typography>
            </Grid>
            </Grid>
          </Box>  
          </Grid>
}

export function InfoBox(label, value) {
  const classes = useStyles();
  return <Box height="100%" border={1} borderColor="grey.main">
            <Typography component="div" className={classes.box} variant="caption"> 
              <Box fontWeight="fontWeightBold" lineHeight={1.2} >
                {label}
              </Box></Typography>
            <Typography component="div" className={classes.box}>
              <Box lineHeight={1.2}>
                {value}
                </Box>
            </Typography>
          </Box>  
}

export function InfoBoxLong(label1, value1, label2, value2) {
  const classes = useStyles();
  return <Grid container>
          <Grid item xs={2}>
            <Box height="100%" border={1} borderColor="grey.main">
                <Typography component="div" className={classes.box} variant="caption">
                    {label1}
                </Typography>
              </Box>
          </Grid>
           <Grid item xs={3}>
            <Box height="100%" border={1} borderColor="grey.main">
                <Typography component="div" className={classes.box} variant="caption">
                    {value1}
                </Typography>
              </Box>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}>
            <Box height="100%" border={1} borderColor="grey.main">
                <Typography component="div" className={classes.box} variant="caption">
                    {label2}
                </Typography>
              </Box>
          </Grid>
           <Grid item xs={3}>
            <Box height="100%" border={1} borderColor="grey.main">
                <Typography component="div" className={classes.box} variant="caption">
                    {value2}
                </Typography>
              </Box>
          </Grid>
        </Grid>
}

export function GenerateEqualFooter(label1, text1, label2, text2) {
  const classes = useStyles();
  return <Grid container className={classes.footer}>
        <Grid item xs={"auto"}></Grid>
        <Grid item xs={4} >
           <Box height="100%" border={1} borderColor="grey.main" >
            <Typography component="div" className={classes.box} variant="caption" align="center"> 
              <Box fontWeight="fontWeightBold" lineHeight={1.2} >
                {label1}
              </Box>
            </Typography>
            <Typography component="div" className={classes.box} align="center">
                {text1}
            </Typography>
          </Box>  
        </Grid>
        <Grid item xs={2}></Grid>
         <Grid item xs={4}>
           <Box height="80px" border={1} borderColor="grey.main">
            <Typography component="div" className={classes.box} variant="caption" align="center"> 
              <Box fontWeight="fontWeightBold" lineHeight={1.2} >
                {label2}
              </Box>
              </Typography>
            <Typography component="div" className={classes.box} align="center">
                {text2}
            </Typography>
          </Box>  
        </Grid>
        <Grid item xs={"auto"}></Grid>
       
        </Grid>
}

export function GenerateFooter(label, text) {
  const classes = useStyles();
  return <Grid container className={classes.footer}>
        <Grid item xs={"auto"}></Grid>
        <Grid item xs={5} >
           <Box height="100%" border={1} borderColor="grey.main" >
            <Typography component="div" className={classes.box} variant="caption"> 
              <Box fontWeight="fontWeightBold" lineHeight={1.2} >
                {label}
              </Box></Typography>
            <Typography component="div" className={classes.box}>
                {text}
            </Typography>
          </Box>  
        </Grid>
        <Grid item xs={2}></Grid>
         <Grid item xs={4}>
           <Box height="60px" border={1} borderColor="grey.main">
            <Typography component="div" className={classes.box} variant="caption"> 
              <Box fontWeight="fontWeightBold" lineHeight={1.2} >
                Company Chop
              </Box></Typography>
            <Typography component="div" className={classes.box}>
            </Typography>
          </Box>  
        </Grid>
        <Grid item xs={"auto"}></Grid>
       
        </Grid>
}

export function GenerateTable(type, items, custom1, custom2, currency) {
  const classes = useStyles();
  let localHeaders = [...docTableHeaders[type]];
  let localSizes = [...docHeaderSizes[type]];
  let localKeys = [...docKeys[type]];

  if (custom1) {
    localHeaders.splice(2,0,custom1);
    localSizes.splice(2,0,1);
    localSizes[1] = 2;
    localKeys.splice(2,0, "custom1")
  }
  if (custom2) {
    localHeaders.splice(3,0,custom2);
    localSizes.splice(3,0,1);
    localSizes[6] = 1;
    localKeys.splice(3,0, "custom2")
  }

  let actualHeaders = []
  localHeaders.forEach((item, index) => {
    actualHeaders.push(
      <Grid item xs={localSizes[index]} key={index+'head'}>
      <Box bgcolor="grey.light" border={1} borderColor="grey.main"  fontWeight="fontWeightBold">
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
        <Grid item xs={localSizes[index]} key={index+'unit'}>
          <Box border={1} borderColor="grey.light">
            <Typography className={classes.box} variant="caption">
              {item[key].id}
            </Typography>
          </Box>
        </Grid>)
      } else if (key === 'price' || key === 'total') {
        itemRow.push(
        <Grid item xs={localSizes[index]} key={index+'price'}>
          <Box border={1} borderColor="grey.light">
            <Typography className={classes.box} variant="caption">
              {currency.symbol + ' ' + item[key]}
            </Typography>
          </Box>
        </Grid>)
      } else {
        itemRow.push(
        <Grid item xs={localSizes[index]} key={index+'a'}>
          <Box border={1} borderColor="grey.light">
            <Typography className={classes.box} variant="caption">
              {item[key]}
            </Typography>
          </Box>
        </Grid>
        )
      }
    })
    itemRows.push(
      <Grid container key={index+'cont'}>
        {itemRow}
      </Grid>
    )
  })

  if (itemRows.length < 3) {
    for(let i = itemRows.length; i < 3; i++) {
  // Do Stuff
      itemRows.push(
      <Grid container key={i+'empty'} >
        <Grid item xs={12} >
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
            {/* {totals} */}
        </Grid>
}

export function GenerateCITotal(quantity, total, currency) {
    const classes = useStyles();
    let totals = []
    let quantityString = ""
    for (const [key, value] of Object.entries(quantity)) {
        quantityString += `${key}: ${value} `
    }
    totals.push(
      <Grid container key={'totals'} className={classes.totals}>
      <Grid item xs={6}></Grid>
      <Grid item xs={1}>
      <Box fontWeight="fontWeightBold">
        <Typography className={classes.box} variant="subtitle2">
          Total
        </Typography></Box>
      </Grid>
      <Grid item xs={2}>
      <Box fontWeight="fontWeightBold">
        <Typography className={classes.box} variant="subtitle2">
          {quantityString}
        </Typography></Box>
      </Grid>
       <Grid item xs={1}></Grid>
      <Grid item xs={2}>
      <Box fontWeight="fontWeightBold">
        <Typography className={classes.box} variant="subtitle2">
          {currency.symbol + ' ' + total}
        </Typography></Box>
      </Grid>
      </Grid>
    )

    return <Grid>{totals}</Grid>
  }

  export function GeneratePLTotal(quantity, netWeight, grossWeight, dimension) {
    const classes = useStyles();
    let totals = []
    let quantityString = ""
    for (const [key, value] of Object.entries(quantity)) {
        quantityString += `${key}: ${value} `
    }
    totals.push(
      <Grid container key={'totals'} className={classes.totals}>
      <Grid item xs={6}></Grid>
      <Grid item xs={2}>
      <Box fontWeight="fontWeightBold">
        <Typography className={classes.box} variant="subtitle2">
          {'Total: ' + quantityString}
        </Typography></Box>
      </Grid>
       <Grid item xs={1}></Grid>
      <Grid item xs={1}>
      <Box fontWeight="fontWeightBold">
        <Typography className={classes.box} variant="subtitle2">
          {netWeight + 'kg'}
        </Typography></Box>
      </Grid>
      <Grid item xs={1}>
      <Box fontWeight="fontWeightBold">
        <Typography className={classes.box} variant="subtitle2">
          {grossWeight + 'kg'}
        </Typography></Box>
      </Grid>
      <Grid item xs={1}>
      <Box fontWeight="fontWeightBold">
        <Typography className={classes.box} variant="subtitle2">
          {dimension + 'cbm'}
        </Typography></Box>
      </Grid>
      </Grid>
    )

    return <Grid>{totals}</Grid>
  }
