import React from 'react';
import Paper from '@material-ui/core/Paper';
import NewLeadButton from './NewLeadButton.js';
import LeadsTable from './LeadsTable.js';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(2),
    },
}));

const LeadOverview = React.memo(function LeadOverview() {
    const classes = useStyles();

    return (
        <Paper className={classes.container}>
            <NewLeadButton />
            <LeadsTable />
        </Paper>
    );
});

export default LeadOverview;
