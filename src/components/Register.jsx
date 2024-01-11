import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserInformation from './UserInformation'


function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({ userName: "", password: "", verifyPassword: "" });
    const [worngExist, setWorngExist] = useState(false);
    const [worngPassword, setWorngPassword] = useState(false);
    const [signUp,setSignUp]= useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    async function saveSignUp(e) {
        e.preventDefault();
        const url = `http://localhost:3000/users/?username=${formData.userName}`
        const response = await fetch(url)
        const data = await response.json()
        const user=data[0]
        if (await user != null) {
            setWorngExist(true)
        }
        else if (formData.password != formData.verifyPassword) {
            setWorngPassword(true)
        }
        else {
            localStorage.setItem("currentUser", JSON.stringify(formData.userName))
            setSignUp(true)
            // fetch('http://localhost:3000/users', {
            //     method: 'POST',
            //     body: JSON.stringify(user),
            //     headers: {
            //         'Content-type': 'application/json; charset=UTF-8',
            //     },
            // })
            //     .then((response) => response.json())
            //     .then((data) => console.log(data));
   
        }
    }

    return (
    <>
        {!signUp && <div className={"continar"} onSubmit={saveSignUp}>
            <form action="#" id="signup" autoComplete="on" >
                <h1>sign up</h1>
                <input name="userName" type="text" placeholder="user name" autoComplete="on" required onChange={handleChange} /><br />
                <input name="password" type="password" placeholder="password" autoComplete="off" required onChange={handleChange} /><br />
                <input name="verifyPassword" type="password" placeholder="verify password" autoComplete="off" required onChange={handleChange} /><br />
                <button id="signUpButton" type="submit">sign up</button>
            </form>
            <button id="toSignUp" onClick={() => { navigate('/login') }}>to log in</button>
            {worngExist && <h3 style={{ color: "red" }}>Existing user, must log in!</h3>}
            {worngPassword && <h3 style={{ color: "red" }}>the password doesn't equal!</h3>}
        </div>}
        {signUp && <UserInformation user={formData}/>}
        </>
    )
}

export default Register