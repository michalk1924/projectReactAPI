import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAllData, add } from '../../Tools'
import Post from './Post'

function Posts() {

  const [allPosts, setAllPosts] = useState([])
  const [posts, setPosts] = useState([])
  const [addNewPost, setAddNewPost] = useState(false)
  const [newPostData, setNewPostData] = useState({})
  const [searchValue, setSearchValue] = useState()
  const [selectedSearchOption, setSelectedSearchOption] = useState('id')

  const { id } = useParams()

  useEffect(() => {
    fetchAllData('posts', 'userId', id, setPosts, setAllPosts)
  }, [])

  const selectSearchOptions = {
    id: (todo) => searchValue ? todo.id == searchValue : true,
    title: (todo) => searchValue ? todo.title.includes(searchValue) : true,
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    setPosts(searchValue ? [...allPosts].filter(selectSearchOptions[selectedSearchOption]) : allPosts)
  }, [selectedSearchOption, searchValue, allPosts])

  const handleSearchOptionChange = (event) => {
    setSelectedSearchOption(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPostData(prevNewPostData => ({ ...prevNewPostData, [name]: value }))
  }

  const addPost = () => {
    const newPost = {
      userId: id,
      title: newPostData.title,
      body: newPostData.body
    }
    add('posts', 'userId', id, newPost, setAllPosts, setAddNewPost)
      .then(setNewPostData({}))
  }

  return (
    <div>
      {!allPosts && <h1>loading...</h1>}
      {allPosts && <div> <h1>posts</h1>
        <div className='posts'>{posts.map(post => {
          return <Post post={post} key={post.id} setAllPosts={setAllPosts} />
        })}
        </div></div>}
      <button id='addPosts' className='addButton' onClick={() => setAddNewPost(true)} >add new Post</button>
      {addNewPost &&
        <form className='add' onSubmit={addPost}>
          <button onClick={() => setAddNewPost(false)}>❌</button><br />
          <label for='title'>enter the title of the Post</label>
          <input required value={newPostData.title} type='text' name='title' onChange={handleChange} />
          <label for='url'>enter the body of the Post</label>
          <input required value={newPostData.body} type='text' name='body' onChange={handleChange} />
          <button type='submit'>send</button>
        </form>}
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
    </div>
  )
}

export default Posts