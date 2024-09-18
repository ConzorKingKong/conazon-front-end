import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Titlebar from './components/Titlebar';
import Productbar from './components/Productbar'
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact'
import Categories from './pages/Categories'
import Products from './pages/Products';
import Product from './pages/Product';
import User from './pages/User'
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  return (
    <div>
      <Titlebar />
      <Productbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<Product />}/>
        <Route path="/user/:userId" element={<User />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/checkout" element={<Checkout />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
