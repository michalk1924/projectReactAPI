import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { useLocation, Outlet } from 'react-router-dom'
import UserContext from './UserContext'

function Layout() {
    const [user, setUser] = useState()
    const { state } = useLocation()

    useEffect(() => {
        setUser(state)
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