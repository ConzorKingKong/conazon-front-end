import React, {useContext} from 'react';
import { SESSION } from '../state/SessionProvider';
import { Link } from "react-router-dom";
import './Titlebar.css'
import { PROTOCOL, DOMAIN } from '../state/Env'
import Searchbar from './Searchbar';

  
function Titlebar() {
  const {sessionState} = useContext(SESSION)

  return (
    <nav className="Titlebar">
      <div>
        <Link to="/">Conazon</Link>
      </div>
      <div>
        <Searchbar />
      </div>
      <div>
        {!sessionState.id && <Link to={`${PROTOCOL}://${DOMAIN}/auth/google/login`}>Login</Link>}
        {sessionState.id && <Link to={"/user/" + sessionState.id}>Profile</Link>}
        {sessionState.id && <Link to={"/cart/"}>Cart</Link>}
      </div>
    </nav>
  );
}

export default Titlebar;