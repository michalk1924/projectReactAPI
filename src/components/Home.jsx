import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate} from 'react-router-dom'
import Info from './Info';
import UserContext from './UserContext'

function Home() {

  const [info, setInfo] = useState(false)

  const [user, setUser] = useState(null)
  const userName = JSON.parse(localStorage.getItem("currentUser"))

  // const { state } = useLocation()
  // console.log(useContext(UserContext));
  // const user = state != null ? state : useContext(UserContext);
  // console.log(user);

  useEffect(() => {
    async function fectchUser() {
      const url = `http://localhost:3000/users/?username=${userName}`
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setUser(data[0])
      }
      else alert("error fetching!")
    }
    fectchUser()
  },[])

  const navigate = useNavigate()

  const logout = () => {
    localStorage.setItem("currentUser", '')
    navigate('/')
  }

  return (
    <div>
      {!user && <h1>loading...</h1>}
      {user && <div className='box'>
        <h1>home page</h1>
        <h1>hello {user.name}</h1>
        {info && <Info user={user} setInfo={setInfo} />}
        <div className="buttons">
          <button onClick={() => setInfo(true)}>info</button>
          <button onClick={logout} >logout</button>
        </div>
      </div>}
    </div>
  )
}

export default Home


