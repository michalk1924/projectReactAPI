import React, { useState } from 'react'
import { updateItem } from '../../Tools'

function UpdateComment({ comment, setUpdateCommentDisplay, setComments }) {

    const [updateCommentData, setUpdateCommentData] = useState(comment)

    const saveUpdate = () => {
        setUpdateCommentData(prevUpdateCommentData => ({ ...prevUpdateCommentData, url: prevUpdateCommentData[thumbnailUrl] }))
        updateItem("comments", updateCommentData, setComments)
            .then(setUpdateCommentDisplay(false))
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateCommentData(prevUpdateCommentData => ({ ...prevUpdateCommentData, [name]: value }))
    }

    return (
        <form className={"update"} onSubmit={saveUpdate}>
            <button onClick={() => setAddNewAlbum(false)}>❌</button><br />
            <label for='name'>enter the name of the Comment</label>
            <input required value={updateCommentData.name} type='text' name='name' onChange={handleChange} />
            <label for='email'>enter the email of the Comment</label>
            <input required value={updateCommentData.email} type='text' name='email' onChange={handleChange} />
            <label for='body'>enter the email of the Comment</label>
            <input required value={updateCommentData.body} type='text' name='body' onChange={handleChange} />
            <button type='submit'>send</button>
        </form>
    )
}

export default UpdateComment