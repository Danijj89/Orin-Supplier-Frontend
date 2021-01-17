import React, { useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import NavTabs from '../shared/components/NavTabs.js';
import { LANGUAGE } from 'app/utils/constants.js';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import LeadDetails from './LeadDetails.js';
import LeadAddresses from './LeadAddresses.js';

const {
    tabsLabelsMap
} = LANGUAGE.lead.lead;

const Lead = React.memo(function Lead() {
    const history = useHistory();
    const location = useLocation();
    const { id: leadId } = useParams();
    const { tab } = queryString.parse(location.search);
    const tabValue = tab || 'details';

    const onTabChange = useCallback(
        (newValue) => history.push(`/home/leads/${ leadId }?tab=${ newValue }`),
        [history, leadId]);

    return (
        <Paper>
            <NavTabs
                tabsLabelsMap={ tabsLabelsMap }
                tabValue={ tabValue }
                onChange={ onTabChange }
            />
            { tabValue === 'details' &&
            <LeadDetails leadId={ leadId }/>
            }
            { tabValue === 'addresses' &&
            <LeadAddresses leadId={ leadId }/>
            }
        </Paper>
    )
});

export default Lead;