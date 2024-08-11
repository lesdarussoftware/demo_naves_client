import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { MpProvider } from './providers/MpProvider';
import { CartProvider } from './providers/CartProvider';
import { AuthProvider } from './providers/AuthProvider';

import { Home } from './pages/Home';
import { Success } from './pages/checkout/Success';
import { Pending } from './pages/checkout/Pending';
import { Failure } from './pages/checkout/Failure';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

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
                <Route path="/checkout-success" element={<Success />} />
                <Route path="/checkout-pending" element={<Pending />} />
                <Route path="/checkout-failure" element={<Failure />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </MpProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
