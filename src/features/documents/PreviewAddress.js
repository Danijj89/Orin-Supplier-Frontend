import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Typography} from "@material-ui/core";



const PreviewAddress = React.memo(function PreviewAddress({add}) {
    return <Grid container item direction="column">
        <Typography>{add.name}</Typography>
        <Typography>{add.address + ', '} {add.address2 ? add.address2 + ', ' : ''} {add.city} </Typography>
        <Typography>{add.zip ? add.zip + ', ' : ''} {add.administrative ? add.administrative + ', ' : ''} {add.country.label.en}</Typography>
    </Grid>

})

PreviewAddress.propTypes = {
    add: PropTypes.object,

}

export default PreviewAddress;