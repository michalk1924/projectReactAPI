import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { fetchAllData, add, deleteItem, updateItem } from '../Tools'
import UpdateComment from './UpdateComment'
import UserContext from './UserContext'


function Comment({ comment, setComments }) {

    const user = useContext(UserContext);

    const [updateCommentDidplay, setUpdateCommentDisplay] = useState(false)

    debugger

    const deleteComment = () => {
        deleteItem("comments", comment.id, setComments)
    }


    return (
        <div key={comment.id}>
            <h3>{`id: ${comment.id}`}</h3>
            <h2>{`name: ${comment.name}`}</h2>
            <h2>{`email: ${comment.email}`}</h2>
            <p>{comment.body}</p>
            {user.email == comment.email &&
            <div><button onClick={deleteComment}>🗑️</button>
            <button onClick={() => setUpdateCommentDisplay(true)}>✏️</button>
            </div>}
            {updateCommentDidplay && <UpdateComment comment={comment} setComments={setComments}
                setUpdateCommentDisplay={setUpdateCommentDisplay} />}
        </div>
    )
}

export default Comment