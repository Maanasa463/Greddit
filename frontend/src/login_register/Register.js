import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import '../index.css'
import axios from "axios"

const Register = (props) => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [Cnum, setCnum] = useState("");
    const [password, setPassword] = useState("");

    const handleFname = (event) => {
        setFname(event.target.value);
    }

    const handleLname = (event) => {
        setLname(event.target.value);
    }

    const handleUser = (event) => {
        setUsername(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleAge = (event) => {
        setAge(event.target.value);
    }

    const handleCnum = (event) => {
        setCnum(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const configuration = {
                method: "POST",
                mode: "cors",
                url: "/api/register",
                data: {
                    fname,
                    lname,
                    username,
                    email,
                    age,
                    Cnum,
                    password,
                },

                headers: {
                    'Content-Type': 'application/json'
                },

                params: {
                    access_token: "hello",
                },
            };

            await axios(configuration)
                .then((result) => {
                    console.log(result);
                    alert("Registered Succesfully!")
                  })
                  .catch((error) => {
                    alert("Oops! This username already exists")
                  });

    } 
    catch(err) {
        console.log("hello");

        console.error(err);
    }
           
    }

    const enable = fname && username && email && password;

    return (
        <>
        <center><h1>Register Now!</h1></center>

        <div class="reg_form">
        <form onSubmit={handleSubmit}>
        <center>
            <label>
                First Name*
                <br/>
                <input 
                type="text" 
                class="reg_lab"
                placeholder="Greg"
                value={fname}
                onChange = {handleFname}
                />
            </label>

            <br/>
            <br/>
            <label> 
                Last Name
                <br/>
                <input
                type="text"
                class="reg_lab"
                placeholder="Thakur"
                value={lname}
                onChange = {handleLname}
                />
            </label>

            <br/>
            <br/>
            <label> 
                Username*
                <br/>
                <input
                class="reg_lab"
                type="text"
                placeholder="Gregory"
                value={username}
                onChange = {handleUser}
                />
            </label>

            <br/>
            <br/>
            <label> 
                Email*
                <br/>
                <input
                class="reg_lab"
                type="text"
                placeholder="tgreg@hotmail.com"
                value={email}
                onChange = {handleEmail}
                />
            </label>

            <br/>
            <br/>
            <label> 
                Age
                <br/>
                <input
                class="reg_lab"
                placeholder="22"
                type="text"
                value={age}
                onChange = {handleAge}
                />
            </label>
            <br/>
            <br/>
            
            <label> 
                Contact Number
                <br/>
                <input
                class="reg_lab"
                type="text"
                placeholder="4654738648"
                value={Cnum}
                onChange = {handleCnum}
                />
            </label>
            <br/>
            <br/>

            <label> 
                Password*
                <br/>
                <input
                class="reg_lab"
                placeholder="Eg. ilovegreg"
                type="password"
                value={password}
                onChange = {handlePassword}
                />
            </label>
            </center>
            <center><input type="submit" value="Register" class="custbutton" disabled={!enable}/></center>
        </form>

        <center>
        <button onClick={() => props.onFormSwitch('login')} class="link">Already have an account? Log in!</button>
        </center>
        </div>
        </>
    )
}

export default Register;
