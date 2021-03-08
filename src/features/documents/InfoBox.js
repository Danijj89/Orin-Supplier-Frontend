import React from 'react';
import PropTypes from 'prop-types';
import {Box, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    box: {
        marginLeft: theme.spacing(0.5)
    },
    tableBox: {
        height: '100%',
        padding: theme.spacing(0.2)
    }
}));


const InfoBox = React.memo(function InfoBox({label, value}) {
    const classes = useStyles();
    return <Box height="100%" border={1} borderColor="grey.main">
        <Typography component="div" variant="caption" style={{wordWrap: "break-word"}}>
            <Box fontWeight="fontWeightBold" lineHeight={1.2} className={classes.tableBox}>
                {label}
            </Box></Typography>
        <Typography component="div" display="inline" style={{wordWrap: "break-word"}}>
            <Box lineHeight={1.2} className={classes.tableBox}>
                {value}
            </Box>
        </Typography>
    </Box>
})

InfoBox.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,

}

export default InfoBox;