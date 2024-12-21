import React, { useState } from 'react'
import { updateItem } from '../../Tools'

function UpdatePost({ post, setAllPosts, setUpdatePostDisplay }) {

    const [updatePostData, setUpdatePostData] = useState(post)

    const saveUpdate = () => {
        updateItem("posts", updatePostData, setAllPosts)
            .then(setUpdatePostDisplay(false))
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatePostData(prevUpdatePostData => ({ ...prevUpdatePostData, [name]: value }))
    }

    return (
        <form className={"update"} onSubmit={saveUpdate}>
            <button onClick={(e) => {
                setUpdatePostDisplay(false)
                e.stopPropagation();
            }}>❌</button><br />
            <label for='title'>enter the title of the Post</label>
            <input required value={updatePostData.title} type='text' name='title' onChange={handleChange} />
            <label for='body'>enter the body of the Post</label>
            <input required value={updatePostData.body} type='text' name='body' onChange={handleChange} />
            <button type='submit'>send</button>
        </form>
    )
}

export default UpdatePost