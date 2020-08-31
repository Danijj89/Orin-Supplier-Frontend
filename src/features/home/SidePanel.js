import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../images/orinlogo.png';
import { LANGUAGE } from '../../constants.js';
import { useDispatch, useSelector } from 'react-redux';
import { changeSelectedTab, selectCurrentCompany, selectCurrentTab, selectCurrentUser } from './slice.js';
import { Container, CardMedia, Typography, Box, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    ViewStreamOutlined as IconViewStream,
    PeopleOutlined as IconPeople,
    DescriptionOutlined as IconDescription
} from '@material-ui/icons';

const { orders, clients, documents } = LANGUAGE.home.sidePanel;

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '5%',
        display: 'flex',
        flexDirection: "column",
    },
    logo: {
        width: '60%',
        margin: '8px 4px'
    },
    userInfo: {
        margin: '48px 4px'
    },
    user: {
        fontWeight: 'bold',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    company: {
        fontWeight: 'lighter',
        color: theme.palette.primary.dark,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    },
    tabs: {
        marginLeft: 4,
        paddingLeft: 0
    },
    selected: {
        '&$selected:hover': {
            color: theme.palette.secondary.main
        },
        '&$selected': {
            color: theme.palette.secondary.main,
            backgroundColor: 'transparent',
        }
    },
    tabsText: {
        paddingLeft: 8
    }
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
    }

    return (
        <Container className={ classes.container }>
            <CardMedia
                component="img"
                src={ logo }
                alt="Logo"
                className={ classes.logo }
            />
            <Box className={ classes.userInfo }>
                <Typography className={ classes.user }>{ user.name }</Typography>
                <Typography className={ classes.company }>{ `${ company.names[0] }` }</Typography>
            </Box>
            <List>
                <ListItem
                    button
                    component="a"
                    onClick={() => onTabClick('orders', '/home/orders')}
                    selected={ selectedTab === 'orders'}
                    classes={ { root: classes.tabs, selected: classes.selected }}
                >
                    <IconViewStream className={ classes.icon }/>
                    <ListItemText className={ classes.tabsText }>{ orders }</ListItemText>
                </ListItem>
                <ListItem
                    button
                    component="a"
                    onClick={() => onTabClick('clients', '#')}
                    classes={ { root: classes.tabs, selected: classes.selected }}
                    selected={ selectedTab === 'clients'}
                >
                    <IconPeople className={ classes.icon }/>
                    <ListItemText className={ classes.tabsText }>{ clients }</ListItemText>
                </ListItem>
                <ListItem
                    button
                    component="a"
                    onClick={() => onTabClick('documents', '#')}
                    classes={ { root: classes.tabs, selected: classes.selected }}
                    selected={ selectedTab === 'documents'}
                >
                    <IconDescription className={ classes.icon }/>
                    <ListItemText className={ classes.tabsText }>{ documents }</ListItemText>
                </ListItem>
            </List>
            <Divider/>
        </Container>
    )
}