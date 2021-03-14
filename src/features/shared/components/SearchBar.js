import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { Search as IconSearch } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 180,
        maxWidth: 480,
        backgroundColor: theme.palette.backgroundPrimary.main,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 4,
        borderColor: theme.palette.grey.light,
        '&.Mui-focused': {
            borderColor: theme.palette.primary.main,
        },
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(0.2)
    }
}));

const SearchBar = React.memo(function SearchBar({ options, getOptionLabel, getOptionSelected, getUrl, className }) {
    const classes = useStyles();
    const [searchText, setSearchText] = useState(null);
    const history = useHistory();

    const onSubmit = useCallback(() => {
        if (searchText) history.push(getUrl(searchText));
    }, [history, getUrl, searchText]);

    const onSearchTextChange = useCallback(
        (_, data) => setSearchText(data),
        []);

    const onKeyUp = useCallback(e => {
        if (e.key === 'Enter') onSubmit();
    }, [onSubmit]);

    return (
        <Autocomplete
            options={ options }
            getOptionLabel={ getOptionLabel }
            getOptionSelected={ getOptionSelected }
            renderInput={ (params) => (
                <TextField
                    { ...params }
                    InputProps={ {
                        ...params.InputProps,
                        disableUnderline: true,
                        endAdornment:
                            <IconButton onClick={ onSubmit } size="small">
                                <IconSearch />
                            </IconButton>,
                        className: clsx(classes.root, className),
                    } }
                />
            ) }
            onChange={ onSearchTextChange }
            value={ searchText }
            size="small"
            onKeyUp={ onKeyUp }
        />
    );
}, (prev, next) => {
    return prev.options !== next.options;
});

SearchBar.propTypes = {
    options: PropTypes.array.isRequired,
    getUrl: PropTypes.func.isRequired,
    getOptionLabel: PropTypes.func,
    getOptionSelected: PropTypes.func,
    className: PropTypes.string
};

export default SearchBar;