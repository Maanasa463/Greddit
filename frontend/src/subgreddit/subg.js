import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import "../profile/profile.css"
import axios from 'axios'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ForumIcon from '@mui/icons-material/Forum';
import Tooltip from '@mui/material/Tooltip';
import GradeIcon from '@mui/icons-material/Grade';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import display from './display.jpg'
import { padding } from "@mui/system";
// import GradeIcon from '@mui/icons-material/Grade';
// import { configure } from "@testing-library/react";

const Subgreddit_Subgreddit = () => {

    // const username = localStorage.getItem("username");
    const mysub = localStorage.getItem("subsub");
    // console.log(mysub);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [showform, setShowForm] = useState(null);
    const [posts, setPosts] = useState("");
    const [post, setPost] = useState([""]);
    const [comment, setComment] = useState("");
    // var i = 0;
    
    const [postedby, setPostedby] = useState([""]);
    // console.log(showform);
    var postedBy;
    const authen = localStorage.getItem("authenticate");

    useEffect(() => {
        const api = "http://localhost:8000/api/mysubgreddit/" + mysub + "/get"

        axios.get(api)
        .then((result) => {
            // console.log(result.data);
            setName(result.data.name);
            setDesc(result.data.description);
        })
        .catch((error) => {console.log(error);});

        const api_post = "http://localhost:8000/api/post/" + mysub + "/getposts"

        axios.get(api_post)
        .then((result) => {
            // console.log(result.data);
            setPost(result.data);
        })
        .catch((error) => {console.log(error);});
        
    }, []);


    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }


    const handlePosts = (event) => {
        setPosts(event.target.value);
        // console.log(text);
    }

    const handleComm = (event) => {
        setComment(event.target.value);
        // console.log(text);
    }


    async function handleSubmit(event) {
        event.preventDefault();

        console.log("hello");

        console.log("---");
        // console.log(text);

        var sub_id = localStorage.getItem("subsub");
        console.log(sub_id);

        axios.defaults.headers.common["x-auth-token"] = authen;
        await axios.get("http://localhost:8000/api/users/try")
            .then((result) => {
                postedBy = result.data._id;
                console.log(postedBy);
            })
            .catch((error) => { console.log(error); })
        
        console.log(postedBy);

        const api = "http://localhost:8000/api/post/" + sub_id + "/create";

        const configuration = {
            method: "POST",
            // mode: "cors",
            url: api,
            data: {
                posts,
                postedBy,
            },

            headers: {
                'Content-Type': 'application/json'
            },
        };

        await axios(configuration)
        .then((result) => {
            console.log(result.data);
            if(result.data)
                alert("Your post contains banned words")

            window.location.reload();
        })
        .catch((error) => {console.log(error);})
    }


    async function handleUpvote(event) {
        var post_id = event;

        const api = "http://localhost:8000/api/post/" + post_id + "/upvote";

        const configuration = {
            method: "PUT",
            // mode: "cors",
            url: api,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        await axios(configuration)
        .then((result) => {
            let variable = result.data;
            let rem = result.data;
            window.location.reload();
        })
        .catch((error) => {console.log(error);})
    }


    async function handleDownvote(event) {
        var post_id = event;

        const api = "http://localhost:8000/api/post/" + post_id + "/downvote";

        const configuration = {
            method: "PUT",
            // mode: "cors",
            url: api,
            headers: {
                'Content-Type': 'application/json'
            },
        };

        await axios(configuration)
        .then((result) => {
            let variable = result.data;
            let rem = result.data;
            window.location.reload();
        })
        .catch((error) => {console.log(error);})
    }


    async function handleSave(event) {
        var post_id = event;

        var user_id;

        axios.defaults.headers.common["x-auth-token"] = authen;
        await axios.get("http://localhost:8000/api/users/try")
            .then((result) => {
                user_id = result.data._id;
            })
            .catch((error) => { console.log(error); })


        const api = "http://localhost:8000/api/post/" + user_id + "/save";

        const configuration = {
            method: "PUT",
            // mode: "cors",
            url: api,
            data: {
                post_id,
            },
            headers: {
                'Content-Type': 'application/json'
            },
        };

        await axios(configuration)
        .then((result) => {
            let variable = result.data;
            let rem = result.data;
            window.location.reload();
        })
        .catch((error) => {console.log(error);})
    }


    async function handleFollow(event) {
        var following_id = event.postedBy;
        var user_id;

        axios.defaults.headers.common["x-auth-token"] = authen;
        await axios.get("http://localhost:8000/api/users/try")
            .then((result) => {
                user_id = result.data._id;
            })
            .catch((error) => { console.log(error); })

        var follower = user_id;
        
        const api = "http://localhost:8000/api/users/" + following_id + "/followers";

        const config_follow = {
            method: "PUT",
            // mode: "cors",
            url: api,
            data: {
                follower,
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
        })
        .catch((error) => {console.log(error);})
        
        var following = event.postedBy;
        const api2 = "http://localhost:8000/api/users/" + user_id + "/following";

        const config_follower = {
            method: "PUT",
            // mode: "cors",
            url: api2,
            data: {
                following,
            },
            headers: {
                'Content-Type': 'application/json'
            },
        };
  
        await axios(config_follower)
        .then((result) => {
            // console.log(result.data._id);
            let variable = result.data._id;
            console.log(variable);
        })
        .catch((error) => {console.log(error);})
    }


    async function handleComment(event) {

        // event.preventDefault();
        console.log("hi");

        const post_id = event;
        console.log("post_id " + post_id);
        // console.log("text " + text);
        // var comment = text;

        const api = "http://localhost:8000/api/post/" + post_id + "/comment"

        const config_comment = {
            method: "PUT",
            // mode: "cors",
            url: api,
            data: {
                comment,
            },
            headers: {
                'Content-Type': 'application/json'
            },
        };
  
        await axios(config_comment)
        .then((result) => {
            // console.log(result.data._id);
            let variable = result.data._id;
            window.location.reload()
            // console.log(variable);
        })
        .catch((error) => {console.log(error);})

    }


    const Show_Form = () => {
        return (
        <>    
            <div class="post_text">
            <span class="close">&times;</span>
            <form onSubmit={handleSubmit}>
            <center>
                <label>
                    <input 
                    type="text" 
                    class="lab"
                    placeholder="Welcome to today"
                    value={posts}
                    onChange = {handlePosts}
                    />
                </label>
            </center>
                
            <center><input type="submit" value="Post" class="custbutton" /></center>
            
            </form>
        </div>
            </>

        );
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


            <img class="display" src={display}></img>
                
                <ul>
                    <li><h1 className="welcome">{name}</h1></li>
                    <li><h2 className="welcome2">{desc}</h2></li>
                </ul> 

                <button class="edit" onClick={() => setShowForm(true)}>Post</button>
                {showform ? Show_Form() : null}

                <h1 className="postHeading">POSTS</h1>
                <ul>
                    {post.map((posts) => (
                        <div className="posts">
                            <li><h2 >{posts.postedByName ? posts.postedByName: null} : {posts.text}</h2></li>
                            <li><button className="edit_post" onClick={() => handleUpvote(posts._id)}>Upvote {posts.upvotes}</button>
                            <button className="edit_post" onClick={() => handleDownvote(posts._id)}>Downvote {posts.downvotes}</button>
                            <button className="edit_post" onClick={() => handleSave(posts._id)}>Save</button>
                            {/* <button className="edit_post" >Comment</button> */}
                            <button className="edit_post" onClick={() => handleFollow(posts)}>Follow</button>
                            <form key={posts._id}>
                                
                                    <input 
                                    type="text" 
                                    class="lab"
                                    placeholder="Welcome to today"
                                    value={comment}
                                    onChange = {handleComm}
                                    />
                            </form>
                        <button onClick={() => handleComment(posts._id)} className="edit_post" style={{width:"100px"}}>Comment</button>
                    </li>
                    
                    {posts.comments && (posts.comments).map((comment) => (
                        <li>{comment}</li>
                    ))}
                            
                    </div>

                    ))}
                </ul> 

        </>
    );

};


export default Subgreddit_Subgreddit;