import React, { useState } from 'react'
import { useNavigate=} from 'react-router-dom'

function LogIn() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ userName: "", password: "" });
    const [worng, setWorng] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const saveLogIn = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/users/?username=${formData.userName}`)
        if (response.ok) {
            const data = await response.json()
            const user = await data[0]
            if (user == null || user.website != formData.password) {
                setWorng(true);
            }
            else {
                localStorage.setItem("currentUser", JSON.stringify(formData.userName))
                navigate(`/users/${data[0].id}/home`, { state: user })
            }
        }
        else alert("error fetching! try later!")
    }

    return (
        <div className={"continar"}>
            <form method="post" action="#" id="login" autoComplete="on" onSubmit={saveLogIn}>
                <h1>log in</h1>
                <input name="userName" type="text" placeholder="user name" autoComplete="on" required onChange={handleChange} /><br />
                <input name="password" type="password" placeholder="password" autoComplete="off" onChange={handleChange} required /><br />
                <button id="logInButton" type="submit">log in</button>
            </form>
            <button id="toSignUp" onClick={() => { navigate("/register"); }}>to sign up</button>
            {worng && <h3 style={{ color: "red" }}>wrong username or password!</h3>}
        </div>
    )
}

export default LogIn
