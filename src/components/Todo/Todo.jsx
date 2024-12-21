import React, { useState } from 'react'
import UpdateTodo from './UpdateTodo'
import { deleteItem, updateItem } from '../../Tools'

function Todo({ todo, setAllTodos }) {

    const [updateTodoDidplay, setUpdateTodoDisplay] = useState(false)

    const changeTodoCompleted = () => {
        todo.completed = !todo.completed
        updateItem('todos', todo, setAllTodos)
    }

    const deleteTodo = () => {
        deleteItem("todos", todo.id, setAllTodos)
    }

    return (
        <>
            <div className='todo' key={todo.id}>
                <input key={todo.id} type="checkbox" id='completed' name='completed' value='completed' checked={todo.completed}
                    onChange={() => changeTodoCompleted(todo)} />
                <h3> <strong>  id: </strong>{todo.id}  ,</h3>
                <h3> <strong>   title: </strong>{todo.title}</h3>
                <button id='deleteTodoButton' onClick={() => deleteTodo(todo.id)}>🗑️</button>
                <button id='updateTodoButton' onClick={() => setUpdateTodoDisplay(true)}>✏️</button>
            </div>
            {updateTodoDidplay && <UpdateTodo todo={todo} setAllTodos={setAllTodos}
                setUpdateTodoDisplay={setUpdateTodoDisplay} />}
        </>
    )
}

export default Todo
