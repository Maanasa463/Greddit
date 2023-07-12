import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Login from './login';
import Profile from './profile/profile';
import App from './App';
import Followers from './profile/followers'
import Following from './profile/following'
import Edit from './profile/edit_profile'
import Dashboard from "./dashboard/dashboard";
import Mysubgreddit from "./mysubgreddit/mysubgreddit";
import CreateSg from "./mysubgreddit/create";
import Mysubgreddit_Subgreddit from "./mysubgreddit/subgreddit";
// import SubGreddit from "./subgreddit/subgreddit";
import Mysub_Users from "./mysubgreddit/users";
import Mysub_Req from "./mysubgreddit/request";
import Subgreddit from "./subgreddit/subgreddit";
import Mysub_Report from "./mysubgreddit/report";
import Mysub_Stats from "./mysubgreddit/stats";
import Subgreddit_Subgreddit from "./subgreddit/subg";
import Saved_posts from "./saved/save";
// import ProtectedRoutes from "./protectedRoutes";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route index element = {<App />} />
                <Route path="/profile" element = {<Profile />} />
                <Route path="profile/followers" element = {<Followers />} />
                <Route path="profile/following" element = {<Following />} />
                <Route path="/edit" element = {<Edit />} />
                <Route path="/dashboard" element = {<Dashboard />} />
                <Route path="/mysubgreddit" element = {<Mysubgreddit />} />
                <Route path="/mysubgreddit/create" element = {<CreateSg />} />
                <Route path="/mysubgreddit/subgreddit" element = {<Mysubgreddit_Subgreddit />} />
                <Route path="/mysubgreddit/subgreddit/users" element = {<Mysub_Users />} />
                <Route path="/mysubgreddit/subgreddit/req" element = {<Mysub_Req />} />
                <Route path="/mysubgreddit/subgreddit/report" element = {<Mysub_Report />} />
                <Route path="/mysubgreddit/subgreddit/stats" element = {<Mysub_Stats />} />
                <Route path="/subgreddit" element = {<Subgreddit />} />
                <Route path="/subgreddit/subgreddit" element = {<Subgreddit_Subgreddit />} />
                <Route path="/saveposts" element = {<Saved_posts />} />


                {/* <ProtectedRoutes path="/home" element = {<Home />} /> */}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)