import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import '../App.css'
import UserContext from './UserContext';

function Header({ user }) {
    // const user = useContext(UserContext);

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <div className="links">
            <NavLink to={`/users/${user.id}/home`}
                style={({ isActive }) => isActive ? activeStyles : null}>🏠</NavLink>
            <NavLink to={`/users/${user.id}/todos`}
                style={({ isActive }) => isActive ? activeStyles : null}>todos</NavLink>
            <NavLink to={`/users/${user.id}/posts`}
                style={({ isActive }) => isActive ? activeStyles : null}>posts</NavLink>
            <NavLink to={`/users/${user.id}/albums`}
                style={({ isActive }) => isActive ? activeStyles : null}>albums</NavLink>
        </div>
    )
}

export default Header