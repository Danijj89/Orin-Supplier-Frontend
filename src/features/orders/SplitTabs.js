import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    container: {
        flex: 1
    },
    tab: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        borderRadius: 4
    },
    active: {
        borderLeft: '3px solid',
        borderColor: theme.palette.primary.main
    }
}));

const SplitTabs = React.memo(function SplitTabs(
    { splits, activeSplit, onSplitChange }) {
    const classes = useStyles();

    const tabIndicatorProps = useMemo(() => ({
        style: { display: 'none' }
    }), []);

    return (
        <Tabs
            orientation="vertical"
            variant="scrollable"
            indicatorColor='primary'
            textColor='primary'
            value={ activeSplit._id }
            onChange={ onSplitChange }
            className={ classes.container }
            TabIndicatorProps={ tabIndicatorProps }
        >
            { splits && splits.map(split =>
                <Box
                    key={ `split-${ split._id }-vertical-tab` }
                    label={ split.ref }
                    value={ split._id }
                    className={ clsx(classes.tab, split._id === activeSplit._id && classes.active) }
                    component={ Tab }
                    boxShadow={ 2 }
                />
            ) }
        </Tabs>
    );
});

SplitTabs.propTypes = {
    splits: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeSplit: PropTypes.object.isRequired,
    onSplitChange: PropTypes.func.isRequired
};

export default SplitTabs;