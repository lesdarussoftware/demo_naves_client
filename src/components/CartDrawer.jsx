import { useContext } from 'react';
import { Wallet } from '@mercadopago/sdk-react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Button, CircularProgress } from '@mui/material';

import { MpContext } from '../providers/MpProvider';
import { CartContext } from '../providers/CartProvider';
import { useCheckout } from '../hooks/useCheckout';

const drawerWidth = 300;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export function CartDrawer() {

    const { preferenceId, setPreferenceId } = useContext(MpContext)
    const { showCart, setShowCart } = useContext(CartContext)

    const theme = useTheme();

    const { loading, setLoading, createPreference } = useCheckout()

    const handleConfirm = () => {
        setLoading(true)
        createPreference({
            title: 'esto es una prueba',
            unit_price: '22',
            quantity: '1'
        })
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    }
                }}
                variant="persistent"
                anchor="right"
                open={showCart}
            >
                <DrawerHeader>
                    <IconButton onClick={() => setShowCart(false)}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Box sx={{ pl: 1, pr: 1, pt: preferenceId ? '' : 1 }}>
                    {loading ?
                        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
                            <CircularProgress />
                        </Box> :
                        <>
                            {preferenceId ?
                                <>
                                    <Wallet
                                        initialization={{ preferenceId, redirectMode: 'modal' }}
                                        locale='es-AR'
                                        customization={{ texts: { valueProp: 'payment_methods_logos' } }}
                                    />
                                    <Button
                                        variant='outlined'
                                        sx={{ width: '100%', display: 'block', m: 'auto', mt: 2 }}
                                        onClick={() => {
                                            setShowCart(false)
                                            setPreferenceId(null)
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </> :
                                <Button
                                    variant="contained"
                                    sx={{ width: '100%' }}
                                    onClick={handleConfirm}
                                >
                                    Confirmar
                                </Button>
                            }
                        </>
                    }
                </Box>
            </Drawer>
        </Box>
    );
}
