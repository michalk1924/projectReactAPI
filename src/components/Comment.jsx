import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchAllData, add, deleteItem, updateItem } from '../Tools'
import UpdateComment from './UpdateComment'


function Comment({ comment, setComments }) {

    const [updateCommentDidplay, setUpdateCommentDisplay] = useState(false)

    const deleteComment = ()=>{
        deleteItem("comments", comment.id, setComments)
    }


    return (
        <div key={comment.id}>
            <h3>{`id: ${comment.id}`}</h3>
            <h2>{`name: ${comment.name}`}</h2>
            <h2>{`email: ${comment.email}`}</h2>
            <p>{comment.body}</p>
            <button onClick={deleteComment}>🗑️</button>
            <button onClick={() => setUpdateCommentDisplay(true)}>✏️</button>
            {updateCommentDidplay && <UpdateComment comment={comment} setComments={setComments}
                setUpdateCommentDisplay={setUpdateCommentDisplay} />}
        </div>
    )
}

export default Comment