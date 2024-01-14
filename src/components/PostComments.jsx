import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAllData, add} from '../Tools'
import Comment from './Comment'

function PostComments() {

    const [comments, setComments] = useState([])
    const [addNewComment, setAddNewComment] = useState(false)
    const [newCommentData, setNewCommentData] = useState({})

    const { postId } = useParams()

    useEffect(() => {
        fetchAllData('comments', 'postId', postId, setComments)
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCommentData(prevNewCommentData => ({ ...prevNewCommentData, [name]: value }))
    }

    const addComment = (e) => {
        e.preventDefault();
        const newComment = {
            postId: postId,
            name: newCommentData.name,
            email: newCommentData.email,
            body: newCommentData.body
        }
        add('comments', 'postId', postId, newComment, setComments, setAddNewComment)
    }

    return (
        <div>
            <h1>{`post ${postId} comments`}</h1>
            {comments.map(comment => {
                return <Comment comment={comment} setComments={setComments} key={comment.id} />
            })}
            <div className='addContinar'>
                <button id='addComments' className='addButton' onClick={() => setAddNewComment(true)} >add new comment</button>
                {addNewComment &&
                    <form className='add' onSubmit={addComment}>
                        <button onClick={() => setAddNewComment(false)}>❌</button><br />
                        <label for='name'>enter the name of the Comment</label>
                        <input required value={newCommentData.title} type='text' name='name' onChange={handleChange} />
                        <label for='email'>enter the email of the Comment</label>
                        <input required value={newCommentData.url} type='text' name='email' onChange={handleChange} />
                        <label for='body'>enter the body of the Comment</label>
                        <input required value={newCommentData.url} type='text' name='body' onChange={handleChange} />
                        <button type='submit'>send</button>
                    </form>
                }
            </div>
        </div>
    )
}

export default PostComments