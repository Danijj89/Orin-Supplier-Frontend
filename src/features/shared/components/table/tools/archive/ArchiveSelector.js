import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { LANGUAGE } from 'app/utils/constants.js';
import useSessionStorage from 'features/shared/hooks/useSessionStorage.js';

const {
    includeLabel
} = LANGUAGE.shared.components.table.tools.archive;

const ArchiveSelector = React.memo(function ArchivedCheckbox({ options }) {
    const { sessionKey, fetchData, fetchArchivedData } = options;
    const [includeArchived, setIncludeArchived] = useSessionStorage(sessionKey, false);
    const onChange = useCallback(
        (e) => {
            const { checked } = e.target;
            if (checked) fetchArchivedData();
            else fetchData();
            setIncludeArchived(checked);
        }, [fetchData, fetchArchivedData, setIncludeArchived]);

    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current && includeArchived) {
            fetchArchivedData();
        }
        mounted.current = true;
    }, [includeArchived, fetchArchivedData]);

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
        sessionKey: PropTypes.string.isRequired,
        fetchData: PropTypes.func.isRequired,
        fetchArchivedData: PropTypes.func.isRequired
    }).isRequired
};

export default ArchiveSelector;