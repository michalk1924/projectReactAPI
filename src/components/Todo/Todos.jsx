import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAllData, add } from '../../Tools'
import Todo from './Todo'

function Todos() {

  const [allTodos, setAllTodos] = useState([])
  const [todos, setTodos] = useState([])
  const [selectSort, setSelectSort] = useState('serial')
  const { id } = useParams()
  const [searchValue, setSearchValue] = useState()
  const [selectedSearchOption, setSelectedSearchOption] = useState('id')
  const [addNewTodo, setAddNewTodo] = useState(false)
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const [updateTodoDidplay, setUpdateTodoDisplay] = useState(false)


  useEffect(() => {
    fetchAllData('todos', 'userId', id, setTodos, setAllTodos)
  }, [])

  const selectSearchOptions = {
    id: (todo) => searchValue ? todo.id == searchValue : true,
    title: (todo) => searchValue ? todo.title.includes(searchValue) : true,
    completed: (todo) => searchValue ? todo.completed == searchValue : true
  }

  const handleSearchChange = (event) => {
    const { value } = event.target;
  
    if (selectedSearchOption === 'completed') {
      setSearchValue(value === 'V' ? '1' : value === 'X' ? '0' : '');
    } else {
      setSearchValue(value);
    }
  };

  useEffect(() => {
    setTodos(searchValue ? [...allTodos].filter(selectSearchOptions[selectedSearchOption]) : allTodos)
  }, [selectedSearchOption, searchValue, allTodos])

  const handleSearchOptionChange = (event) => {
    setSelectedSearchOption(event.target.value);
  };

  useEffect(() => {
    setTodos(
      searchValue
        ? [...allTodos].filter(selectSearchOptions[selectedSearchOption])
        : allTodos
    );
  }, [selectedSearchOption, searchValue, allTodos]);

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

  const addTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      userId: id,
      title: newTodoTitle,
      completed: false
    }
    add("todos", 'userId', id, newTodo, setAllTodos, setAddNewTodo)
  }


  return (
    <div>
      {!allTodos && <h1>loading...</h1>}
      {allTodos && <div> <h1>todos</h1>
        {todos.map(todo => {
          return <Todo todo={todo} setAllTodos={setAllTodos} key={todo.id} />
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
  <label>
    <input
      type="radio" value="id"
      checked={selectedSearchOption === "id"}
      onChange={handleSearchOptionChange}
    />
    id
  </label>

  <label>
    <input
      type="radio" value="title"
      checked={selectedSearchOption === "title"}
      onChange={handleSearchOptionChange}
    />
    title
  </label>

  {selectedSearchOption !== "completed" && (
    <label>
      <input
        type="radio" value="completed"
        checked={selectedSearchOption === "completed"}
        onChange={handleSearchOptionChange}
      />
      completed
    </label>
  )}

  {selectedSearchOption === "completed" && (
    <div>
      <label>
        <input
          type="radio" value="V"
          checked={searchValue === "1"}
          onChange={handleSearchChange}
        />
        <span role="img" aria-label="V">&#10003;</span>
      </label>

      <label>
        <input
          type="radio" value="X"
          checked={searchValue === "0"}
          onChange={handleSearchChange}
        />
        <span role="img" aria-label="X">&#10007;</span>
      </label>
    </div>
  )}

  <br /> 
  {selectedSearchOption !== "completed" && (
    <input type='search' id='search' onChange={handleSearchChange} />
  )}
</div>

      <button id='addTodo' className='addButton' onClick={() => setAddNewTodo(true)} >add new todo</button>
      {addNewTodo && <div className='add'>
        <button onClick={() => setAddNewTodo(false)}>❌</button><br />
        <label for='addNewTodo'>enter the title of the todo</label>
        <input type='text' name='addNewTodo' onChange={(e) => setNewTodoTitle(e.target.value)} />
        <button onClick={addTodo}>send</button>
      </div>
      }
    </div>
  )
}

export default Todos