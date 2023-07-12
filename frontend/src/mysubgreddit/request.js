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
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GradeIcon from '@mui/icons-material/Grade';

const Mysub_Req = () => {

    // const username = localStorage.getItem("username");
    const mysub = localStorage.getItem("mysubsub");
    // console.log(mysub);
    var rem;
    var reqname;
    // const [rem, setRem] = useState("");
    const [pending, setPending] = useState([""]);
    
    useEffect(() => {
        const api = "http://localhost:8000/api/mysubgreddit/" + mysub + "/pending"

        axios.get(api)
        .then((result) => {
            // setName(result.data.name);

            let pendings = [];
            // let blocked = [];

            for (let i = 0; i < (result.data).length; i++)
            {
                pendings.push(result.data[i]);   
            }

            setPending(pendings);
        })
        .catch((error) => {console.log(error);})
        
    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    async function handleReject(pend) {
    
        const username = pend;
        console.log(username);

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
        };

        await axios(config)
        .then((result) => {
          let variable = result.data._id;
        //   setRem(result.data._id);
            rem = result.data._id;
        })
        .catch((error) => {console.log(error);})

        const api = "http://localhost:8000/api/mysubgreddit/" + mysub + "/reject"
        console.log(rem);

        const config_reject = {
            method: "POST",
            // mode: "cors",
            url: api,
            data: {
                rem,
            },
            headers: {
                'Content-Type': 'application/json'
            },
        };

        await axios(config_reject)
        .then((result) => {
            window.location.reload();
        })
        .catch((error) => {console.log(error);})
    }


    async function handleAccept(pend) {
    
        const username = pend;
        console.log(username);

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
        };

        await axios(config)
        .then((result) => {
        //   let variable = result.data._id;
        //   setRem(result.data._id);
            reqname = result.data._id;
        })
        .catch((error) => {console.log(error);})

        const api = "http://localhost:8000/api/mysubgreddit/" + mysub + "/accept_req"
        // console.log(reqname);

        const config_accept = {
            method: "POST",
            // mode: "cors",
            url: api,
            data: {
                reqname,
            },
            headers: {
                'Content-Type': 'application/json'
            },
        };

        await axios(config_accept)
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

                <div className="users_pend">
                <ul>
                <li><h1 className="sub_title">Pending</h1></li>
                    {pending.map((pend) => (
                                <div>
                                    <li><h2 className="sub">{pend}</h2> 
                                    <button className="req" onClick={() => handleAccept(pend)}>Accept</button> 
                                    <button className="req" onClick={() => handleReject(pend)}>Reject</button></li> 
                                </div>
                    ))}
                    <br/>
                </ul>
            </div>
        </div>


        </>
    );

};


export default Mysub_Req;