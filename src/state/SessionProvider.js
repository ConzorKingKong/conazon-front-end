import {createContext, useState, useEffect} from 'react'
import { PROTOCOL, DOMAIN } from '../state/Env'

export const SESSION = createContext({})

function SessionProvider({children}) {
  const [sessionState, setSessionState] = useState({id: null, cart: [], purchases: []})

  async function checkSession() {
    try {
      const sessionCall = await fetch(`${PROTOCOL}://${DOMAIN}/api/verify`, {credentials: "include"})
      if (!sessionCall.ok) {
        throw new Error("session call error")
      }
      const sessionJson = await sessionCall.json()
      const {id} = sessionJson.data
      const calls = await Promise.all([fetch(`${PROTOCOL}://${DOMAIN}/api/cart/`, {credentials: "include"}), fetch(`${PROTOCOL}://${DOMAIN}/api/checkout/`, {credentials: "include"})])
      const jsons = await Promise.all(calls.map(item => item.json()))
      setSessionState({id, cart: jsons[0].data, purchases: jsons[1].data})
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    checkSession()
  }, [])

  return (
    <SESSION.Provider value={{sessionState, setSessionState}}>
      {children}
    </SESSION.Provider>
  )

}

export default SessionProvider