import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './login_register/login';
import Profile  from './profile/profile';
import Register from './login_register/Register'
import './index.css'

function App () {
    const [current, setCurrent] = useState('login');

    const change = (log_reg) => {
        setCurrent(log_reg);
    }

    return (<div>{
        
        current === 'login' ? <Login onFormSwitch = {change}/> :  <Register onFormSwitch = {change}/> 
        // <Login />
        // {/* <Register /> */}
        // <
    }</div>);
}

export default App;
