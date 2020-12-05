import React from 'react';
import Paper from '@material-ui/core/Paper';
import NewLeadButton from './NewLeadButton.js';
import LeadsTable from './LeadsTable.js';

const LeadOverview = React.memo(function LeadOverview() {

    return (
        <Paper>
            <NewLeadButton />
            <LeadsTable />
        </Paper>
    )
});

export default LeadOverview;