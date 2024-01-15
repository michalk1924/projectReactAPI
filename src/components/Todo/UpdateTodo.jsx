import React, { useState } from 'react'
import { updateItem } from '../../Tools'

function UpdateTodo({ todo, setAllTodos, setUpdateTodoDisplay }) {

    const [updateTodoData, setUpdateTodoData] = useState(todo)

    const saveUpdate = () => {
        updateItem("todos", updateTodoData, setAllTodos)
            .then(setUpdateTodoDisplay(false))
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateTodoData(prevUpdateTodoData => ({ ...prevUpdateTodoData, [name]: value }))
    }

    return (
        <form className={"update"} onSubmit={saveUpdate}>
            <button onClick={() => setAddNewAlbum(false)}>❌</button><br />
            <label for='title'>enter the title of the Todo</label>
            <input required value={updateTodoData.title} type='text' name='title' onChange={handleChange} />
            <button type='submit'>send</button>
        </form>
    )
}

export default UpdateTodo