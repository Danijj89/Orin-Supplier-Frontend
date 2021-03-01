import React from 'react';
import PropTypes from 'prop-types';

const SalesContractPreview = React.memo(function SalesContractPreview({ document }) {

    return (
        <>Sales Contract Preview</>
    );
});

SalesContractPreview.propTypes = {
    document: PropTypes.object.isRequired
};

export default SalesContractPreview;