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
import "../profile/profile.css"

const Mysub_Report = () => {

    // const username = localStorage.getItem("username");
    const mysub = localStorage.getItem("mysubsub");
    // console.log(mysub);
    const [reports, setReports] = useState([""]);
    // const [timer, setTimer] = useState(false);
    const [counter, setCounter] = useState(4);
    const [time, setTime] = useState(false)
    // localStorage.setItem("timer", );

    useEffect(() => {
        const api = "http://localhost:8000/api/report/" + mysub + "/report"

        axios.get(api)
        .then((result) => {
            // setName(result.data.name);
            // console.log("---");
            // console.log(result.data);
            setReports(result.data);
            // console.log("---");

        })
        .catch((error) => {console.log(error);})
        
    }, []);

    React.useEffect(() => {
        {
            // console.log("-+-")
            
            var timer = localStorage.getItem("timer");
            // console.log(timer)
            
            if (counter == 4)
                var time = counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);

            else if (counter == 0)
            {
                setTime(false)
                console.log("lolol")
                handleTimer();
            }

            else{ 
                console.log(timer)
                var time = counter > 0 && timer && setTimeout(() => setCounter(counter - 1), 1000);
            }
            
    }
      }, [counter]);
    

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    async function handleIgnore(event) {

        const api = "http://localhost:8000/api/report/" + event + "/ignore"

        const config = {
            method: "POST",
            // mode: "cors",
            url: api,
            headers: {
                'Content-Type': 'application/json'
            },
        };
  
        await axios(config)
        .then((result) => {
            // console.log(result.data._id);
            // let variable = result.data._id;
            window.location.reload()
            // console.log(variable);
        })
        .catch((error) => {console.log(error);})

    }

    async function handlePostDelete(event) {

        const api = "http://localhost:8000/api/report/" + event + "/delete"

        const config = {
            method: "POST",
            // mode: "cors",
            url: api,
            headers: {
                'Content-Type': 'application/json'
            },
        };
  
        await axios(config)
        .then((result) => {
            // console.log(result.data._id);
            // let variable = result.data._id;
            window.location.reload()
            // console.log(variable);
        })
        .catch((error) => {console.log(error);})

    }

    async function handleBlock(event) {

        console.log(event)
        const api = "http://localhost:8000/api/report/" + event + "/block"

        const config = {
            method: "POST",
            // mode: "cors",
            url: api,
            headers: {
                'Content-Type': 'application/json'
            },
        };
  
        await axios(config)
        .then((result) => {
            // console.log(result.data._id);
            // let variable = result.data._id;
            window.location.reload()
            // console.log(variable);
        })
        .catch((error) => {console.log(error);})

    }

    async function handleTimer(event) {

        console.log(localStorage.getItem("rep"))
        if (counter == 0)
        {
            handleBlock(localStorage.getItem("rep"))
            localStorage.removeItem("timer")

        }
        else
        {
            localStorage.setItem("rep", event);
            localStorage.setItem("timer", true)
            // console.log(timer);
            setTime(true)
            // console.log(timer)
        }

            
    }

    async function handleCancel() {

        localStorage.removeItem("timer")
        setTime(false)
        setCounter(4);
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

                <div class="reports">

                <table>
                <tr>
                    <div>
                        <th style={{ width: "100px" }}>
                            Reported By
                        </th>
                        <th style={{ width: "100px" }}>
                            Reported
                        </th>
                        <th style={{ width: "100px" }}>
                            Concern
                        </th>
                        <th style={{ width: "100px" }}>
                            Post
                        </th>
                    </div>
                </tr>
                    <tr>
                    {console.log(reports)}
                        {reports.map((report) => (
                            <div>
                                <td style={{ width: "100px" }}>{report.reportedByName}</td>
                                <td style={{ width: "100px" }}>{report.reportedName}</td>
                                <td style={{ width: "100px" }}>{report.concern}</td>
                                <td style={{ width: "100px" }}>{report.postText}</td>
                                <button className="repbut" onClick={() => handleIgnore(report._id)} >Ignore</button>       
                                {time ? <button className="repbut" disabled= {report.Ignore} onClick={() => handleCancel()}>{counter}</button> : 
                                <button className="repbut" disabled= {report.Ignore} onClick={() => handleTimer(report._id)}>Block User</button>}
                                <button className="repbut" disabled= {report.Ignore} onClick={() => handlePostDelete(report._id)}>Delete Post</button>
                            </div>

                        ))}
                    </tr> 
                    
                </table>
            </div>
        </div>
        </>
    );

};


export default Mysub_Report;