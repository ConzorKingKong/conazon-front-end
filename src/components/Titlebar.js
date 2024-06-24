import React from 'react';
import {
  Link
} from "react-router-dom";
import './Titlebar.css'

  
function Titlebar(props) {
  console.log("PROPS", props.id)
  return (
    <nav className="Titlebar">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/products">Products</Link>
      {!props.id && <Link to="http://localhost:8080/auth/google/login">Login</Link>}
      {props.id && <Link to={"/user/" + props.id}>Profile</Link>}
      {props.id && <Link to={"/cart/"}>Cart</Link>}
    </nav>
  );
}

export default Titlebar;