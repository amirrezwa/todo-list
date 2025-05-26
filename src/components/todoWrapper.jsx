import React, { useState } from 'react';
import TodoForm from './todoForm';
import EditTodoForm from './editTodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './todo';

const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = (todo) => {
        setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }]);
    };

    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const editTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
            )
        );
    };

    const updateTodo = (task, id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, task: task, isEditing: false } : todo
            )
        );
    };

    return (
        <div className='TodoWrapper'>
            <h1>Get This Done!</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm 
                        editTodo={updateTodo} 
                        task={todo} 
                        key={index} 
                    />
                ) : (
                    <Todo
                        task={todo}
                        key={index}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                    />
                )
            ))}
        </div>
    );
};

export default TodoWrapper;
