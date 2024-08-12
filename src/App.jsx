import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';

import { MpProvider } from './providers/MpProvider';
import { CartProvider } from './providers/CartProvider';
import { AuthProvider } from './providers/AuthProvider';

import { Home } from './pages/Home';
import { Success } from './pages/checkout/Success';
import { Pending } from './pages/checkout/Pending';
import { Failure } from './pages/checkout/Failure';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Payments } from './pages/Payments';
import { Error } from './pages/Error';

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#002561',
      }
    },
  })


  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <MpProvider>
          <CartProvider>
            <BrowserRouter basename='demo-naves'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/pagos" element={<Payments />} />
                <Route path="/checkout-success" element={<Success />} />
                <Route path="/checkout-pending" element={<Pending />} />
                <Route path="/checkout-failure" element={<Failure />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </MpProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
