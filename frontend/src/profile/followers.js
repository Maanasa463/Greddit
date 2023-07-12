import './follow.css'
import axios from 'axios'
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ForumIcon from '@mui/icons-material/Forum';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import Tooltip from '@mui/material/Tooltip';
import GradeIcon from '@mui/icons-material/Grade';

const Followers = () => {

    // const uname = localStorage.getItem("username");
    const authen = localStorage.getItem("authenticate");
    var follower_id;
    // const [user_id, setuser_id] = useState("");
    var user_id;
    const [followers, setfollowers] = useState([""]);
    // const [follower_id, setfollower_id] = useState("");
    const navigate = useNavigate();

    let api1 = "http://localhost:8000/api/users/"

    async function handleRemove(event) {
    //   console.log("username" + event.data);

    axios.defaults.headers.common["x-auth-token"] = authen;
    axios.get("http://localhost:8000/api/users/try")
        .then((result) => {
            user_id = (result.data._id);
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
          console.log(variable);
          follower_id = variable;
        //   setfollower_id(variable);
          console.log("he");
        //   console.log(following_id);
          console.log("he2");

      })
      .catch((error) => {console.log(error);})
      
      let api = "http://localhost:8000/api/users/";

      // Remove from follower of user
      let api_user = api + user_id + "/rem_follower";
    //   console.log(api_user);

      let rem = follower_id;
    //   console.log(follower_id);

      const config_remove = {
          method: "POST",
          url: api_user,
          data: {
              rem,
          },
          headers: {
              'Content-Type': 'application/json'
          },
      };

      await axios(config_remove)
      .then((result) => {
          let variable = result.data;
          window.location.reload();

        //   console.log(variable);
      })
      .catch((error) => {console.log(error);})
      
      // Remove user from followers of follower
      let api_following = api + follower_id + "/unfollow";
      console.log(api_following);

      rem = user_id;

      const config_unfollow = {
          method: "POST",
          url: api_following,
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
          window.location.reload();

          // setfollowing_id(variable);
        //   console.log(variable);
      })
      .catch((error) => {alert("failed");console.log(error);})
      
  }


    useEffect(() => {
    
        axios.defaults.headers.common["x-auth-token"] = authen;
        axios.get("http://localhost:8000/api/users/try")
            .then((result) => {
                user_id = (result.data._id);
            })
            .catch((error) => { console.log(error); })

        axios.get("http://localhost:8000/api/users/followers")
            .then((result) => {
                var follow = [];
            follow = result.data
            setfollowers(follow);
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
            <td>{data}</td><td><button onClick={() => handleRemove({data})}>Remove</button></td>
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
        <h1>Followers</h1>

        <div class="container">
        <Table data={followers} />;
        <center>
        <button onClick={() => navigate('/profile')}>Go back</button>
        </center>
        </div>

        
        </>

    )
}

export default Followers;