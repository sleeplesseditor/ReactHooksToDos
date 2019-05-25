import React from 'react';

const TodosContext = React.createContext({
    todos: [
        { id: 1, text: "Kick Ass", complete: false },
        { id: 2, text: "Chew Bubblegum", complete: true },
        { id: 3, text: "Acquire More Bubblegum", complete: false },
    ],
    currentTodo: {}
})

export default TodosContext;