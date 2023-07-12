import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "../profile/profile.css"
import axios from 'axios'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ForumIcon from '@mui/icons-material/Forum';
import Tooltip from '@mui/material/Tooltip';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import GradeIcon from '@mui/icons-material/Grade';

const Mysubgreddit = () => {

    const authen = localStorage.getItem("authenticate");
    const [Mysub, setMysub] = useState([""]);
    const [mod_id, setmod_id] = useState("");
    const [followers, setfollowers] = useState("");


    async function getSubgreddits() {
        await axios.get("http://localhost:8000/api/mysubgreddit/mysub")
            .then((result) => {
                console.log("---");
                setMysub(result.data);
                console.log(Mysub);
            })
            .catch((error) => { console.log(error); })
    }

    useEffect(() => {

        const authen = localStorage.getItem("authenticate");
        console.log(authen);

        axios.defaults.headers.common["x-auth-token"] = authen;

        getSubgreddits();

    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    async function handleOpen(event) {

        let username = event;
        console.log("user " + username);
        localStorage.setItem("mysubsub", username);
        navigate('/mysubgreddit/subgreddit');
    }


    async function handleDelete(event) {
        //   console.log("username" + event.data);

        let name = event;
        console.log("user " + name);

        const api = "http://localhost:8000/api/mysubgreddit/" + name + "/delete"

        const config = {
            method: "POST",
            url: api,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        await axios(config)
        .then((result) => {
            window.location.reload();

        })
        .catch((error) => {console.log(error);})
        
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
            <br /><br /><br /><br />

            <center>
                <button className="edit" onClick={() => navigate('/mysubgreddit/create')}>Create</button>
            </center>

            <div class="subgreddit">

                {/* <Table data={sub_name}/>; */}
                <table>
                <tr>
                    <div>
                        <th style={{ width: "50px" }}>
                            Name
                        </th>
                        <th style={{ width: "200px" }}>
                            Description
                        </th>
                        <th>
                            Users
                        </th>
                        <th>
                            Posts
                        </th>
                        <th>
                            Ban Words
                        </th>
                    </div>
                </tr>
                    <tr>
                        {Mysub.map((subgred) => (
                            <div>
                                <td style={{width:"100px"}}>{subgred.name}</td>
                                <td style={{width:"200px"}}>{subgred.description}</td>
                                <td>{subgred.blocked && subgred.unblocked && subgred.moderator && subgred.blocked.length + subgred.moderator.length + subgred.unblocked.length}</td>
                                <td>{subgred.post}</td>
                                <td style={{width:"100px"}}>
                                {subgred.banWords && (subgred.banWords).map((ban) =>(
                                    <div>
                                    <p style={{color:"white"}}>{ban},</p>
                                    </div>
                                ))}
                                </td>
                                <td><button className="edit" onClick={() => handleOpen(subgred._id)}>Open</button></td>
                                <td><button className="edit" onClick={() => handleDelete(subgred._id)}>Delete</button></td>

                            </div>
                        ))}
                    </tr>
                </table>

            </div>

        </>
    );

};


export default Mysubgreddit;