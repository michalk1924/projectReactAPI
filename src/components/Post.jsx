import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchAllData, add, deleteItem, updateItem } from '../Tools'
import UpdatePost from './UpdatePost'

function Post({ post ,setAllPosts }) {

    const [displayMore, setDisplayMore] = useState(false)
    const [updatePostDidplay, setUpdatePostDisplay] = useState(false)

    const deletePost= () => {    
        deleteItem("posts", post.id, setAllPosts)
    }

    return (
        <div className='post'  key={post.id} onClick={() => setDisplayMore(!displayMore)}>
            <h3><strong> id: </strong>{post.id}</h3>
            <h2>{post.title}</h2>
            {displayMore && <p>{post.body}</p>}
            <Link to={`./${post.id}/comments`}>comments</Link>
            <button onClick={deletePost}>🗑️</button>
            <button onClick={() => setUpdatePostDisplay(true)}>✏️</button>
            {updatePostDidplay && <UpdatePost post={post} setAllPosts={setAllPosts}
            setUpdatePostDisplay={setUpdatePostDisplay} />}
        </div>
    )
}

export default Post
