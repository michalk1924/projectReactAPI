import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import './App.css'
import LogIn from './components/LogIn';
import Register from './components/Register'
import Home from './components/Home'
import Todos from './components/Todo/Todos';
import ErrorPage from './components/ErrorPage';
import Layout from './components/Layout';
import Albums from './components/Albums/Albums';
import Posts from './components/Posts/Posts';
import Album from './components/Albums/Album';
import PostComments from './components/Posts/PostComments';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='login' />} />
          <Route path='login' element={<LogIn />} />
          <Route path='register' element={<Register />} />
          <Route path='users/:id/' element={<Navigate to='home' />} />
          <Route path='users/:id/' element={<Layout />}>
            <Route path='home' element={<Home />} />
            <Route path='todos' element={<Todos />} />
            <Route path='albums' element={<Albums />} />
            <Route path='albums/:albumId/photos' element={<Album />} />
            <Route path='posts' element={<Posts />} />
            <Route path='posts/:postId/comments' element={<PostComments />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App