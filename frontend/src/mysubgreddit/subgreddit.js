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
import GradeIcon from '@mui/icons-material/Grade';

const Mysubgreddit_Subgreddit = () => {

    const mysub = localStorage.getItem("mysubsub");
    console.log(mysub);
    const [name, setName] = useState("");

    useEffect(() => {
        const api = "http://localhost:8000/api/mysubgreddit/" + mysub + "/get"

        axios.get(api)
        .then((result) => {
            setName(result.data.name);
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


                <Tooltip title="SAVED POSTS" arrow>
                    <a onClick={() => navigate('/saveposts')}>
                        <GradeIcon className="icon" />
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

            <h1 className="welcome">{name}</h1>

            </div>
        </>
    );

};


export default Mysubgreddit_Subgreddit;