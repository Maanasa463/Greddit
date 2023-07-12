import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import '../index.css'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ForumIcon from '@mui/icons-material/Forum';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Tooltip from '@mui/material/Tooltip';
import GradeIcon from '@mui/icons-material/Grade';

const Edit = (props) => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [age, setAge] = useState("");
    const [cnum, setCnum] = useState("");

    const username = localStorage.getItem("username");

    const navigate = useNavigate();

    const handleFname = (event) => {
        setFname(event.target.value);
    }

    const handleLname = (event) => {
        setLname(event.target.value);
    }

    const handleAge = (event) => {
        setAge(event.target.value);
    }

    const handleCnum = (event) => {
        setCnum(event.target.value);
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const configuration = {
                method: "PUT",
                mode: "cors",
                url: "http://localhost:8000/api/users/edit",
                data: {
                    fname,
                    lname,
                    username,
                    age,
                    cnum,
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
                    alert("Editted Successfully!")
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

    return (
        <>

<div class="topnav">
            {/* <a href="#home">PROFILE</a> */}
            <Tooltip title="LOGOUT" arrow>
            <a onClick={ () => handleLogout()}>
            <LogoutIcon className="icon"/>
            </a>
            </Tooltip>

            <Tooltip title="DASHBOARD" arrow>
            <a onClick={ () => navigate('/dashboard')}>
            <DashboardIcon className="icon"/>
            </a>
            </Tooltip>

            <Tooltip title="PROFILE" arrow>
            <a onClick={ () => navigate('/profile')}>
            <AccountCircleIcon className="icon"/>
            </a>
            </Tooltip>

            <Tooltip title="MY SUB GREDDITS" arrow>
            <a onClick={ () => navigate('/mysubgreddit')}>
            <ForumIcon className="icon"/>
            </a>
            </Tooltip>

            <Tooltip title="SUB GREDDITS" arrow>
            <a onClick={ () => navigate('/subgreddit')}>
            <LocalLibraryIcon className="icon"/>
            </a>
            </Tooltip>


            <Tooltip title="SAVED POSTS" arrow>
                    <a onClick={() => navigate('/saveposts')}>
                        <GradeIcon className="icon" />
                    </a>
            </Tooltip>   


        </div>
        <center><h1>Edit!</h1></center>

        <div class="reg_form">
        <form onSubmit={handleSubmit}>
        <center>
            <label>
                First Name
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
                value={cnum}
                onChange = {handleCnum}
                />
            </label>
            
            </center>
            <center><input type="submit" value="Edit" class="custbutton"/></center>
        </form>
        
        </div>
        </>
    )
}

export default Edit;
