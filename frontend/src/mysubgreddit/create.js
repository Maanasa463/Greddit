import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import '../index.css'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Tooltip from '@mui/material/Tooltip';
import ForumIcon from '@mui/icons-material/Forum';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import GradeIcon from '@mui/icons-material/Grade';

const CreateSg = (props) => {
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [tags, setTags] = useState([" "]);
    const [banWords, setBan] = useState([""]);
    const [user_id, setuser_id] = useState("");
    // const [tag, setTag] = useState("");
    // const [Ban, setban] = useState("");

    const username = localStorage.getItem("username");

    useEffect(() => {

        const config = {
            method: "POST",
            // mode: "cors",
            url: "http://localhost:8000/api/users/user",
            data: {
                username,
            },
            headers: {
                'Content-Type': 'application/json'
            },
        }

        axios(config)
            .then((result) => {
                // console.log(result.data._id);
                let variable = result.data._id;
                setuser_id(variable);
                // console.log(user_id);
            })
            .catch((error) => { alert("failed"); console.log(error); })

        console.log(user_id);

    }, []);

    const navigate = useNavigate();

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleDesc = (event) => {
        setDesc(event.target.value);
    }

    const handleTags = (event) => {

        // setTag(event.target.value);
        let separated = event.target.value;
        let tag = separated.split(",");
        setTags(tag);
    }

    const handleBan = (event) => {
        
        // setban(event.target.value);
        // console.log("hel"+Ban+"hel");
        let separated = event.target.value;
        let bans = separated.split(",");
        setBan(bans);
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const path = "http://localhost:8000/api/mysubgreddit/" + user_id + "/create";
            console.log(path);

            const configuration = {
                method: "POST",
                mode: "cors",
                url: path,
                data: {
                    name,
                    description,
                    tags,
                    banWords
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
                    alert("Created Succesfully!")
                })
                .catch((error) => {
                    console.log(path);
                    alert("Oops! This username already exists")
                });

        }
        catch (err) {
            console.log("hello");

            console.error(err);
        }

    }

    return (
        <>

            <div class="topnav">
                <Tooltip title="LOGOUT" arrow>
                    <a onClick={() => handleLogout()}>
                        <LogoutIcon className="icon" />
                    </a>
                </Tooltip>


                <Tooltip title="DASHBOARD" arrow>
                    <a onClick={() => navigate('/dashboard')}>
                        <DashboardIcon className="icon" />
                    </a>
                </Tooltip>

                <Tooltip title="PROFILE" arrow>
                    <a onClick={() => navigate('/profile')}>
                        <AccountCircleIcon className="icon" />
                    </a>
                </Tooltip>

                <Tooltip title="MY SUB GREDDITS" arrow>
                    <a onClick={() => navigate('/mysubgreddit')}>
                        <ForumIcon className="icon" />
                    </a>
                </Tooltip>

                <Tooltip title="SUB GREDDITS" arrow>
                    <a onClick={() => navigate('/subgreddit')}>
                        <LocalLibraryIcon className="icon" />
                    </a>
                </Tooltip>

                <Tooltip title="SAVED POSTS" arrow>
                    <a onClick={() => navigate('/saveposts')}>
                        <GradeIcon className="icon" />
                    </a>
                </Tooltip>   




            </div>
            <center><h1>Create a new SubGreddit!</h1></center>

            <div class="reg_form">
                <form onSubmit={handleSubmit}>
                    <center>
                        <label>
                            Name
                            <br />
                            <input
                                type="text"
                                class="reg_lab"
                                placeholder="GregSg"
                                value={name}
                                onChange={handleName}
                            />
                        </label>

                        <br />
                        <br />
                        <label>
                            Description
                            <br />
                            <input
                                class="reg_lab"
                                type="text"
                                placeholder="A meeting place for Greg lovers"
                                value={description}
                                onChange={handleDesc}
                            />
                        </label>

                        <br />
                        <br />
                        <label>
                            Tags (Comma Separated)
                            <br />
                            <input
                                class="reg_lab"
                                placeholder="Meet,hello,how"
                                type="text"
                                value={tags}
                                onChange={handleTags}
                            />
                        </label>
                        <br />
                        <br />

                        <label>
                            Banned Keywords (Comma Separated)
                            <br />
                            <input
                                class="reg_lab"
                                placeholder="Hate,Greg,etc"
                                type="text"
                                value={banWords}
                                onChange={handleBan}
                            />
                        </label>
                    </center>
                    <center><input type="submit" value="Create" class="custbutton" /></center>
                </form>
            </div>
        </>
    )
}

export default CreateSg;
