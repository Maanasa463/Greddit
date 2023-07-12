import './follow.css'
import axios from 'axios'
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ForumIcon from '@mui/icons-material/Forum';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Tooltip from '@mui/material/Tooltip';
import GradeIcon from '@mui/icons-material/Grade';

const Following = () => {

    const authen = localStorage.getItem("authenticate");
    // const [user_id, setuser_id] = useState(" ");
    var user_id;
    var following_id;
    // const [following_id, setfollowing_id] = useState("");
    const [following, setfollowing] = useState([""]);
    const navigate = useNavigate();

    // let api1 = "http://localhost:8000/api/users/"

    async function handleUnfollow(event) {
        console.log(event.data);
        
        axios.defaults.headers.common["x-auth-token"] = authen;
        await axios.get("http://localhost:8000/api/users/try")
            .then((result) => {
                // setuser_id(result.data._id);
                user_id = result.data._id;
            })
            .catch((error) => { console.log(error); })

        let username = event.data;
        console.log("user " + username);

        const config_follow = {
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

        await axios(config_follow)
        .then((result) => {
            // console.log(result.data._id);
            let variable = result.data._id;
            following_id = result.data._id;
            console.log("he");
            console.log(following_id);
            console.log("he2");

        })
        .catch((error) => {alert("failed");console.log(error);})
        
        let api = "http://localhost:8000/api/users/";

        // Remove from following of user
        let api_user = api + user_id + "/unfollow";
        console.log(api_user);

        let rem = following_id;

        const config_unfollow = {
            method: "POST",
            // mode: "cors",
            url: api_user,
            data: {
                rem,
            },
            headers: {
                'Content-Type': 'application/json'
            },
        };

        await axios(config_unfollow)
        .then((result) => {
            // console.log(result.data._id);
            let variable = result.data;
            // setfollowing_id(variable);
            console.log(variable);
        })
        .catch((error) => {alert("failed");console.log(error);})
        
        // Remove user from followers of follower
        let api_following = api + following_id + "/rem_follower";
        console.log(api_following);

        rem = user_id;

        const config_remove = {
            method: "POST",
            // mode: "cors",
            url: api_following,
            data: {
                rem,
            },
            headers: {
                'Content-Type': 'application/json'
            },
        };

        await axios(config_remove)
        .then((result) => {
            // console.log(result.data._id);
            let variable = result.data;
            window.location.reload();
            // setfollowing_id(variable);
            console.log(variable);
        })
        .catch((error) => {alert("failed");console.log(error);})
        
    }

    useEffect(() => {
        axios.defaults.headers.common["x-auth-token"] = authen;
        axios.get("http://localhost:8000/api/users/try")
            .then((result) => {
                // setuser_id(result.data._id);
                user_id = result.data._id;
            })
            .catch((error) => { console.log(error); })

        axios.get("http://localhost:8000/api/users/following")
            .then((result) => {
                var follow = [];
                follow = result.data
                setfollowing(follow);
            })
            .catch((error) => { console.log(error); })

    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    const TableRow = ({data}) => {
        return data.map((data) =>
          <tr>
            <td>{data}</td><td><button onClick={() => handleUnfollow({data})}>Unfollow</button></td>
          </tr>
        );
      }

      const Table = ({data}) => {
        return (
          <table>
            <TableRow data={data} />
          </table>
        );
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
            <a onClick={ () => navigate('/mysubgreddit')}>
            <LocalLibraryIcon className="icon"/>
            </a>
            </Tooltip>


            <Tooltip title="SAVED POSTS" arrow>
                    <a onClick={() => navigate('/saveposts')}>
                        <GradeIcon className="icon" />
                    </a>
                </Tooltip>   


        </div>
        <h1>Following</h1>

        <div class="container">
        <Table data={following} />;
        <center>
        <button onClick={() => navigate('/profile')}>Go back</button>
        </center>
        </div>

        
        </>

    )
}

export default Following;