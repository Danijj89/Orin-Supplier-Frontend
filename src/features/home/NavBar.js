import React from 'react';
import classNames from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../../images/orinlogo.png';
import { LANGUAGE } from '../../app/constants.js';
import {
    CardMedia,
    List,
    ListItem,
    ListItemText,
    AppBar,
    Toolbar,
    IconButton,
    MenuItem,
    Menu,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    ViewStreamOutlined as IconViewStream,
    PeopleOutlined as IconPeople,
    DirectionsBoatOutlined as IconBoat,
    LocalOfferOutlined as IconTag,
    AddCircleOutlineOutlined as IconPlus,
} from '@material-ui/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(5),
    },
    grow: {
        flexGrow: 1,
    },
    logo: {
        height: '25px',
        width: 'auto',
        marginRight: '30px',
    },
    search: { flexGrow: 3 },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    menu: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    menuButtons: {
        margin: theme.spacing(1),
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
        fontWeight: 'bold',
    },
}));

const {
    orders,
    clients,
    products,
    shipments,
    settings,
} = LANGUAGE.home.sidePanel;

export default function NavBar({ user }) {
    const classes = useStyles();
    const location = useLocation();
    const currentTab = location.pathname.split('/')[2];
    const history = useHistory();

    const onTabClick = (tabName, href) => history.push(href);

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={() => onTabClick('orders', '/home/orders')}>
                <IconButton color="inherit">
                    <IconViewStream />
                </IconButton>
                {orders}
            </MenuItem>
            <MenuItem onClick={() => onTabClick('clients', '/home/clients')}>
                <IconButton color="inherit">
                    <IconPeople />
                </IconButton>
                {clients}
            </MenuItem>
            <MenuItem onClick={() => onTabClick('leads', '#')}>
                <IconButton color="inherit">
                    <IconPlus />
                </IconButton>
                Leads
            </MenuItem>
            <MenuItem onClick={() => onTabClick('shipments', '#')}>
                <IconButton color="inherit">
                    <IconBoat />
                </IconButton>
                {shipments}
            </MenuItem>
            <MenuItem onClick={() => onTabClick('products', '/home/products')}>
                <IconButton color="inherit">
                    <IconTag />
                </IconButton>
                {products}
            </MenuItem>
            <MenuItem
                onClick={() => onTabClick('settings', '/home/settings/account')}
            >
                <IconButton color="inherit">
                    <AccountCircle />
                </IconButton>
                {settings}
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classNames(classes.grow, classes.root)}>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <CardMedia
                        component="img"
                        src={logo}
                        alt="Logo"
                        className={classes.logo}
                    />
                    <List className={classes.menu}>
                        <ListItem
                            button
                            component="a"
                            onClick={() => onTabClick('orders', '/home/orders')}
                            selected={currentTab === 'orders'}
                            classes={{
                                root: classes.tabs,
                                selected: classes.selected,
                            }}
                        >
                            <ListItemText>
                                <span className={classes.tabsText}>
                                    {orders}
                                </span>
                            </ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            component="a"
                            onClick={() =>
                                onTabClick('clients', '/home/clients')
                            }
                            classes={{
                                root: classes.tabs,
                                selected: classes.selected,
                            }}
                            selected={currentTab === 'clients'}
                        >
                            <ListItemText>
                                <span className={classes.tabsText}>
                                    {clients}
                                </span>
                            </ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            component="a"
                            onClick={() => onTabClick('leads', '#')}
                            classes={{
                                root: classes.tabs,
                                selected: classes.selected,
                            }}
                            selected={currentTab === 'leads'}
                        >
                            <ListItemText>
                                <span className={classes.tabsText}>Leads</span>
                            </ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            component="a"
                            onClick={() => onTabClick('shipments', '#')}
                            classes={{
                                root: classes.tabs,
                                selected: classes.selected,
                            }}
                            selected={currentTab === 'shipments'}
                        >
                            <ListItemText>
                                <span className={classes.tabsText}>
                                    {shipments}
                                </span>
                            </ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            component="a"
                            onClick={() => onTabClick('products', '/home/products')}
                            classes={{
                                root: classes.tabs,
                                selected: classes.selected,
                            }}
                            selected={currentTab === 'products'}
                        >
                            <ListItemText>
                                <span className={classes.tabsText}>
                                    {products}
                                </span>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <div className={classes.grow} />
                    <Typography variant="subtitle1">
                        Hello, {user.name}
                    </Typography>

                    <div className={classes.sectionDesktop}>
                        <IconButton
                            edge="end"
                            onClick={() =>
                                onTabClick('settings', '/home/settings/account')
                            }
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </div>
    );
}
