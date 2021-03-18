export const getLeadURL = leadId => {
    if (!leadId) throw new Error('Lead ID required to get its URL.');
    return `/home/leads/${ leadId }`;
}

export const getLeadTableFiltersFromURL = queryParams => {
    const filters = {};
    if ('salesStatus' in queryParams) filters.salesStatus = queryParams.salesStatus.split(',').map(id => parseInt(id, 10)
    );
    if ('leadType' in queryParams) filters.leadType = queryParams.leadType.split(',');
    if ('source' in queryParams) filters.source = queryParams.source;
    if ('quotation' in queryParams) filters.quotation = queryParams.quotation.split(',');
    if ('sample' in queryParams) filters.sample = queryParams.sample.split(',');
    if ('lastContact' in queryParams) filters.lastContact = queryParams.lastContact.split(',');
    if ('assignedTo' in queryParams) filters.assignedTo = queryParams.assignedTo.split(',');

    return filters;
};

export const getLeadsTableURL = filters =>
    filters.reduce((acc, filter) =>
        `${ acc }&${ filter.field }=${ Array.isArray(filter.value)
            ? filter.value.join(',')
            : filter.value }`, '/home/leads?');