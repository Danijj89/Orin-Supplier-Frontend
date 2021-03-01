import React from 'react';
import PropTypes from 'prop-types';

const PackingListPreview = React.memo(function PackingListPreview({ document }) {

    return (
        <>Packing List Preview</>
    );
});

PackingListPreview.propTypes = {
    document: PropTypes.object.isRequired
};

export default PackingListPreview;