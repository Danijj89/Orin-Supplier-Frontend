import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../images/orinlogo.png';
import { LANGUAGE } from '../../constants.js';
import {
    Container,
    CardMedia,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    ViewStreamOutlined as IconViewStream,
    PeopleOutlined as IconPeople,
    DirectionsBoatOutlined as IconBoat,
    LocalOfferOutlined as IconTag,
    MoreHorizOutlined as IconSettings
} from '@material-ui/icons';
import FeatureInProgressTag from '../shared/displays/FeatureInProgressTag.js';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './duck/selectors.js';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
    },
    container: {
        padding: '5%',
        display: 'flex',
        flexDirection: 'column',
    },
    logo: {
        width: '60%',
        margin: '8px 4px',
    },
    userInfo: {
        margin: '48px 4px',
    },
    user: {
        fontWeight: 'bold',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    company: {
        fontWeight: 'lighter',
        color: theme.palette.tertiary.A700,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    tabs: {
        marginLeft: 4,
        paddingLeft: 0,
        overflow: 'hidden',
    },
    selected: {
        '&$selected:hover': {
            color: theme.palette.primary.main,
        },
        '&$selected': {
            color: theme.palette.primary.main,
            backgroundColor: 'transparent',
        },
    },
    tabsText: {
        paddingLeft: 8,
    },
}));

const { orders, clients, products, shipments, settings } = LANGUAGE.home.sidePanel;

export default function SidePanel() {
    const classes = useStyles();
    const history = useHistory();
    const user = useSelector(selectCurrentUser);
    const [tab, setTab] = useState('orders');

    const onTabClick = (tabName, href) => {
        setTab(tabName);
        history.push(href);
    };

    return (
        <Paper className={classes.root} elevation={3}>
            <Container className={classes.container}>
                <CardMedia
                    component="img"
                    src={logo}
                    alt="Logo"
                    className={classes.logo}
                />
                <Box className={classes.userInfo}>
                    <Typography className={classes.user}>
                        {user.name}
                    </Typography>
                    <Typography
                        className={classes.company}
                    >{`${user.company.legalAddress.name}`}</Typography>
                </Box>
                <List>
                    <ListItem
                        button
                        component="a"
                        onClick={() => onTabClick('orders', '/home/orders')}
                        selected={tab === 'orders'}
                        classes={{
                            root: classes.tabs,
                            selected: classes.selected,
                        }}
                    >
                        <IconViewStream className={classes.icon} />
                        <ListItemText className={classes.tabsText}>
                            {orders}
                        </ListItemText>
                    </ListItem>
                    <ListItem
                        button
                        component="a"
                        onClick={ () => onTabClick('clients', '/home/clients') }
                        classes={ { root: classes.tabs, selected: classes.selected } }
                        selected={ tab === 'clients' }
                    >
                        <IconPeople className={ classes.icon }/>
                        <ListItemText className={ classes.tabsText }>{ clients }</ListItemText>
                        <FeatureInProgressTag/>
                    </ListItem>
                    <ListItem
                        button
                        component="a"
                        onClick={ () => onTabClick('shipments', '#') }
                        classes={ { root: classes.tabs, selected: classes.selected } }
                        selected={ tab === 'shipments' }
                    >
                        <IconBoat className={ classes.icon }/>
                        <ListItemText className={ classes.tabsText }>{ shipments }</ListItemText>
                        <FeatureInProgressTag/>
                    </ListItem>
                    <ListItem
                        button
                        component="a"
                        onClick={() => onTabClick('products', '#')}
                        classes={{
                            root: classes.tabs,
                            selected: classes.selected,
                        }}
                        selected={tab === 'products'}
                    >
                        <IconTag className={classes.icon} />
                        <ListItemText className={classes.tabsText}>
                            {products}
                        </ListItemText>
                        <FeatureInProgressTag />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem
                        button
                        component="a"
                        onClick={() => onTabClick('settings', '/home/settings/account')}
                        classes={{
                            root: classes.tabs,
                            selected: classes.selected,
                        }}
                        selected={tab === 'settings'}
                    >
                        <IconSettings className={classes.icon} />
                        <ListItemText className={classes.tabsText}>
                            {settings}
                        </ListItemText>
                        <FeatureInProgressTag />
                    </ListItem>
                </List>
            </Container>
        </Paper>
    );
}
