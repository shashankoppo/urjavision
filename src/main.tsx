import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DataProvider } from './context/DataContext.tsx';
import { CartProvider } from './context/CartContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </DataProvider>
  </StrictMode>
);
