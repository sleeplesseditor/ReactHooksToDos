import React, { useContext } from 'react';
import TodosContext from '../context';
import axios from 'axios';

export default function TodoList(){

    const API_LINK = require('../config').endpointAPI;
    const { state, dispatch } = useContext(TodosContext);
    const title = state.todos.length > 0 ? `${state.todos.length} Todos` : "Nothing To Do!";

    return (
        <div className="container mx-auto max-w-md text-center">
            <h1 className="text-bold text-4xl">{title}</h1>
            <ul className="list-reset text-white p-0">
                {state.todos.map(todo => (
                    <li 
                        key={todo.id}
                        className="flex items-center bg-gray-400 my-2 py-4"
                    >
                        <span
                            onDoubleClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo })}
                            className={`flex-1 ml-12 cursor-pointer ${todo.complete && "line-through text-black"}`}
                        >
                            {todo.text}
                        </span>
                        <button
                            onClick={() => dispatch({ type: "SET_CURRENT_TODO", payload: todo })}
                        >
                            <img 
                                src="https://icon.now.sh/edit/0050c5" 
                                alt="Edit Icon"
                                className="px-2 h-4"
                            />
                        </button>
                        <button
                            onClick={async () => {
                                await axios.delete(`${API_LINK}/${todo.id}`)
                                dispatch({ type: "REMOVE_TODO", payload: todo })
                            }}
                        >
                            <img 
                                src="https://icon.now.sh/delete/8b0000" 
                                alt="Delete Icon"
                                className="px-2 h-4"
                            />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}