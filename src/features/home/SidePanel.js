import React from 'react';
import logo from '../../images/orinlogo.png';
import { LANGUAGE } from '../../constants.js';
import { useSelector } from 'react-redux';
import { selectCurrentCompany, selectCurrentUser } from './slice.js';
import { Container, CardMedia, Typography, Box, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    ViewStreamOutlined as IconViewStream,
    PeopleOutlined as IconPeople,
    DescriptionOutlined as IconDescription
} from '@material-ui/icons';

const { userLabel, orders, clients, documents } = LANGUAGE.home.sidePanel;

const useStyles = makeStyles({
    container: {
        padding: '5%',
        display: 'flex',
        flexDirection: "column"
    },
    logo: {
        width: '60%',
        margin: '8px 4px'
    },
    userInfo: {
        margin: '48px 4px'
    },
    user: {
        fontWeight: 'bold'
    },
    company: {
        fontWeight: 'light'
    },
    tabs: {
        marginLeft: 4,
        paddingLeft: 0
    },
    tabsText: {
        paddingLeft: 8
    }
})

export default function SidePanel() {
    const classes = useStyles();
    const user = useSelector(selectCurrentUser);
    const company = useSelector(selectCurrentCompany);

    const ListItemLink = (props) => {
        const Icon = props.icon;
        return (
            <ListItem button component="a" className={ classes.tabs } { ...props }>
                <Icon {...props}/>
                <ListItemText className={ classes.tabsText }>{ props.label }</ListItemText>
            </ListItem>
        )
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
                <Typography className={ classes.user }>{ `${ userLabel } ${ user.name }` }</Typography>
                <Typography className={ classes.company }>{ `${ company.names[0] }` }</Typography>
            </Box>
            <List>
                <ListItem button component="a" href='/home/orders' className={ classes.tabs }>
                    <IconViewStream />
                    <ListItemText className={ classes.tabsText }>{ orders }</ListItemText>
                </ListItem>
                <ListItem button component="a" href='#' className={ classes.tabs }>
                    <IconPeople />
                    <ListItemText className={ classes.tabsText }>{ clients }</ListItemText>
                </ListItem>
                <ListItem button component="a" href='#' className={ classes.tabs }>
                    <IconDescription />
                    <ListItemText className={ classes.tabsText }>{ documents }</ListItemText>
                </ListItem>
            </List>
            <Divider />
        </Container>
    )
}