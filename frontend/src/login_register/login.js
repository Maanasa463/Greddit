import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom/client";
import '../index.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Login = (props) => {

    const [uname, setUname] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const authenticate = localStorage.getItem("authenticate");

        console.log("authenticate" + authenticate);

        if (authenticate) {
           navigate('/dashboard');
        }
        else {
           navigate('/')

        }
      }, []);

    const handleUser = (event) => {
        setUname(event.target.value);
    }

    const handlePass = (event) => {
        setPass(event.target.value);
    }

    const handleSubmit =  (event) => {
        event.preventDefault();
        
        try {
            const username = uname;
            const password = pass;

            const configuration = {
                method: "POST",
                // mode: "cors",
                url: "http://localhost:8000/api/auth",
                data: {
                    username,
                    password,
                },

                headers: {
                    'Content-Type': 'application/json'
                },
            };

            axios(configuration)
                .then((result) => {
                    console.log(result);
                    localStorage.setItem("authenticate", result.data.token);
                    axios.defaults.headers.common["x-auth-token"] = result.data.token;
                    navigate('/dashboard');
                    localStorage.setItem("username", uname);
                })
                .catch((error) => {alert("failed");console.log(error);})
        }

        catch (err) {
            console.error(err);
        }

    }

    const Enable = uname && pass;

    return (
        <>
        <div class="login">
        <center><h1>Welcome Back!</h1></center>
        </div>
        <div class="form">
        <form onSubmit={handleSubmit}>
        <center>
            <label>
                Username
                <br/>
                <input 
                type="text" 
                class="lab"
                placeholder="Gregory"
                value={uname}
                onChange = {handleUser}
                />
            </label>
            <br/>
            <br/>
            <label> 
                Password
                <br/>
                <input
                type="password"
                class="lab"
                placeholder="*******"
                value={pass}
                onChange = {handlePass}
                />
            </label>
        </center>
            
        <center><input type="submit" value="Log In" class="custbutton" disabled={!Enable}/></center>
        
        </form>

        <center>
        <button onClick={() => props.onFormSwitch('register')} class="link">Don't have an account? Register Now!</button>
        </center>

        </div>
        </>
    )
}

export default Login;

