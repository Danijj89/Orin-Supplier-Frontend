import React from 'react';
import Grid from '@material-ui/core/Grid';
import DownloadButton from '../shared/buttons/DownloadButton.js';
import DocumentGenerationButton from '../shared/buttons/DocumentGenerationButton.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    gridContainer: {
        minHeight: 600,
        height: '50%',
        padding: '3% 0'
    },
    sideButton: {
        marginBottom: '5%',
        width: '80%',
        minHeight: 50
    },
    preview: {
        width: '100%',
        height: '100%'
    }
})

export default function OrderDetails({ order, preview }) {
    const classes = useStyles();
    return (
        <Grid
            container
            className={ classes.gridContainer }
        >
            <Grid
                item
                xs={ 9 }
            >
                <iframe
                    className={ classes.preview }
                    title='Order Details'
                    src={ preview }
                />
            </Grid>
            <Grid
                container
                item
                direction="column"
                justify="flex-start"
                alignItems="center"
                xs={ 3 }
            >
                { order && <DownloadButton styles={ classes.sideButton } fileName={ order.fileName }/> }
                { order && <DocumentGenerationButton styles={ classes.sideButton } order={ order }/> }
            </Grid>
        </Grid>
    )
}