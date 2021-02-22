
export const getLeadURL = leadId => {
    if (!leadId) throw new Error('Lead ID required to get its URL.');
    return `/home/leads/${leadId}`;
}