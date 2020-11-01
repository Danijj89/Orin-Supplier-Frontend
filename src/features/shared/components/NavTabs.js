import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

export default function NavTabs({ tabsLabelsMap, tabValue, onChange, className }) {

    const onTabChange = (event, newValue) => onChange(newValue);

    return (
        <Tabs
            value={ tabValue }
            onChange={ onTabChange }
            indicatorColor='primary'
            textColor='primary'
            className={ className }
        >
            { Object.entries(tabsLabelsMap).map(([value, label]) =>
                <Tab key={ value } label={ label } value={ value } component="span"/>
            ) }
        </Tabs>
    )
}

NavTabs.propTypes = {
    tabsLabelsMap: PropTypes.object.isRequired,
    tabValue: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
};