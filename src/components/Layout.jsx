import React, { useEffect, useState } from 'react'
import Header from './Header'
import {useLocation, Outlet} from 'react-router-dom'

function Layout() {
    const [user, setUser]=useState()
    const {state} = useLocation()

    useEffect(()=>{
        setUser(state)
    },[])
    {// const { user } = useParams();
        // const [userId,setUserId]=useState(null)
        // const userName = JSON.parse(localStorage.getItem("userActive"))
        // useEffect(() => {
        //   async function fectchData() {
        //     const url = `http://localhost:3000/users/?username=${userName}`
        //     const response = await fetch(url)
        //     const data = await response.json()
        //     const userId = await data[0].id
        //     setUserId(await userId)
        //   }
        //   fectchData()
        // }, [])}
    }
    return (
        <div>
            {user && <Header user={user}/>}
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout