import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAllData, add } from '../Tools'

function Todos() {

  const [allTodos, setAllTodos] = useState([])
  const [todos, setTodos] = useState([])
  const [selectSort, setSelectSort] = useState('serial')
  const { id } = useParams()
  const [searchValue, setSearchValue] = useState()
  const [selectedSearchOption, setSelectedSearchOption] = useState('id')
  const [addNewTodo, setAddNewTodo] = useState(false)
  const [newTodoTitle, setNewTodoTitle] = useState('')


  useEffect(() => {
    fetchAllData('todos', id, setTodos, setAllTodos)
  }, [])

  const selectSearchOptions = {
    id: (todo) => searchValue ? todo.id == searchValue : true,
    title: (todo) => searchValue ? todo.title.includes(searchValue) : true,
    completed: (todo) => searchValue ? todo.completed == searchValue : true
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    setTodos(searchValue ? [...allTodos].filter(selectSearchOptions[selectedSearchOption]) : allTodos)
  }, [selectedSearchOption, searchValue, allTodos])

  const handleSearchOptionChange = (event) => {
    setSelectedSearchOption(event.target.value);
  };

  const selectSortOptions = {
    serial: (a, b) => a.id - b.id,
    execution: (a, b) => a.completed - b.completed,
    alphabetical: (a, b) => a.title > b.title ? 1 : -1,
    random: (a, b) => Math.random() < 0.5 ? 1 : -1
  }

  useEffect(() => {
    setTodos((prevTodos) => {
      return [...prevTodos].sort(selectSortOptions[selectSort])
    })
  }, [selectSort, allTodos])

  const handleSelectChange = (event) => {
    setSelectSort(event.target.value);
  };

  const addTodo = () => {
    const newTodo = {
      userId: id,
      title: newTodoTitle,
      completed: false
    }
    add("todos", id, newTodo,setAllTodos, setAddNewTodo)
}

const changeTodo = (todo, type) => {
  async function putTodo() {
    debugger
    const updateTodo = {
      id: todo.id,
      userId: todo.userId,
      title: type == 'title' ? todo.title : todo.title,
      completed: type == 'completed' ? !todo.completed : todo.completed
    }
    fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify(updateTodo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(setAllTodos((prevAllTodos) => [...prevAllTodos].map(t => t.id == todo.id ? updateTodo : t)))
  }
  putTodo()
}

const deleteTodo = (todoId) => {
  async function innerDelete() {
    debugger
    fetch(`http://localhost:3000/todos/${todoId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(setAllTodos((prevAllTodos) => [...prevAllTodos].filter(t => t.id != todoId)))
  }
  innerDelete()
}

return (
  <div>
    {!allTodos && <h1>loading...</h1>}
    {allTodos && <div> <h1>todos</h1>
      {todos.map(todo => {
        return <div className='todo' key={todo.id}>
          <input key={todo.id} type="checkbox" id='completed' name='completed' value='completed' checked={todo.completed}
            onChange={() => changeTodo(todo, 'completed')} />
          <strong> id: </strong>{todo.id}
          <strong>   title: </strong>{todo.title}
          {/* <label for='completed'>completed</label> */}
          <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
        </div>
      })}
    </div>}
    <div className='selectSort' >
      <select name="sort" id="sort" onChange={handleSelectChange}>
        <option value="serial">serial</option>
        <option value="execution">execution</option>
        <option value="alphabetical">alphabetical</option>
        <option value="random">random</option>
      </select>
    </div>
    <div className='search'>
      <label><input
        type="radio" value="id"
        checked={selectedSearchOption === "id"}
        onChange={handleSearchOptionChange} />id</label>

      <label><input
        type="radio" value="title"
        checked={selectedSearchOption === "title"}
        onChange={handleSearchOptionChange} />title</label>

      <label><input
        type="radio" value="completed"
        checked={selectedSearchOption === "completed"}
        onChange={handleSearchOptionChange} />completed</label>

      <br /> <input type='search' id='search' onChange={handleSearchChange} />
    </div>
    <div className='add'>
      <button id='addTodos' onClick={() => setAddNewTodo(true)} >add new todo</button>
      {addNewTodo && <div>
        <button onClick={() => setAddNewTodo(false)}>❌</button>
        <label for='addNewTodo'>enter the title of the todo</label>
        <input type='text' name='addNewTodo' onChange={(e) => setNewTodoTitle(e.target.value)} />
        <button onClick={addTodo}>send</button>
      </div>
      }
    </div>
  </div>
)
}

export default Todos