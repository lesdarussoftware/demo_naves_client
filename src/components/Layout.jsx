import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Avatar } from "@mui/material";
import Button from '@mui/material/Button';
import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp';

import { AuthContext } from '../providers/AuthProvider';
import { CartContext } from '../providers/CartProvider';

import { CartDrawer } from './CartDrawer';

import { UserDropdown } from './UserDropdown';

import Logo from '../assets/logo.png';

const drawerWidth = 240;

export function Layout({ window, children }) {

    const { auth } = useContext(AuthContext);
    const { showCart, setShowCart, productsToBuy } = useContext(CartContext)

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [mobileOpen, setMobileOpen] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    const navItems = [
        { label: 'Inicio', pathname: '/', show: 'ALWAYS', action: () => navigate('/') },
        { label: 'Pagos', pathname: '/pagos', show: 'AUTH', action: () => navigate('/pagos') },
        { label: 'Registro', pathname: '/registro', show: 'NO_AUTH', action: () => navigate('/registro') },
        { label: 'Login', pathname: '/login', show: 'NO_AUTH', action: () => navigate('/login') }
    ];

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <img src={Logo} width={100} style={{ marginTop: 20, marginBottom: 10 }} />
            <Divider />
            <List>
                {navItems
                    .filter(item => item.show === 'ALWAYS' || (auth && item.show === 'AUTH') || (!auth && item.show === 'NO_AUTH'))
                    .map((item) => (
                        <ListItem key={item.label} disablePadding onClick={() => item.action()}>
                            <ListItemButton sx={{ textAlign: 'center' }}>
                                <ListItemText primary={item.label.toUpperCase()} />
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box>
            <CssBaseline />
            <AppBar position="fixed" sx={{ alignItems: 'center' }}>
                <Toolbar sx={{ width: '100%', maxWidth: '2000px', display: 'flex', justifyContent: 'space-between', px: 2 }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <img src={Logo} width={100} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 4 }}>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems
                                .filter(item => item.show === 'ALWAYS' || (auth && item.show === 'AUTH') || (!auth && item.show === 'NO_AUTH'))
                                .map((item) => (
                                    <Button
                                        key={item.label}
                                        sx={{
                                            backgroundColor: pathname === item.pathname ? '#fff' : '#002561',
                                            color: pathname === item.pathname ? '#002561' : '#fff',
                                            mr: 1,
                                            ml: 1,
                                            ':hover': {
                                                backgroundColor: '#fff',
                                                color: '#002561'
                                            }
                                        }}
                                        onClick={() => item.action()}
                                    >
                                        {item.label}
                                    </Button>
                                ))}
                        </Box>
                        {auth &&
                            <>
                                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                    <ShoppingCartSharpIcon
                                        sx={{
                                            transform: 'scale(1.3)',
                                            transition: '200ms all',
                                            cursor: 'pointer',
                                            ':hover': { transform: 'scale(1.5)' }
                                        }}
                                        onClick={() => setShowCart(!showCart)}
                                    />
                                    <Box sx={{
                                        position: 'absolute',
                                        bottom: -15,
                                        right: -15,
                                        backgroundColor: '#002561',
                                        color: '#fff',
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                    }}>
                                        {productsToBuy.length}
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
                                    <Avatar
                                        sx={{ cursor: 'pointer', backgroundColor: '#FFF', color: '#002561' }}
                                        onMouseEnter={() => setShowUserDropdown(true)}
                                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                                    >
                                        {auth?.user.name.charAt(0).toUpperCase()}
                                    </Avatar>
                                    {showUserDropdown && <UserDropdown setShowUserDropdown={setShowUserDropdown} />}
                                </Box>
                            </>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <CartDrawer />
            <Box sx={{ p: 2, pt: { xs: 9, sm: 10 } }}>
                {children}
            </Box>
        </Box>
    );
}