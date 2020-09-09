import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../images/orinlogo.png';
import { LANGUAGE } from '../../constants.js';
import { useDispatch, useSelector } from 'react-redux';
import {
    changeSelectedTab,
    selectCurrentCompany,
    selectCurrentTab,
    selectCurrentUser,
} from './slice.js';
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
    OpenInBrowserOutlined as IconDescription,
    DirectionsBoatOutlined as IconBoat
} from '@material-ui/icons';
import FeatureInProgressTag from '../shared/displays/FeatureInProgressTag.js';

const { orders, clients, inventory, shipments } = LANGUAGE.home.sidePanel;

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

export default function SidePanel() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const company = useSelector(selectCurrentCompany);
    const selectedTab = useSelector(selectCurrentTab);

    const onTabClick = (tabName, href) => {
        dispatch(changeSelectedTab(tabName));
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
                    >{`${company.names[0]}`}</Typography>
                </Box>
                <List>
                    <ListItem
                        button
                        component="a"
                        onClick={() => onTabClick('orders', '/home/orders')}
                        selected={selectedTab === 'orders'}
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
                        onClick={ () => onTabClick('shipments', '/home/shipments') }
                        classes={ { root: classes.tabs, selected: classes.selected } }
                        selected={ selectedTab === 'shipments' }
                    >
                        <IconBoat className={ classes.icon }/>
                        <ListItemText className={ classes.tabsText }>{ shipments }</ListItemText>
                        <FeatureInProgressTag/>
                    </ListItem>
                    <ListItem
                        button
                        component="a"
                        onClick={ () => onTabClick('clients', '#') }
                        classes={ { root: classes.tabs, selected: classes.selected } }
                        selected={ selectedTab === 'clients' }
                    >
                        <IconPeople className={ classes.icon }/>
                        <ListItemText className={ classes.tabsText }>{ clients }</ListItemText>
                        <FeatureInProgressTag/>
                    </ListItem>
                    <ListItem
                        button
                        component="a"
                        onClick={() => onTabClick('inventory', '#')}
                        classes={{
                            root: classes.tabs,
                            selected: classes.selected,
                        }}
                        selected={selectedTab === 'inventory'}
                    >
                        <IconDescription className={classes.icon} />
                        <ListItemText className={classes.tabsText}>
                            {inventory}
                        </ListItemText>
                        <FeatureInProgressTag />
                    </ListItem>
                </List>
                <Divider />
            </Container>
        </Paper>
    );
}
