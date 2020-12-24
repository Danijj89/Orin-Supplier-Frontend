import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { LANGUAGE } from 'app/utils/constants.js';

const {
    includeLabel
} = LANGUAGE.shared.components.table.tools.archive;

const ArchiveSelector = React.memo(function ArchivedCheckbox({ options }) {
    const { fetchData, fetchArchivedData } = options;
    const [includeArchived, setIncludeArchived] = useState(false);
    const onChange = useCallback(
        (e) => {
            const { checked } = e.target;
            if (checked) fetchArchivedData();
            else fetchData();
            setIncludeArchived(checked);
        }, [fetchData, fetchArchivedData])

    return (
        <FormControlLabel
            control={ <Checkbox color="primary"/> }
            label={ includeLabel }
            labelPlacement="end"
            onChange={ onChange }
            checked={ includeArchived }
        />
    );
});

ArchiveSelector.propTypes = {
    options: PropTypes.exact({
        fetchData: PropTypes.func.isRequired,
        fetchArchivedData: PropTypes.func.isRequired
    }).isRequired
};

export default ArchiveSelector;