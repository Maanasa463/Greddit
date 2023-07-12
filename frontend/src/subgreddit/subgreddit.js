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
// import { ConstructionOutlined } from "@mui/icons-material";
import GradeIcon from '@mui/icons-material/Grade';

const Subgreddit = () => {

    const authen = localStorage.getItem("authenticate");
    const [sub, setSub] = useState([""]);
    const [search, setSearch] = useState("");
    const [search_res, setSearch_res] = useState([""]);
    const [display, setDisplay] = useState(false);
    const [searchTags, setSearchTags] = useState("");
    const [tagDisp, setTagDisp] = useState(false);
    const [searchTag_res, setSearchTag_res] = useState([""]);

    // Sorting

    var user_id;

    async function getSubgreddits() {

        await axios.get("http://localhost:8000/api/users/try")
            .then((result) => {
                // console.log(result.data);
                // setuser_id(result.data._id)
                user_id = result.data._id;
            })
            .catch((error) => { console.log(error); })


        console.log(user_id);

        const api_ = "http://localhost:8000/api/subgreddit/" + user_id + "/subs";
        console.log(api_)

        await axios.get(api_)
            .then((result) => {
                console.log("---");

            const val = localStorage.getItem("alph")
            const val2 = localStorage.getItem("desc_alph")
            const follow_val = localStorage.getItem("follow")
            const date_val = localStorage.getItem("date")

            var subs = [];

            subs = result.data;
            console.log("VAL " + val);

            if (val === "true")
            { 
                console.log("hi")    
                subs.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0))
            }

            if (val2 === "true")
            { 
                console.log("hi")    
                subs.sort((a,b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() < a.name.toLowerCase()) ? -1 : 0))
            }

            if (follow_val  === "true")
            { 
                console.log("hi")   
                 
                subs.sort((a,b) => (a.blocked.length + a.moderator.length + a.unblocked.length < b.blocked.length + b.moderator.length + b.unblocked.length) ? 1 
                : ((b.blocked.length + b.moderator.length + b.unblocked.length < a.blocked.length + a.moderator.length + a.unblocked.length) ? -1 : 0))
            }

            if (date_val === "true")
            { 
                console.log("hi")    
                subs.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
            }

            console.log(subs)
                setSub(subs)

            })
            .catch((error) => { console.log(error); })
    }

    useEffect(() => {

        axios.defaults.headers.common["x-auth-token"] = authen;

        getSubgreddits();


    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    async function handleOpen(event) {
        //   console.log("username" + event.data);
        let username = event._id;
        console.log("user " + username);
        localStorage.setItem("subsub", username);

        navigate('/subgreddit/subgreddit');
    }

    async function handleAlph() {
        localStorage.setItem("alph", true)
        // localStorage.setItem("desc_alph", false)
        // localStorage.setItem("follow", false)
        // localStorage.setItem("date", false)

        const val = localStorage.getItem("alph");

        console.log(val);

        window.location.reload();

    }

    async function handleDescAlph() {
        // localStorage.setItem("alph", false)
        localStorage.setItem("desc_alph", true)
        // localStorage.setItem("follow", false)
        // localStorage.setItem("date", false)

        const val = localStorage.getItem("alph");

        console.log(val);

        window.location.reload();

    }

    async function handleFollowSort() {
        // localStorage.setItem("alph", false)
        // localStorage.setItem("desc_alph", false)
        localStorage.setItem("follow", true)
        // localStorage.setItem("date", false)

        // const val = localStorage.getItem("alph");

        // console.log(val);

        window.location.reload();

    }

    async function handleDateSort() {
        // localStorage.setItem("alph", false)
        // localStorage.setItem("desc_alph", false)
        // localStorage.setItem("follow", true)
        localStorage.setItem("date", true)

        // const val = localStorage.getItem("alph");

        // console.log(val);

        window.location.reload();

    }


    async function handleReset() {
        localStorage.setItem("alph", false)
        localStorage.setItem("desc_alph", false)
        localStorage.setItem("follow", false)
        localStorage.setItem("date", false)

        // const val = localStorage.getItem("alph");

        // console.log(val);

        window.location.reload();

    }


    async function handleJoin(event) {

        if (event.isLeft)
            alert("Cannot join a subgreddit you left!")
        
        else {


        let sub_id = event._id;
        const api = "http://localhost:8000/api/mysubgreddit/" + sub_id + "/req"
        console.log(api);

        var request;
        await axios.get("http://localhost:8000/api/users/try")
            .then((result) => {
                request = result.data._id;
            })
            .catch((error) => { console.log(error); })


        const config = {
            method: "PUT",
            url: api,
            data: {
                request,
            },
            headers: {
                'Content-Type': 'application/json'
            },
        };

        await axios(config)
            .then((result) => {
                let variable = result.data;
                //   setRem(result.data._id);
                let rem = result.data;
                console.log(rem);
            })
             .catch((error) => { console.log(error); })
        }
   
    }

    async function handleLeave(event) {

        console.log("jhs");
        let sub_id = event._id;
        console.log(sub_id);
        const api = "http://localhost:8000/api/subgreddit/" + sub_id + "/leave"

        // var reqname = user_id;

        var reqname;
        await axios.get("http://localhost:8000/api/users/try")
            .then((result) => {
                // console.log(result.data);
                // setuser_id(result.data._id)
                reqname = result.data._id;
            })
            .catch((error) => { console.log(error); })

        const config = {
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

        await axios(config)
            .then((result) => {
                let variable = result.data;
                let rem = result.data;
                window.location.reload();
            })
            .catch((error) => { console.log(error); })
    };

    async function handleSearch(event) {
        setSearch(event.target.value);

    }

    async function handleSearchTags(event) {
        // let separated = event.target.value;
        setSearchTags(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const api = "http://localhost:8000/api/subgreddit/" + search;

        axios.get(api)
            .then((result) => {
                console.log("yippee");
                setSearch_res(result.data);
            })
            .catch((error) => { console.log(error); });

        setDisplay(true);

    }

    // Handle Tag Search Results
    const handleSubmit2 = (event) => {
        event.preventDefault();

        const api = "http://localhost:8000/api/subgreddit/" + searchTags + "/search";

        axios.get(api)
            .then((result) => {
                console.log("yippee");
                // console.log(result.data);
                setSearchTag_res(result.data);
            })
            .catch((error) => { console.log(error); });

        setTagDisp(true);
    }

    const Show_results = () => {
        
        return (
            <>
            <div class="subgreddit">
                <table onClick={() => setDisplay(false)}>
                    <tr>
                        {search_res.map((subgred) => (
                            <div>
                                <td style={{ width: "100px" }}>{subgred.name}</td>
                            </div>
                        ))}
                    </tr>
                </table>
            </div>
            </>
        )
    }

    const Show_Tagresults = () => {
        
        console.log(searchTag_res);
        return (
            <>
            <div class="subgreddit">
                <table onClick={() => setTagDisp(false)}>
                    <tr>
                        {searchTag_res.map((subgred) => (
                            <div>
                                <td style={{ width: "100px" }}>{subgred.name}</td>
                            </div>
                        ))}
                    </tr>
                </table>
            </div>
            </>
        )
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

            {/* Search bar */}
            <div class="post_text">
                <span class="close">&times;</span>
                <form onSubmit={handleSubmit}>
                    <center>
                        <label>
                            <input
                                type="text"
                                class="lab"
                                placeholder="Search"
                                value={search}
                                onChange={handleSearch}
                            />
                        </label>
                    </center>

                    <center><input type="submit" value="Search" class="custbutton" /></center>

                </form>
            </div>

            {display ? Show_results() : null}

            {/* Tag Search bar */}
            <div class="post_text">
                <span class="close">&times;</span>
                <form onSubmit={handleSubmit2}>
                    <center>
                        <label>
                            <input
                                type="text"
                                class="lab"
                                placeholder="Tags (Comma separated)"
                                value={searchTags}
                                onChange={handleSearchTags}
                            />
                        </label>
                    </center>

                    <center><input type="submit" value="Tag Search" class="custbutton" /></center>

                </form>
            </div>

            {tagDisp ? Show_Tagresults() : null}

            <center>
                <button className="mod" onClick={() => handleAlph()} style={{width: "200px", margin: "25px"}}>Alphabetical</button>
                <button className="mod" onClick={() => handleDescAlph()} style={{width: "200px", margin: "25px"}}>Descending(Alph)</button>
                <button className="mod" onClick={() => handleFollowSort()} style={{width: "200px", margin: "25px"}}>Followers</button>
                <button className="mod" onClick={() => handleDateSort()} style={{width: "200px", margin: "25px"}}>Date</button>
                <button className="mod" onClick={() => handleReset()} style={{width: "200px", margin: "25px"}}>Reset</button>
            </center>

            {/* Names and basic info of subgreddits */}
            <div class="subgreddit">

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
                        {sub.map((subgred) => (
                            <div>
                                <td style={{ width: "100px" }}>{subgred.name}</td>
                                <td style={{ width: "200px" }}>{subgred.description}</td>
                                <td>{subgred.blocked && subgred.unblocked && subgred.moderator && subgred.blocked.length + subgred.moderator.length + subgred.unblocked.length}</td>
                                <td>{subgred.post}</td>
                                <td style={{ width: "100px" }}>
                                    {subgred.banWords && (subgred.banWords).map((ban) => (
                                        <div>
                                            <p style={{ color: "white" }}>{ban},</p>
                                        </div>
                                    ))}
                                </td>
                                {/* <td><button className="mod" disabled={subgred.isMod} onClick={() => handleLeave(subgred)}>Leave</button></td> */}
                                {(subgred.isJoined || subgred.isMod)? 
                                <td><button className="mod" disabled={subgred.isMod} onClick={() => handleLeave(subgred)}>Leave</button></td> : 
                                <td><button className="edit" onClick={() => handleJoin(subgred)}>Join</button></td>}

                                <td><button className="edit" onClick={() => handleOpen(subgred)}>Open</button></td>

                            </div>
                        ))}
                    </tr>
                    
                </table>

            </div>

        </>
    );

};


export default Subgreddit;