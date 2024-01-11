import { useContext } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import ReactDOM from "react-dom/client";
import './App.css'
import LogIn from './components/LogIn';
import Register from './components/Register'
import Home from './components/Home'
import Todos from './components/Todos';
import ErrorPage from './components/ErrorPage';
import Layout from './components/Layout';
import Albums from './components/Albums';
import Posts from './components/Posts';
import Album from './components/Album';

function App() {
//s?_start=0&_limit=10
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='login' />} />
          <Route path='login' element={<LogIn />} />
          <Route path='register' element={<Register />} />
          <Route path='users/:id/' element={<Navigate to='home' />} />
          <Route path={`users/:id/`} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={`todos`} element={<Todos />} />
            <Route path={`albums`} element={<Albums />} />
            <Route path={`albums/:id`} element={<Album />} />
            <Route path={`posts`} element={<Posts />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App