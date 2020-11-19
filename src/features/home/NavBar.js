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
import { useDispatch, useSelector } from 'react-redux';
import { selectCompanyId } from './duck/selectors.js';
import { fetchOrders } from '../orders/duck/thunks.js';
import { fetchClients } from '../clients/duck/thunks.js';
import { fetchShipments } from '../shipments/duck/thunks.js';
import { fetchProducts } from '../products/duck/thunks.js';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
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
    tabsLabelsMap,
    helloMessageLabel
} = LANGUAGE.home.navbar;

const NavBar = React.memo(function NavBar({ user }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const currentTab = location.pathname.split('/')[2];
    const companyId = useSelector(selectCompanyId);

    const onTabClick = (tabName, href) => {
        if (tabName === currentTab) {
            switch (tabName) {
                case 'orders':
                    dispatch(fetchOrders({ companyId }));
                    break;
                case 'clients':
                    dispatch(fetchClients({ companyId }));
                    break;
                case 'shipments':
                    dispatch(fetchShipments({ companyId }));
                    break;
                case 'products':
                    dispatch(fetchProducts({ companyId }));
                    break;
                default:
            }
        }
        history.push(href);
    }

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
            anchorEl={ mobileMoreAnchorEl }
            anchorOrigin={ { vertical: 'top', horizontal: 'right' } }
            id={ mobileMenuId }
            keepMounted
            transformOrigin={ { vertical: 'top', horizontal: 'right' } }
            open={ isMobileMenuOpen }
            onClose={ handleMobileMenuClose }
        >
            <MenuItem onClick={ () => onTabClick('orders', '/home/orders') }>
                <IconButton color="inherit">
                    <IconViewStream/>
                </IconButton>
                { tabsLabelsMap.orders }
            </MenuItem>
            <MenuItem onClick={ () => onTabClick('clients', '/home/clients') }>
                <IconButton color="inherit">
                    <IconPeople/>
                </IconButton>
                { tabsLabelsMap.clients }
            </MenuItem>
            <MenuItem onClick={ () => onTabClick('leads', '#') }>
                <IconButton color="inherit">
                    <IconPlus/>
                </IconButton>
                { tabsLabelsMap.leads }
            </MenuItem>
            <MenuItem onClick={ () => onTabClick('shipments', '/home/shipments') }>
                <IconButton color="inherit">
                    <IconBoat/>
                </IconButton>
                { tabsLabelsMap.shipments }
            </MenuItem>
            <MenuItem onClick={ () => onTabClick('products', '/home/products') }>
                <IconButton color="inherit">
                    <IconTag/>
                </IconButton>
                { tabsLabelsMap.products }
            </MenuItem>
            <MenuItem
                onClick={ () => onTabClick('settings', '/home/settings/account') }
            >
                <IconButton color="inherit">
                    <AccountCircle/>
                </IconButton>
                { tabsLabelsMap.settings }
            </MenuItem>
        </Menu>
    );

    return (
        <div className={ classNames(classes.grow, classes.root) }>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <CardMedia
                        component="img"
                        src={ logo }
                        alt="Logo"
                        className={ classes.logo }
                    />
                    <List className={ classes.menu }>
                        <ListItem
                            button
                            component="a"
                            onClick={ () => onTabClick('orders', '/home/orders') }
                            selected={ currentTab === 'orders' }
                            classes={ {
                                root: classes.tabs,
                                selected: classes.selected,
                            } }
                        >
                            <ListItemText>
                                <span className={ classes.tabsText }>
                                    { tabsLabelsMap.orders }
                                </span>
                            </ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            component="a"
                            onClick={ () =>
                                onTabClick('clients', '/home/clients')
                            }
                            classes={ {
                                root: classes.tabs,
                                selected: classes.selected,
                            } }
                            selected={ currentTab === 'clients' }
                        >
                            <ListItemText>
                                <span className={ classes.tabsText }>
                                    { tabsLabelsMap.clients }
                                </span>
                            </ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            component="a"
                            onClick={ () => onTabClick('leads', '#') }
                            classes={ {
                                root: classes.tabs,
                                selected: classes.selected,
                            } }
                            selected={ currentTab === 'leads' }
                        >
                            <ListItemText>
                                <span className={ classes.tabsText }>Leads</span>
                            </ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            component="a"
                            onClick={ () => onTabClick('shipments', '/home/shipments') }
                            classes={ {
                                root: classes.tabs,
                                selected: classes.selected,
                            } }
                            selected={ currentTab === 'shipments' }
                        >
                            <ListItemText>
                                <span className={ classes.tabsText }>
                                    { tabsLabelsMap.shipments }
                                </span>
                            </ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            component="a"
                            onClick={ () => onTabClick('products', '/home/products') }
                            classes={ {
                                root: classes.tabs,
                                selected: classes.selected,
                            } }
                            selected={ currentTab === 'products' }
                        >
                            <ListItemText>
                                <span className={ classes.tabsText }>
                                    { tabsLabelsMap.products }
                                </span>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <div className={ classes.grow }/>
                    <Typography variant="subtitle1">
                        { `${ helloMessageLabel }, ${ user.name }` }
                    </Typography>

                    <div className={ classes.sectionDesktop }>
                        <IconButton
                            edge="end"
                            onClick={ () =>
                                onTabClick('settings', '/home/settings/account')
                            }
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                    </div>
                    <div className={ classes.sectionMobile }>
                        <IconButton
                            onClick={ handleMobileMenuOpen }
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            { renderMobileMenu }
        </div>
    );
});

export default NavBar;