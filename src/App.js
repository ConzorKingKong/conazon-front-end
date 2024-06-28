import React, {useState, useEffect} from 'react'
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

function App() {
  const [session, setSession] = useState({id: null, cart: null, purchases: null})

  async function checkSession() {
    try {
      const sessionCall = await fetch("http://localhost/api/verify", {credentials: "include"})
      console.log(sessionCall)
      if (!sessionCall.ok) {
        throw new Error("session call error")
      }
      const sessionJson = await sessionCall.json()
      const id = sessionJson.data.id
      const cartCall = await fetch(`http://localhost/api/cart/user/${id}`, {credentials: "include"})
      if (!cartCall.ok) {
        throw new Error("Cart call error")
      }
      const cartJson = await cartCall.json()
      const purchasesCall = await fetch(`http://localhost/api/checkout/user/${id}`, {credentials: "include"})
      if (!purchasesCall.ok) {
        throw new Error("Purchases call error")
      }
      const purchasesJson = await purchasesCall.json()
      setSession({id, cart: cartJson.data, purchases: purchasesJson.data})
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    checkSession()
  }, [])

  return (
    <div>
      <Titlebar id={session.id} />
      <Productbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<Product />}/>
        <Route path="/user/:userId" element={<User id={session.id} cart={session.cart} purchases={session.purchases} />}/>
        <Route path="/cart" element={<Cart cart={session.cart} />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
