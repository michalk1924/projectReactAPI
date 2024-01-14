import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAllData, add, deleteItem } from '../Tools'
import Photo from './Photo'
import UpdatePhoto from './UpdatePhoto'

function Album() {

    const limit = 8
    const [albumPhotos, setAlbumPhotos] = useState([])
    const { id, albumId } = useParams()
    const [start, setStart] = useState(0)
    const [thereMorePhotos, setThereMorePhotos] = useState(false)
    const [noPhotos, setNoPhotos] = useState(false)
    const [addNewPhoto, setAddNewPhoto] = useState(false)
    const [newPhotoData, setNewPhotoData] = useState({})


    async function fetchPhotos() {
        const url = `http://localhost:3000/photos/?albumId=${albumId}&_start=${start}&_limit=${limit}`
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            if (data.length > 0) {
                setAlbumPhotos(albumPhotos.concat(await data))
                setStart(prevStart => prevStart + 10)
            }
            else {
                if (start == 0) setNoPhotos(true)
            }
            if (data.length < limit) {
                setThereMorePhotos(false)
            }
        }
        else {
            setAlbumPhotos([])
            setNoPhotos(true)
            alert("error fetching!")
        }
    }

    useEffect(() => {
        fetchPhotos().then(setThereMorePhotos(true))
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPhotoData(prevNewPhotoData => ({ ...prevNewPhotoData, [name]: value }))
    }

    const addPhoto = (e) => {
        e.preventDefault();
        const newPhoto = {
            albumId: albumId,
            title: newPhotoData.title,
            thumbnailUrl: newPhotoData.url,
            url: newPhotoData.url
        }
        async function fectchData() {
            const url = `http://localhost:3000/photos/?albumId=${albumId}&_start=0&_limit=${albumPhotos.length + 1}`
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json()
                setAlbumPhotos(await data)
            }
            else alert("error fetching!")
        }
        async function postNewPhoto() {
            const response = await fetch(`http://localhost:3000/photos`, {
                method: 'POST',
                body: JSON.stringify(newPhoto),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            setAddNewPhoto(false)
            if (response.ok) fectchData()
            else alert("error fetching!")
        }
        postNewPhoto()
    }

    return (
        <div>
            <h1>{`album ${albumId}`}</h1>
            {albumPhotos.length == 0 && !noPhotos && <h1>loading...</h1>}
            {noPhotos && <h1>you dont have phots in the album!<br /> let's start!</h1>}

            {albumPhotos.length > 0 &&
                <div className='photos'>
                    {albumPhotos.map(photo => <Photo photo={photo} setAlbumPhotos={setAlbumPhotos} key={photo.id} />)}
                </div>}

            {thereMorePhotos && <button onClick={fetchPhotos}>⏬</button>}
            <button id='addPhotos' className='addButton' onClick={() => setAddNewPhoto(true)} >add new Photo</button>
            
            {addNewPhoto &&
                <form className='add' onSubmit={addPhoto}>
                    <button onClick={() => setAddNewPhoto(false)}>❌</button><br />
                    <label for='title'>enter the title of the Photo</label>
                    <input required value={newPhotoData.title} type='text' name='title' onChange={handleChange} />
                    <label for='url'>enter the url of the Photo</label>
                    <input required value={newPhotoData.url} type='text' name='url' onChange={handleChange} />
                    <button type='submit'>send</button>
                </form>
            }
        </div>
    )
}

export default Album