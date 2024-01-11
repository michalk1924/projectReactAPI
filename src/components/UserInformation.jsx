import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function UserInformation({ user }) {

    const navigate = useNavigate();

    const UserInformation = {
        name: '',
        username: user.userName,
        name: '',
        email: '',
        address: {
            street: '',
            suite: '',
            city: '',
            zipcode: '',
            geo: {
                lat: '',
                lng: ''
            },
        },
        phone: '',
        website: user.password,
        company: {
            name: ''
        }
    };

    const [userData, setUserData] = useState(UserInformation)

    const handleChange = (e) => {
        debugger
        const { name, value } = e.target;
        const spalitName = name.split('.')
        console.log(spalitName);
        if (spalitName.length > 1) {
            setUserData((prevUserData) => ({
                ...prevUserData,
                [spalitName[0]]: {
                    ...prevUserData[spalitName[0]],
                    [spalitName[1]]: value
                }
            }));
        }
        else {
            setUserData((prevUserData) => ({ ...prevUserData, [spalitName]: value }))
        }

    };

    const saveDetails = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(fetch(`http://localhost:3000/users?username=${userData.username}`)
                .then((response) => response.json())
                .then((data) =>navigate(`/users/${data[0].id}/`, { state: data[0] }) ))

        
    }

    return (
        <form className={"continar"} onSubmit={saveDetails}>
            <br />
            <label>
                Name:
                <input type="text" name="name" value={userData.name}
                    onChange={handleChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="text" name="email" value={userData.email} onChange={handleChange} />
            </label>
            <br />
            <label>
                Street:
                <input type="text" name="address.street" value={userData.address.street} onChange={handleChange} />
            </label>
            <br />
            <label>
                Suite:
                <input type="text" name="address.suite" value={userData.address.suite} onChange={handleChange} />
            </label>
            <br />
            <label>
                City:
                <input type="text" name="address.city" value={userData.address.city} onChange={handleChange} />
            </label>
            <br />
            <label>
                Zipcode:
                <input type="text" name="address.zipcode" value={userData.address.zipcode} onChange={handleChange} />
            </label>
            <br />
            <label>
                Phone:
                <input type="text" name="phone" value={userData.phone} onChange={handleChange} />
            </label>
            <br />
            <label>
                Company Name:
                <input type="text" name="company.name" value={userData.company.name} onChange={handleChange} />
            </label>
            <br />
            {/* Add similar input fields for other properties in the userData object */}
            <button type="submit">save</button>
        </form>
    );
}

export default UserInformation