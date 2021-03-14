import React, { useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import NewLeadButton from './NewLeadButton.js';
import LeadsTable from './LeadsTable.js';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import SearchBar from 'features/shared/components/SearchBar.js';
import { useSelector } from 'react-redux';
import { selectAllLeads } from 'features/leads/duck/selectors.js';
import { getLeadURL } from 'features/leads/utils/urls.js';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: theme.spacing(2),
    },
    topRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(2)
    },
    button: {
        marginRight: theme.spacing(1)
    }
}));

const LeadOverview = React.memo(function LeadOverview() {
    const classes = useStyles();
    const leads = useSelector(selectAllLeads);

    const getUrl = useCallback(lead => getLeadURL(lead._id), []);

    const getOptionLabel = useCallback(
        lead => `${ lead.name }${ lead.contact?.name ? ` - ${ lead.contact.name }` : '' }`,
        []);

    return (
        <Paper className={ classes.container }>
            <Box className={ classes.topRow }>
                <NewLeadButton className={classes.button}/>
                <SearchBar
                    options={ leads }
                    getOptionLabel={ getOptionLabel }
                    getOptionSelected={ (lead, value) => lead._id === value._id }
                    getUrl={ getUrl }
                />
            </Box>
            <LeadsTable/>
        </Paper>
    );
});

export default LeadOverview;
