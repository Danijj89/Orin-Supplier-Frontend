import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { LANGUAGE } from '../../app/constants.js';
import OrderDetails from './OrderDetails.js';
import { selectOrderById } from './duck/selectors.js';
import { Redirect } from 'react-router-dom';
import OrderDocuments from './OrderDocuments.js';
import { makeStyles } from '@material-ui/core/styles';
import NavTabs from '../shared/components/NavTabs.js';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            paddingLeft: theme.spacing(10),
            paddingRight: theme.spacing(10),
        },
    },
    orderTabs: {
        marginBottom: theme.spacing(1)
    }
}));

const { tabsLabelsMap } = LANGUAGE.order.order;

export default function Order() {
    const classes = useStyles();
    const { id } = useParams();
    const order = useSelector(state => selectOrderById(state, id));

    const [tabValue, setTabValue] = useState('details');

    return (
        <Box className={ classes.root }>
            <Paper>
                <NavTabs
                    tabsLabelsMap={ tabsLabelsMap }
                    tabValue={ tabValue }
                    onChange={ setTabValue }
                    className={ classes.orderTabs }
                />
            </Paper>
            { tabValue === 'details' &&
            <OrderDetails order={ order }/>
            }
            { tabValue === 'documents' && <OrderDocuments order={ order }/> }
        </Box>
    )
}

