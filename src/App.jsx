import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { MpProvider } from './providers/MpProvider';

import { Home } from './pages/Home';
import { Success } from './pages/checkout/Success';
import { Pending } from './pages/checkout/Pending';
import { Failure } from './pages/checkout/Failure';

function App() {
  return (
    <MpProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout-success" element={<Success />} />
          <Route path="/checkout-pending" element={<Pending />} />
          <Route path="/checkout-failure" element={<Failure />} />
        </Routes>
      </BrowserRouter>
    </MpProvider>
  )
}

export default App
