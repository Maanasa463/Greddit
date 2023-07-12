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
import { display } from "@mui/system";

const Saved_posts = () => {

    // const username = localStorage.getItem("username");
    const mysub = localStorage.getItem("mysubsub");
    const authen = localStorage.getItem("authenticate")
    var id;
    console.log(mysub);
    // const [mod, setMod] = useState("");
    const [post, setPost] = useState([""]);
    const [sub, setSub] = useState([""]);


    useEffect(() => {

        const api = "http://localhost:8000/api/users/savedPost"

        axios.defaults.headers.common["x-auth-token"] = authen;
        axios.get(api)
        .then((result) => {
            // setName(result.data.name);
            console.log("---");
            console.log(result.data);

            let posts = [];

            for (let i = 0; i < (result.data).length; i += 2)
            {   
                posts.push(result.data[i]);
            }

            setPost(posts);

            let Sub = [];

            for (let i = 1; i < (result.data).length; i += 2)
            {   
                Sub.push(result.data[i]);
            }

            setSub(Sub);
        })
        .catch((error) => {console.log(error);})
        
    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    async function handleRemove(event) {
        
        var rem = event;
        console.log(rem);

        axios.defaults.headers.common["x-auth-token"] = authen;
        await axios.get("http://localhost:8000/api/users/try")
            .then((result) => {
               id = result.data._id
            })
            .catch((error) => { console.log(error); })

            // var id = uid;

            const api = "http://localhost:8000/api/users/" + id + "/remove_saved"

            const config = {
                method: "POST",
                url: api,
                data: {
                    rem,
                },
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


            <div className="users_sub">
                <ul>
                <u><li><h1 className="sub_title">Subgreddit</h1></li></u>
                    {sub.map((sg) => (
                                <div>
                                    <li><h2 className="sub">{sg}</h2></li>  
                                </div>
                            ))}
                </ul>
            </div>

            <div className="users_sub">
                <ul>
                    <li><u><h1 className="sub_title">Post</h1></u></li>
                    {post.map((p) => (
                                <div>
                                    <li>
                                    <h2 className="sub">{p.text} 
                                    <button className="save_edit" onClick={() => handleRemove(p._id)}>Remove</button>
                                    </h2> 
                                    </li>
                                </div>
                            ))}
                </ul>

        </div>

        </div>
        </>
    );

};


export default Saved_posts;