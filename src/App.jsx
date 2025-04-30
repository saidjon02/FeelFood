import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import CardList from './components/CardList';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound';
import './App.css';
import 'boxicons';
import { SearchProvider } from './components/SearchContext';
import CheckOut from './components/CheckOut';
import Login from './components/Login';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './components/Home';
AOS.init();
function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/login" element={<Login />} />
          <Route path="/list/:id" element={<CardList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </SearchProvider>
    </BrowserRouter>
  );
}
export default App;
