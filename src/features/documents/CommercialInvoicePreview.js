import React from 'react';
import PropTypes from 'prop-types';

const CommercialInvoicePreview = React.memo(function CommercialInvoicePreview({ document }) {

    return (
        <>Commercial Invoice Preview</>
    );
});

CommercialInvoicePreview.propTypes = {
    document: PropTypes.object.isRequired
};

export default CommercialInvoicePreview;