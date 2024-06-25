import React from 'react';
import { Link } from "react-router-dom";
import './Titlebar.css'
import Searchbar from './Searchbar';

  
function Titlebar(props) {
  return (
    <nav className="Titlebar">
      <div>
        <Link to="/">Conazon</Link>
        <Link to="/about">About</Link>
      </div>
      <div>
        <Link to="/products">Products</Link>
        <Searchbar />
      </div>
      <div>
        {!props.id && <Link to="http://localhost:8080/auth/google/login">Login</Link>}
        {props.id && <Link to={"/user/" + props.id}>Profile</Link>}
        {props.id && <Link to={"/cart/"}>Cart</Link>}
      </div>
    </nav>
  );
}

export default Titlebar;