import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './frontend/src/landing_page/home/HomePage';
import Signup from './frontend/src/landing_page/signup/Signup';
import AboutPage from './frontend/src/landing_page/about/AboutPage';
import ProductPage from './frontend/src/landing_page/product/ProductPage';
import Pricingpage from './frontend/src/landing_page/pricing/Pricingpage';
import Supportpage from './frontend/src/landing_page/support/Supportpage';
import NotFound from './frontend/src/NotFound';
import Navbar from './frontend/src/Navbar';
import Footer from './frontend/src/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/product' element={<ProductPage />} />
      <Route path='/pricing' element={<Pricingpage />} />
      <Route path='/support' element={<Supportpage />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);
