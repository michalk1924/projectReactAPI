import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchAllData, add, deleteItem, updateItem } from '../../Tools'
import UpdatePost from './UpdatePost'

function Post({ post, setAllPosts }) {

    const [displayMore, setDisplayMore] = useState(false)
    const [updatePostDidplay, setUpdatePostDisplay] = useState(false)

    const deletePost = () => {
        deleteItem("posts", post.id, setAllPosts)
        e.stopPropagation();
    }

    return (
        <>
            <div className='post' style={displayMore ? { borderWidth: '5px' } : {}} key={post.id}
                onClick={() => setDisplayMore(!displayMore)}>
                <h3><strong> id: </strong>{post.id}</h3>
                <h2>{post.title}</h2>
                {displayMore && <p>{post.body}</p>}
                <Link to={`./${post.id}/comments`}>comments</Link>
                <button id='deleteButton' onClick={deletePost}>🗑️</button>
                <button id='updateButton' onClick={(e) => {
                    setUpdatePostDisplay(true)
                    e.stopPropagation();
                }}>✏️</button>
            </div>
            {updatePostDidplay && <UpdatePost post={post} setAllPosts={setAllPosts}
                setUpdatePostDisplay={setUpdatePostDisplay} />}
        </>
    )
}

export default Post
