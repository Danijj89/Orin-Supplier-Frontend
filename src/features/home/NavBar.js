import React, { useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../../images/orinlogo.png';
import { LANGUAGE } from 'app/utils/constants.js';
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
    SupervisorAccount as IconAdmin,
    Dashboard as IconDashboard,
    ExitToApp as IconSignOut
} from '@material-ui/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../orders/duck/thunks.js';
import { fetchClients } from '../clients/duck/thunks.js';
import { fetchShipments } from '../shipments/duck/thunks.js';
import { fetchProducts } from '../products/duck/thunks.js';
import { fetchDashboardData } from '../dashboard/duck/thunks.js';
import { selectSessionUserName } from 'app/duck/selectors.js';
import { READ_ANY, READ_OWN } from '../admin/utils/actions.js';
import OrderPermission from '../shared/permissions/OrderPermission.js';
import LeadPermission from '../shared/permissions/LeadPermission.js';
import ClientPermission from '../shared/permissions/ClientPermission.js';
import ShipmentPermission from '../shared/permissions/ShipmentPermission.js';
import ProductPermission from '../shared/permissions/ProductPermission.js';
import PermissionPermission from '../shared/permissions/PermissionPermission.js';
import DashboardPermission from '../shared/permissions/DashboardPermission.js';
import { signOut } from 'app/duck/thunks.js';
import {initGA, PageView, Event} from 'app/utils/helpers'

initGA();
PageView();


const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2),
        flexGrow: 1,
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

const { tabsLabelsMap, helloMessageLabel } = LANGUAGE.home.navbar;

