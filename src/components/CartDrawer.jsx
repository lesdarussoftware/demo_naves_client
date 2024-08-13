import { useContext } from 'react';
import { Wallet } from '@mercadopago/sdk-react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

import { MpContext } from '../providers/MpProvider';
import { CartContext } from '../providers/CartProvider';
import { MetamaskContext } from '../providers/MetamaskProvider';
import { useCheckout } from '../hooks/useCheckout';
import { useMetamask } from '../hooks/useMetamask';

import Logo from '../assets/logo.png';

const drawerWidth = 500;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export function CartDrawer() {

    const { account } = useContext(MetamaskContext)
    const { preferenceId, setPreferenceId } = useContext(MpContext)
    const { showCart, setShowCart, productsToBuy, setProductsToBuy } = useContext(CartContext)

    const theme = useTheme();

    const {
        loading,
        setLoading,
        createPreference,
        cartConfirmed,
        setCartConfirmed,
        handlePayWithLds
    } = useCheckout()
    const { connectMetaMask } = useMetamask()

    const handleIncrement = title => {
        setProductsToBuy([
            ...productsToBuy.filter(product => product.title !== title),
            {
                ...productsToBuy.find(p => p.title === title),
                quantity: productsToBuy.find(p => p.title === title)?.quantity + 1 || 1
            }
        ].sort((a, b) => {
            if (a.title > b.title) return 1;
            if (a.title < b.title) return -1;
            return 0;
        }))
    }

    const handleDecrement = title => {
        setProductsToBuy([
            ...productsToBuy.filter(product => product.title !== title),
            {
                ...productsToBuy.find(p => p.title === title),
                quantity: productsToBuy.find(p => p.title === title)?.quantity - 1 || 1
            }
        ].sort((a, b) => {
            if (a.title > b.title) return 1;
            if (a.title < b.title) return -1;
            return 0;
        }))
    }

    const handleRemoveItem = title => {
        setProductsToBuy([...productsToBuy.filter(product => product.title !== title)])
    }

    const handelCancel = () => {
        setShowCart(false)
        setCartConfirmed(false)
        setPreferenceId(null)
    }

    const handlePayWithMp = () => {
        setLoading(true)
        createPreference({ items: productsToBuy })
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
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>Producto</TableCell>
                                <TableCell align='center'>Cantidad</TableCell>
                                <TableCell align='center'>Precio</TableCell>
                                <TableCell align='center'>Eliminar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productsToBuy.length === 0 ?
                                <TableRow>
                                    <TableCell align='center' colSpan={4}>
                                        El carrito está vacío.
                                    </TableCell>
                                </TableRow> :
                                productsToBuy.sort((a, b) => {
                                    if (a.title > b.title) return 1;
                                    if (a.title < b.title) return -1;
                                    return 0;
                                }).map(ptb => (
                                    <TableRow key={ptb.title}>
                                        <TableCell align='center' sx={{ borderBottom: 0 }}>{ptb.title}</TableCell>
                                        <TableCell align='center' sx={{ display: 'flex', alignItems: 'center', borderBottom: 0 }}>
                                            <Button
                                                variant='contained'
                                                disabled={ptb.quantity <= 1 || preferenceId !== null || cartConfirmed}
                                                onClick={() => handleDecrement(ptb.title)}
                                            >
                                                <RemoveIcon />
                                            </Button>
                                            <Typography variant='body1' sx={{ p: 2 }}>
                                                {ptb.quantity}
                                            </Typography>
                                            <Button
                                                variant='contained'
                                                disabled={preferenceId !== null || cartConfirmed}
                                                onClick={() => handleIncrement(ptb.title)}
                                            >
                                                <AddIcon />
                                            </Button>
                                        </TableCell>
                                        <TableCell align='center' sx={{ borderBottom: 0 }}>${(ptb.unit_price * ptb.quantity).toFixed(2)}</TableCell>
                                        <TableCell align='center' sx={{ borderBottom: 0 }}>
                                            <Button
                                                variant='contained'
                                                disabled={preferenceId !== null || cartConfirmed}
                                                onClick={() => handleRemoveItem(ptb.title)}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography variant='h6' align='right' p={2}>
                    Total: ${productsToBuy.reduce((acc, product) => acc + product.unit_price * product.quantity, 0).toFixed(2)}
                </Typography>
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
                                        onClick={handelCancel}
                                    >
                                        Cancelar
                                    </Button>
                                </> :
                                <>
                                    {cartConfirmed ?
                                        <>
                                            <Button
                                                variant="contained"
                                                sx={{ width: '70%', py: 2, display: 'block', m: 'auto', mt: 2 }}
                                                onClick={handlePayWithMp}
                                            >
                                                Pagar con Mercado Pago
                                            </Button>
                                            <Button
                                                variant="contained"
                                                sx={{ width: '70%', py: 2, display: 'block', m: 'auto', mt: 2 }}
                                                onClick={() => {
                                                    if (account) {
                                                        handlePayWithLds(productsToBuy.reduce((acc, product) => {
                                                            return acc + product.unit_price * product.quantity
                                                        }, 0).toFixed(2), () => {
                                                            setCartConfirmed(false)
                                                            setProductsToBuy([])
                                                        })
                                                    } else {
                                                        connectMetaMask()
                                                    }
                                                }}
                                            >
                                                {account ?
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                                                        <span> Pagar con</span>
                                                        <img src={Logo} width={50} />
                                                    </Box> :
                                                    'Conectar Metamask'
                                                }
                                            </Button>
                                            <Button
                                                variant='outlined'
                                                sx={{ width: '70%', py: 2, display: 'block', m: 'auto', mt: 2 }}
                                                onClick={() => setCartConfirmed(false)}
                                            >
                                                Modificar compra
                                            </Button>
                                        </> :
                                        <Button
                                            variant="contained"
                                            sx={{ width: '70%', py: 2, display: 'block', m: 'auto', mt: 2 }}
                                            disabled={productsToBuy.length === 0}
                                            onClick={() => setCartConfirmed(true)}
                                        >
                                            Confirmar
                                        </Button>
                                    }
                                </>
                            }
                        </>
                    }
                </Box>
            </Drawer>
        </Box>
    );
}
