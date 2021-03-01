import React from 'react';
import PropTypes from 'prop-types';
import CommercialInvoicePreview from 'features/documents/CommercialInvoicePreview.js';
import PackingListPreview from 'features/documents/PackingListPreview.js';
import SalesContractPreview from 'features/documents/SalesContractPreview.js';
import ChinaExportPreview from 'features/documents/ChinaExportPreview.js';

const DocumentPreview = React.memo(function DocumentPreview({ document }) {
    const { type } = document;
    return (
        <>
            { type.id === 'CI' && <CommercialInvoicePreview document={ document }/> }
            { type.id === 'PL' && <PackingListPreview document={ document }/> }
            { type.id === 'SC' && <SalesContractPreview document={ document }/> }
            { type.id === 'CE' && <ChinaExportPreview document={ document }/> }
        </>
    );
});

DocumentPreview.propTypes = {
    document: PropTypes.shape({
        type: PropTypes.shape({
            id: PropTypes.oneOf(['CI', 'PL', 'SC', 'CE']).isRequired
        }).isRequired
    }).isRequired
};

export default DocumentPreview;