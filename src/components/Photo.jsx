import React, { useState } from 'react'
import { deleteItem } from '../Tools'
import UpdatePhoto from './UpdatePhoto'

function Photo({ photo, setAlbumPhotos }) {

    const [updatePhotoDidplay, setUpdatePhotoDisplay] = useState(false)

    const deletePhoto = () => {
        deleteItem("photos", photo.id, setAlbumPhotos)
    }

    return (
        <div style={{ backgroundImageUrl: photo.thumbnailUrl }}>
            <img src={photo.thumbnailUrl} key={photo.id} ></img>
            <button onClick={deletePhoto}>🗑️</button>
            <button onClick={() => setUpdatePhotoDisplay(true)}>✏️</button>
            {updatePhotoDidplay && <UpdatePhoto photo={photo} setAlbumPhotos={setAlbumPhotos}
                setUpdatePhotoDisplay={setUpdatePhotoDisplay} />}
        </div>
    )
}

export default Photo