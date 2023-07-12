import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "../profile/profile.css"
import axios from 'axios'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ForumIcon from '@mui/icons-material/Forum';
import Tooltip from '@mui/material/Tooltip';
import GroupIcon from '@mui/icons-material/Group';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


const Mysub_Users = () => {

    // const username = localStorage.getItem("username");
    const mysub = localStorage.getItem("mysubsub");
    console.log(mysub);
    const [mod, setMod] = useState("");
    const [unblock, setUnblock] = useState([""]);
    const [block, setBlock] = useState([""]);

    useEffect(() => {
        const api = "http://localhost:8000/api/mysubgreddit/" + mysub + "/users"

        axios.get(api)
        .then((result) => {
            // setName(result.data.name);
            console.log("---");
            console.log(result.data);
            setMod(result.data[0]);
            console.log("---");

            let i = 1;

            let unblocked = [];
            let blocked = [];

            for (i = 1; i < (result.data).length; i++)
            {
                if (result.data[i] === "----")
                {
                    // console.log("i am here");
                    console.log(i)
                    break
                }
                    unblocked.push(result.data[i]);   
            }

            setUnblock(unblocked);

            for (let j = i + 1; j < (result.data).length; j++)
            {
                blocked.push(result.data[j]);

            }

            setBlock(blocked);

        })
        .catch((error) => {console.log(error);})
        
    }, []);

    const navigate = useNavigate();

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

                <Tooltip title="USERS" arrow>
                    <a onClick={() => navigate('/mysubgreddit/subgreddit/users')}>
                        <GroupIcon className="icon" />
                    </a>
                </Tooltip>

                <Tooltip title="REQUESTS" arrow>
                    <a onClick={() => navigate('/mysubgreddit/subgreddit/req')}>
                        <PersonAddIcon className="icon" />
                    </a>
                </Tooltip>

                <Tooltip title="STATISTICS" arrow>
                    <a onClick={() => navigate('/mysubgreddit/subgreddit/stats')}>
                        <ShowChartIcon className="icon" />
                    </a>
                </Tooltip>

                <Tooltip title="REPORTED" arrow>
                    <a onClick={() => navigate('/mysubgreddit/subgreddit/report')}>
                        <ReportProblemIcon className="icon" />
                    </a>
                </Tooltip>

            <div className="users_sub">
                <ul>
                    <li><u><h1 className="sub_title">Moderator</h1></u></li>
                    <li><h2 className="sub">{mod}</h2></li>
                </ul>
            </div>

            <div className="users_sub">
                <ul>
                <u><li><h1 className="sub_title">Unblocked</h1></li></u>
                    {unblock.map((unb) => (
                                <div>
                                    <li><h2 className="sub">{unb}</h2></li>  
                                </div>
                            ))}
                </ul>
            </div>

            <div className="users_sub">
                <ul>
                    <li><u><h1 className="sub_title">Blocked</h1></u></li>
                    {block.map((b) => (
                                <div>
                                    <li><h2 className="sub">{b}</h2></li>  
                                </div>
                            ))}
                </ul>

        </div>

        </div>
        </>
    );

};


export default Mysub_Users;