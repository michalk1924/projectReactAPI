import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Album() {

    const [albumPhotos, setAlbumPhotos] = useState([])
    const { id } = useParams()
    const [start, setStart] = useState(0)
    const [thereMorePhotos, setThereMorePhotos] = useState(true)
    const [noPhotos, setNoPhotos] = useState(false)

    async function fetchPhotos() {
        const url = `http://localhost:3000/photos/?albumId=${id}&_start=${start}&_limit=10`
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            if (data.length > 0) {
                    setAlbumPhotos(albumPhotos.concat(await data))
                    setStart(prevStart => prevStart + 10)
            }
            else {
                if (start == 0) setNoPhotos(true)
                setThereMorePhotos(false)
            }
            return true
        }
        else {
            setAlbumPhotos([])
            return false
        }
    }

    useEffect(() => {
        fetchPhotos()
    }, [])

    useEffect(() => {
        console.log(albumPhotos);
    }, [albumPhotos])

    return (
        <div>
            {albumPhotos.length == 0 && !noPhotos && <h1>loading...</h1>}
            {noPhotos && <h1>you dont have phots in the album!<br/> let's start!</h1>}
            {albumPhotos.length > 0 &&
                <div>
                    {albumPhotos.map(photo => <img src={photo.thumbnailUrl} key={photo.id} />)}
                    {thereMorePhotos && <button onClick={fetchPhotos}>⏬</button>}
                </div>}
        </div>
    )
}

export default Album