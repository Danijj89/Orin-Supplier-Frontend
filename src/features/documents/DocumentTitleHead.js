import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    titleHead: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));


const DocumentTitleHead = React.memo(function DocumentTitleHead({add}){
    const classes = useStyles();
    return <Grid container item direction="column" alignContent="center" className={classes.titleHead}>
        <Typography align="center">{add.name}</Typography>
        <Typography
            align="center">{add.address + ', '} {add.address2 ? add.address2 + ', ' : ''} {add.city} </Typography>
        <Typography
            align="center">{add.zip ? add.zip + ', ' : ''} {add.administrative ? add.administrative + ', ' : ''} {add.country.label.en}</Typography>
    </Grid>
})

DocumentTitleHead.propTypes = {
    add: PropTypes.object,
}

export default DocumentTitleHead;