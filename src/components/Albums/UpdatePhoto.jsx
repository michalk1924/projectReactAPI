import React, { useState } from 'react'
import { updateItem } from '../../Tools'

function UpdatePhoto({ photo, setAlbumPhotos, setUpdatePhotoDisplay }) {

    const [updatePhotoData, setUpdatePhotoData] = useState(photo)

    const saveUpdate = () => {
        setUpdatePhotoData(prevUpdatePhotoData => ({ ...prevUpdatePhotoData, url: prevUpdatePhotoData[thumbnailUrl] }))
        updateItem("photos", updatePhotoData, setAlbumPhotos)
            .then(setUpdatePhotoDisplay(false))
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatePhotoData(prevUpdatePhotoData => ({ ...prevUpdatePhotoData, [name]: value }))
    }

    return (
        <form className={"update"} onSubmit={saveUpdate}>
            <button onClick={() => setAddNewAlbum(false)}>❌</button><br />
            <label for='title'>enter the title of the Photo</label>
            <input required value={updatePhotoData.title} type='text' name='title' onChange={handleChange} />
            <label for='url'>enter the url of the Photo</label>
            <input required value={updatePhotoData.thumbnailUrl} type='text' name='thumbnailUrl' onChange={handleChange} />
            <button type='submit'>send</button>
        </form>
    )
}

export default UpdatePhoto