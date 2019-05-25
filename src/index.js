import React, { useContext, useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import TodosContext from './context';
import todosReducer from './reducer';
import TodosList from './components/TodoList';
import TodoForm from './components/TodoForm';
import * as serviceWorker from './serviceWorker';

const useAPI = endpoint => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  };

  return data;
};

const App = () => {
    const API_LINK = require('./config').endpointAPI;
    const initialState = useContext(TodosContext);
    const [state, dispatch] = useReducer(todosReducer, initialState);
    const savedTodos = useAPI(`${API_LINK}`)

    useEffect(() => {
        dispatch({
            type: "GET_TODOS",
            payload: savedTodos
        })
    }, [savedTodos]);

    return (
        <TodosContext.Provider value={{ state, dispatch }}>
            <TodoForm />
            <TodosList/>
        </TodosContext.Provider>
    )
}

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
