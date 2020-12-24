import React from 'react';
import PropTypes from 'prop-types';
import Permission from './Permission.js';

const PRODUCT_RESOURCE = 'product';

const ProductPermission = React.memo(function ProductPermission(
    { action = [], children }) {

    return (
        <Permission resource={ PRODUCT_RESOURCE } action={ action } isOwner={ true }>
            { children }
        </Permission>
    );
});

ProductPermission.propTypes = {
    action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired,
    children: PropTypes.node.isRequired
};

export default ProductPermission;