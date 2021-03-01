import React from 'react';
import PropTypes from 'prop-types';

const ChinaExportPreview = React.memo(function ChinaExportPreview({ document }) {

    return (
        <>China Export Preview</>
    );
});

ChinaExportPreview.propTypes = {
    document: PropTypes.object.isRequired
};

export default ChinaExportPreview;