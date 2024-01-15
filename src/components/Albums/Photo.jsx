import React, { useState } from 'react'
import { deleteItem } from '../../Tools'
import UpdatePhoto from './UpdatePhoto'

function Photo({ photo, setAlbumPhotos }) {

    const [updatePhotoDidplay, setUpdatePhotoDisplay] = useState(false)

    const deletePhoto = () => {
        deleteItem("photos", photo.id, setAlbumPhotos)
    }

    return (
        <div style={{ backgroundImageSrc: photo.thumbnailUrl }} className='photo'>
            <img src={photo.thumbnailUrl} key={photo.id} ></img>
            <p>{photo.title}</p><br/>
            <button onClick={deletePhoto}>🗑️</button>
            <button onClick={() => setUpdatePhotoDisplay(true)}>✏️</button>
            {updatePhotoDidplay && <UpdatePhoto photo={photo} setAlbumPhotos={setAlbumPhotos}
                setUpdatePhotoDisplay={setUpdatePhotoDisplay} />}
        </div>
    )
}

export default Photo