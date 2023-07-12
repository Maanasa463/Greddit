import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom'
import "../profile/profile.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ForumIcon from '@mui/icons-material/Forum';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import axios from 'axios'
import Tooltip from '@mui/material/Tooltip';
import sgicon from './sgicon.png'
import GradeIcon from '@mui/icons-material/Grade';
// import { response } from "express";

const Dashboard = () => {

const username = localStorage.getItem("username");
console.log(username);

const navigate = useNavigate();

useEffect(() => {
    
    const authen = localStorage.getItem("authenticate");
    
    localStorage.setItem("alph", false)
    localStorage.setItem("desc_alph", false)
    localStorage.setItem("follow", false)
    localStorage.setItem("date", false)
    
    console.log(authen);

    if (authen)
    {
        navigate('/dashboard');
    }

    else 
    {
        navigate('/');
    }

    }, []);
    

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
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

        <table class="subgreddit">
            <tr>
                <td>
                    <h1 style={{paddingTop: "50%"}}>SubGreddit Dashboard</h1>
                </td>
            </tr>

        </table>


        </>
    );

};


export default Dashboard;