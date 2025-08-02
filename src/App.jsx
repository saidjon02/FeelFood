// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Cart from './components/Cart';
import CheckOut from './components/CheckOut';
import NotFound from './components/NotFound';
import ScrollToTop from './components/ScrollToTop';

import { SearchProvider } from './components/SearchContext';
import { CartProvider } from './components/Context';

import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import 'boxicons';
import Success from './components/Success';

AOS.init();

// Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <BrowserRouter>
      <Elements stripe={stripePromise}>
        <SearchProvider>
          <CartProvider>
            <ScrollToTop />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckOut />} />
              <Route path="/success" element={<Success />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </CartProvider>
        </SearchProvider>
      </Elements>
    </BrowserRouter>
  );
}

export default App;
