import React, {useContext} from 'react';
import { SESSION } from '../state/SessionProvider';
import { Link } from "react-router-dom";
import './Titlebar.css'
import { PROTOCOL, DOMAIN } from '../state/Env'
import Searchbar from './Searchbar';

  
function Titlebar() {
  const {sessionState, setSessionState} = useContext(SESSION)

  async function onButtonClick() {
    try {
      const logoutCall = await fetch(`${PROTOCOL}://${DOMAIN}/logout`, {credentials: 'include', method: "DELETE"})
      if (logoutCall.status !== 200) {
        throw new Error("Error in logout call")
      }
      // need to handle what to do when on cart page
      setSessionState({id: null, cart: [], purchases: []})
    } catch(e) {
      console.error(e)
      return
    }
  }

  return (
    <nav className="Titlebar">
      <div>
        <Link to="/">Conazon</Link>
      </div>
      <div>
        <Searchbar />
      </div>
      <div>
        {!sessionState.id && <a href={`${PROTOCOL}://${DOMAIN}/auth/google/login`}>Login</a>}
        {sessionState.id && <Link to={"/user/" + sessionState.id}>Profile</Link>}
        {sessionState.id && <Link to={"/cart/"}>Cart</Link>}
        {sessionState.id && <button onClick={() => {onButtonClick()}}>Logout</button>}
      </div>
    </nav>
  );
}

export default Titlebar;