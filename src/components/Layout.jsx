import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useLocation, Outlet } from 'react-router-dom'
import UserContext from './UserContext'

function Layout() {
    const [user, setUser] = useState()
    const { state } = useLocation()

    useEffect(() => {
        async function fectchData() {
            const userName = JSON.parse(localStorage.getItem("currentUser"))
            const url = `http://localhost:3000/users/?username=${userName}`
            const response = await fetch(url)
            const data = await response.json()
            setUser(await data[0])
        }
        state ? setUser(state) : fectchData()
    }, [])


    return (
        <UserContext.Provider value={user}>
            <div>
                {user && <Header user={user} />}
                <main>
                    <Outlet />
                </main>
            </div>
        </UserContext.Provider>
    )
}

export default Layout