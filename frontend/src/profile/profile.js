import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "./profile.css"
import profile2 from './profile2.png'
import axios from 'axios'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ForumIcon from '@mui/icons-material/Forum';
import Tooltip from '@mui/material/Tooltip';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import GradeIcon from '@mui/icons-material/Grade';

const Profile = () => {

    const username = localStorage.getItem("username");
    console.log(username);

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [uname, setUname] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [Cnum, setCnum] = useState("");
    const [followers, setFollowers] = useState("");
    const [following, setFollowing] = useState("");

    useEffect(() => {

        const authen = localStorage.getItem("authenticate");
        console.log(authen);

        if (authen) {
            navigate('/profile');
        }

        else {
            navigate('/');
        }

        axios.defaults.headers.common["x-auth-token"] = authen;
        axios.get("http://localhost:8000/api/users/try")
            .then((result) => {
                console.log(result.data);
                let variable = result.data.fname;
                setFname(variable);

                variable = result.data.lname;
                setLname(variable);

                variable = result.data.age;
                setAge(variable);

                variable = result.data.username;
                setUname(variable);

                variable = result.data.cnum;
                setCnum(variable);

                variable = result.data.email;
                setEmail(variable);

                let variable2 = [];
                variable2 = (result.data.followers.length);

                setFollowers(variable2);

                variable2 = (result.data.following.length);
                setFollowing(variable2);
            })
            .catch((error) => { console.log(error); })

    }, []);

    const navigate = useNavigate();

    const handleFollowers = () => {
        navigate('/profile/followers')
    }


    const handleFollowing = () => {
        navigate('/profile/following')
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
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

            <table class="user">
                <tr>
                    <td>
                        <img class="icon" src={profile2}></img>
                    </td>
                    <td>
                        <h1>{uname}</h1>
                    </td>
                </tr>

            </table>


            <div class="userinfo">

                <table>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        {/* <th>Username</th> */}
                        <th>Age</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Followers</th>
                        <th>Following</th>
                    </tr>

                    <tr>
                        <td>{fname}</td>
                        {/* <td>Gregory</td> */}
                        <td>{lname}</td>
                        <td>{age}</td>
                        <td>{email}</td>
                        <td>{Cnum}</td>
                        <td><u><a onClick={() => handleFollowers()}>{followers}</a></u></td>
                        <td><u><a onClick={() => handleFollowing()}>{following}</a></u></td>
                    </tr>
                </table>
                <center>
                    <button className="edit" onClick={() => navigate('/edit')}>Edit</button>
                </center>
            </div>
        </>
    );

};


export default Profile;