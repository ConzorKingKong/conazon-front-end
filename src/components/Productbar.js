import React from 'react';
import { Link } from "react-router-dom";
import './Productbar.css'

  
function Titlebar(props) {
  return (
    <nav className="Productbar">
      <div>
        <Link to="/products">Products</Link>
      </div>
      <div>
        <Link to="/categories">Categories</Link>
      </div>
      <div>
        <Link to="/about">About</Link>
      </div>
      <div>
        <Link to="/contact">Contact Me</Link>
      </div>
    </nav>
  );
}

export default Titlebar;