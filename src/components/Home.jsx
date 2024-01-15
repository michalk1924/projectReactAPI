import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Info from './Info';
import UserContext from './UserContext'

function Home() {

  const [user, setUser] = useState(null)
  const [info, setInfo] = useState(false)

  const { state } = useLocation()
  const userContext = useContext(UserContext)

  async function fectchData() {
    const userName = JSON.parse(localStorage.getItem("currentUser"))
    const url = `http://localhost:3000/users/?username=${userName}`
    const response = await fetch(url)
    const data = await response.json()
    setUser(data[0])
  }

  useEffect(() => {
    state ? setUser(state) : userContext ? setUser(userContext) : fectchData()
  }, [])

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


