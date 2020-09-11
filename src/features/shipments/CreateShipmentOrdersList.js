import React, { useState } from 'react';
import { List, ListSubheader } from '@material-ui/core';
import CreateShipmentOrdersListItem from './CreateShipmentOrdersListItem.js';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { selectAutocompleteOptions } from './duck/selectors.js';

const useStyles = makeStyles((theme) => ({
    list: {
        backgroundColor: theme.palette.tertiary['100'],
        overflow: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: theme.palette.tertiary['300'],
        borderRadius: 4,
        height: '100%',
        margin: theme.spacing(1),
    },
    listSection: {
        backgroundColor: 'inherit'
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0
    },
    subheader: {
        fontWeight: 'bold',
        fontSize: '1.2rem'
    }
}));

export default function CreateShipmentOrdersList({ setValue, ordersRef }) {
    const classes = useStyles();
    const { companyOrderMap } = useSelector(selectAutocompleteOptions);
    const [options, setOptions] = useState(companyOrderMap);

    const onAddOrderRef = (companyName, orderRef) => {
        const newCompanyOptions = options[companyName].filter(order => order.poRef !== orderRef);
        setOptions(oldOptions => ({
            ...oldOptions,
            [companyName]: newCompanyOptions
        }));
        setValue('ordersRef', [...ordersRef, orderRef]);
    }

    return (
        <List subheader={ <li/> } className={ classes.list }>
            { Object.entries(options).map(([companyName, orders]) =>
                <li key={ `section-${ companyName }` } className={ classes.listSection }>
                    <ul className={ classes.ul }>
                        <ListSubheader className={ classes.subheader }>
                            { companyName }
                        </ListSubheader>
                        { orders.map(order =>
                            <CreateShipmentOrdersListItem
                                key={ `item-${ companyName }-${ order.poRef }` }
                                poRef={ order.poRef }
                                onAdd={() => onAddOrderRef(companyName, order.poRef)}
                            />
                        ) }
                    </ul>
                </li>
            ) }
        </List>
    )
}