import React, { useEffect, useState } from 'react'
import { useParams, Link, Outlet } from 'react-router-dom'
import { fetchAllData, add } from '../../Tools'

function Albums() {

    const [allAlbums, setAllAlbums] = useState([])
    const [albums, setAlbums] = useState([])
    const [searchValue, setSearchValue] = useState()
    const [selectedSearchOption, setSelectedSearchOption] = useState('id')
    const { id } = useParams()
    const [addNewAlbum, setAddNewAlbum] = useState(false)
    const [newAlbumTitle, setNewAlbumTitle] = useState('')

    useEffect(() => {
        fetchAllData('albums', 'userId', id, setAlbums, setAllAlbums)
    }, [])

    useEffect(() => {
        setAlbums(searchValue ? [...allAlbums].filter(selectSearchOptions[selectedSearchOption]) : allAlbums)
    }, [selectedSearchOption, searchValue, allAlbums])

    const selectSearchOptions = {
        id: (album) => searchValue ? album.id == searchValue : true,
        title: (album) => searchValue ? album.title.includes(searchValue) : true,
    }

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchOptionChange = (event) => {
        setSelectedSearchOption(event.target.value);
    };

    useEffect(() => {
        setAlbums(searchValue ? [...allAlbums].filter(selectSearchOptions[selectedSearchOption]) : allAlbums)
    }, [selectedSearchOption, searchValue, allAlbums])

    const addAlbum = () => {
        debugger
        const newAlbum = {
            userId: id,
            title: newAlbumTitle
        }
        add("albums", 'userId', id, newAlbum, setAllAlbums, setAddNewAlbum)
    }


    return (
        <div>
            {!allAlbums && <h1>loading...</h1>}
            {allAlbums && <h1>albums</h1>}
            {allAlbums && <div className='albums'>
                {albums.map(album => {
                    return <Link to={`./${album.id}/photos`} key={album.id}><div className='album'>
                        <p> <strong> id: </strong>{album.id}<br /><br />
                            {album.title}</p>
                    </div>
                    </Link>
                })}
            </div>}
            <div className='search'>
                <label><input
                    type="radio" value="id"
                    checked={selectedSearchOption === "id"}
                    onChange={handleSearchOptionChange} />id</label>

                <label><input
                    type="radio" value="title"
                    checked={selectedSearchOption === "title"}
                    onChange={handleSearchOptionChange} />title</label>

                <br /> <input type='search' id='search' onChange={handleSearchChange} />
            </div>
            <div className='addContinar'>
                <button id='addAlbums' className='addButton' onClick={() => setAddNewAlbum(true)} >add new album</button>
                {addNewAlbum && <div className='add'>
                    <button onClick={() => setAddNewAlbum(false)}>❌</button><br />
                    <label for='addNewAlbum'>enter the title of the alnum</label>
                    <input type='text' name='addNewAlbum' onChange={(e) => setNewAlbumTitle(e.target.value)} />
                    <button onClick={addAlbum}>send</button>
                </div>
                }
            </div>
        </div>
    )
}

export default Albums
