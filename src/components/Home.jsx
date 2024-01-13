import React, { useEffect, useState, createContext,useContext  } from 'react'
import { NavLink, useParams, useLocation, useNavigate, Outlet } from 'react-router-dom'
import Info from './Info';
import UserContext from './UserContext'

function Home() {

  const [info, setInfo] = useState(false)
  // const user = useContext(UserContext);
  const { state } = useLocation()
  const user = state
  const navigate = useNavigate()

  const logout = () => {
    localStorage.setItem("currentUser", '')
    navigate('/')
  }

  return (
    <div className='box'>
      <h1>home page</h1>
      <h1>hello {user.name}</h1>
      {info && <Info user={user} setInfo={setInfo} />}
      <div className="buttons">
        <button onClick={() => setInfo(true)}>info</button>
        <button onClick={logout} >logout</button>
      </div>
    </div>
  )
}

export default Home


