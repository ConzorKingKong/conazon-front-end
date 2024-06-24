import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

function User() {
  const [userInfo, setUserInfo] = useState({name: null, picture: null})
  async function callUser() {
    try {
      const call = await fetch(`http://localhost/api/users/users/${userId}`, {credentials: "include"})
      if (call.status !== 200) {
        throw new Error("Call had an error")
      }
      const json = await call.json()
      setUserInfo(json.data)
    } catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    callUser()
  }, [])

  const {userId} = useParams()
  return <div>{userId}{userInfo.name} {userInfo.picture}</div>
}

export default User;