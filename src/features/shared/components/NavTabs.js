import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

const NavTabs = React.memo(function NavTabs(
    {
        tabsLabelsMap,
        tabValue,
        onChange,
        variant,
        orientation,
        tabComponent = 'span',
        className,
        tabClassName,
        component
    }) {

    const onTabChange = useCallback((event, newValue) => onChange(newValue), [onChange]);

    return (
        <Tabs
            value={ tabValue }
            onChange={ onTabChange }
            indicatorColor='primary'
            textColor='primary'
            className={ className }
            variant={ variant }
            orientation={ orientation }
            component={ component }
        >
            { Object.entries(tabsLabelsMap).map(([value, label]) =>
                <Tab
                    key={ value }
                    label={ label }
                    value={ value }
                    component={ tabComponent }
                    className={ tabClassName }
                />
            ) }
        </Tabs>
    )
});

NavTabs.propTypes = {
    tabsLabelsMap: PropTypes.object.isRequired,
    tabValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    variant: PropTypes.string,
    orientation: PropTypes.string,
    tabComponent: PropTypes.string,
    tabClassName: PropTypes.string,
    className: PropTypes.string,
    component: PropTypes.any
};

export default NavTabs;