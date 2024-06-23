import React, {useState, useEffect} from 'react'
import { Route, Routes } from 'react-router-dom';
import Titlebar from './components/Titlebar';
import Searchbar from './components/Searchbar';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Product from './pages/Product';
import User from './pages/User'
import NotFound from './pages/NotFound';

function App() {
  const [session, setSession] = useState({id: null})

  async function checkSession() {
    try {
      const sessionCall = await fetch("http://localhost/api/users/verify/", {credentials: "include"})
      if (!sessionCall.ok) {
        throw new Error("call bad potentially cors")
      }
      const json = await sessionCall.json()
      setSession(json.message)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    checkSession()
  }, [])

  console.log(session)
  return (
    <div>
      <Titlebar id={session.id} />
      <Searchbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<Product />}/>
        <Route path="/user/:userId" element={<User />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