const NavBar = React.memo(function NavBar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const currentTab = location.pathname.split('/')[2];
    const userName = useSelector(selectSessionUserName);

    const onTabClick = (tabName, href) => {
        if (tabName === currentTab) {
            switch (tabName) {
                case 'orders':
                    dispatch(fetchOrders());
                    break;
                case 'clients':
                    dispatch(fetchClients());
                    break;
                case 'shipments':
                    dispatch(fetchShipments());
                    break;
                case 'products':
                    dispatch(fetchProducts());
                    break;
                case 'dashboard':
                    dispatch(fetchDashboardData());
                    break;
                default:
            }
        }
        history.push(href);
    };

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

    const handleMobileMenuClose = useCallback(
        () => setMobileMoreAnchorEl(null)
        , []);

    const handleMobileMenuOpen = useCallback(e =>
            setMobileMoreAnchorEl(e.currentTarget)
        , []);

    const onUserMenuOpen = useCallback(e =>
            setUserMenuAnchorEl(e.currentTarget),
        []);

    const onUserMenuClose = useCallback(
        () => setUserMenuAnchorEl(null),
        []);

    const onSignOut = useCallback(() => dispatch(signOut()), [dispatch]);

    const renderMobileMenu = (
        <Menu
            anchorEl={ mobileMoreAnchorEl }
            anchorOrigin={ { vertical: 'top', horizontal: 'right' } }
            id="mobile-user-navbar-menu"
            keepMounted
            transformOrigin={ { vertical: 'top', horizontal: 'right' } }
            open={ Boolean(mobileMoreAnchorEl) }
            onClose={ handleMobileMenuClose }
        >
            {/* The div here is to avoid ref forward error */ }
            <div>
                <DashboardPermission action={ [READ_ANY] }>
                <MenuItem
                    onClick={ () => onTabClick('dashboard', '/home/dashboard') }
                >
                    <IconButton color="inherit">
                        <IconDashboard/>
                    </IconButton>
                    { tabsLabelsMap.dashboard }
                </MenuItem>
            </DashboardPermission>
            </div>
            <OrderPermission action={ [READ_ANY, READ_OWN] }>
                    <MenuItem
                        onClick={ () => onTabClick('orders', '/home/orders') }
                    >
                        <IconButton color="inherit">
                            <IconViewStream/>
                        </IconButton>
                        { tabsLabelsMap.orders }
                    </MenuItem>
                </OrderPermission>
            
            <ClientPermission action={ [READ_ANY, READ_OWN] }>
                <MenuItem
                    onClick={ () => onTabClick('clients', '/home/clients') }
                >
                    <IconButton color="inherit">
                        <IconPeople/>
                    </IconButton>
                    { tabsLabelsMap.clients }
                </MenuItem>
            </ClientPermission>
            <LeadPermission action={ [READ_ANY, READ_OWN] }>
                <MenuItem onClick={ () => onTabClick('leads', '/home/leads') }>
                    <IconButton color="inherit">
                        <IconPlus/>
                    </IconButton>
                    { tabsLabelsMap.leads }
                </MenuItem>
            </LeadPermission>
            <ShipmentPermission action={ [READ_ANY, READ_OWN] }>
                <MenuItem 
                    onClick={ () => { 
                        onTabClick('shipments', '/home/shipments');
                        Event("NAV", "Clicked Shipment", "MOBILE_NAV");
                 }}
                >
                    <IconButton color="inherit">
                        <IconBoat/>
                    </IconButton>
                    { tabsLabelsMap.shipments }
                </MenuItem>
            </ShipmentPermission>
            <ProductPermission action={ [READ_ANY] }>
                <MenuItem
                    onClick={ () => onTabClick('products', '/home/products') }
                >
                    <IconButton color="inherit">
                        <IconTag/>
                    </IconButton>
                    { tabsLabelsMap.products }
                </MenuItem>
            </ProductPermission>
            <PermissionPermission action={ READ_ANY }>
                <MenuItem onClick={ () => onTabClick('admin', '/home/admin') }>
                    <IconButton color="inherit">
                        <IconAdmin/>
                    </IconButton>
                    { tabsLabelsMap.admin }
                </MenuItem>
            </PermissionPermission>
            <MenuItem
                onClick={ () =>
                    onTabClick('settings', '/home/settings?tab=account')
                }
            >
                <IconButton color="inherit">
                    <AccountCircle/>
                </IconButton>
                { tabsLabelsMap.settings }
            </MenuItem>
            <MenuItem
                onClick={ onSignOut }
            >
                <IconButton color="inherit">
                    <IconSignOut/>
                </IconButton>
                { tabsLabelsMap.signOut }
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <AppBar
                position="static"
                color="secondary"
                className={ classes.root }
            >
                <Toolbar>
                    <CardMedia
                        component="img"
                        src={ logo }
                        alt="Logo"
                        className={ classes.logo }
                    />
                    <List className={ classes.menu }>
                        <DashboardPermission action={ [READ_ANY, READ_OWN] }>
                            <ListItem
                                button
                                component="a"
                                onClick={ () =>
                                    onTabClick('dashboard', '/home/dashboard')
                                }
                                classes={ {
                                    root: classes.menuButtons,
                                    selected: classes.selected,
                                } }
                                selected={ currentTab === 'dashboard' }
                            >
                                <ListItemText>
                                    <span className={ classes.tabsText }>
                                        { tabsLabelsMap.dashboard }
                                    </span>
                                </ListItemText>
                            </ListItem>
                        </DashboardPermission>
                        <OrderPermission action={ [READ_ANY, READ_OWN] }>
                            <ListItem
                                button
                                component="a"
                                onClick={ () =>
                                    onTabClick('orders', '/home/orders')
                                }
                                selected={ currentTab === 'orders' || !currentTab }
                                classes={ {
                                    root: classes.menuButtons,
                                    selected: classes.selected,
                                } }
                            >
                                <ListItemText>
                                    <span className={ classes.tabsText }>
                                        { tabsLabelsMap.orders }
                                    </span>
                                </ListItemText>
                            </ListItem>
                        </OrderPermission>
                        <ClientPermission action={ [READ_ANY, READ_OWN] }>
                            <ListItem
                                button
                                component="a"
                                onClick={ () =>
                                    onTabClick('clients', '/home/clients')
                                }
                                classes={ {
                                    root: classes.menuButtons,
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
                        </ClientPermission>
                        <LeadPermission action={ [READ_ANY, READ_OWN] }>
                            <ListItem
                                button
                                component="a"
                                onClick={ () =>
                                    onTabClick('leads', '/home/leads')
                                }
                                classes={ {
                                    root: classes.menuButtons,
                                    selected: classes.selected,
                                } }
                                selected={ currentTab === 'leads' }
                            >
                                <ListItemText>
                                    <span className={ classes.tabsText }>
                                        { tabsLabelsMap.leads }
                                    </span>
                                </ListItemText>
                            </ListItem>
                        </LeadPermission>
                        <ShipmentPermission action={ [READ_ANY, READ_OWN] }>
                            <ListItem
                                button
                                component="a"
                                onClick={ () =>
                                    onTabClick('shipments', '/home/shipments')
                                }
                                classes={ {
                                    root: classes.menuButtons,
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
                        </ShipmentPermission>
                        <ProductPermission action={ [READ_ANY] }>
                            <ListItem
                                button
                                component="a"
                                onClick={ () =>
                                    onTabClick('products', '/home/products')
                                }
                                classes={ {
                                    root: classes.menuButtons,
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
                        </ProductPermission>
                        <PermissionPermission action={ READ_ANY }>
                            <ListItem
                                button
                                component="a"
                                onClick={ () =>
                                    onTabClick('admin', '/home/admin')
                                }
                                classes={ {
                                    root: classes.menuButtons,
                                    selected: classes.selected,
                                } }
                                selected={ currentTab === 'admin' }
                            >
                                <ListItemText>
                                    <span className={ classes.tabsText }>
                                        { tabsLabelsMap.admin }
                                    </span>
                                </ListItemText>
                            </ListItem>
                        </PermissionPermission>
                    </List>
                    <div className={ classes.grow }/>
                    <Typography variant="subtitle1">
                        { `${ helloMessageLabel }, ${ userName }` }
                    </Typography>

                    <Menu
                        anchorEl={ userMenuAnchorEl }
                        anchorOrigin={ { vertical: 'top', horizontal: 'right' } }
                        id="user-navbar-menu"
                        keepMounted
                        transformOrigin={ { vertical: 'top', horizontal: 'right' } }
                        open={ Boolean(userMenuAnchorEl) }
                        onClose={ onUserMenuClose }
                    >
                        {/* The div here is to avoid ref forward error */ }
                        <div>
                            <MenuItem
                                onClick={ () =>
                                    onTabClick('settings', '/home/settings?tab=account')
                                }
                            >
                                <IconButton color="inherit">
                                    <AccountCircle/>
                                </IconButton>
                                { tabsLabelsMap.settings }
                            </MenuItem>
                        </div>
                        <MenuItem
                            onClick={ onSignOut }
                        >
                            <IconButton color="inherit">
                                <IconSignOut/>
                            </IconButton>
                            { tabsLabelsMap.signOut }
                        </MenuItem>
                    </Menu>

                    <div className={ classes.sectionDesktop }>
                        <IconButton
                            edge="end"
                            onClick={ onUserMenuOpen }
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
        </>
    );
});

export default NavBar;
