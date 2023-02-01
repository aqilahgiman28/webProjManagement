import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Home/Home";
import Signup from "./components/Signup/signup";
import Login from "./components/Login/login";
import Userhome from "./components/user/Home";
import Profile from "./components/user/profile";
import Project from "./components/user/project/project";
import Createproject from "./components/user/project/createproject";
import Team from "./components/user/Team/Team";
import Addmember from "./components/user/Team/addmember";
import Addtask from "./components/user/Task/addtask";
import Task from "./components/user/Task/Task";
import Attachment from "./components/user/attachment/attachment";
import Addattachment from "./components/user/attachment/addattachment";
import Yourtask from "./components/user/yourtask";
import Yourproject from "./components/user/yourproject";
import Viewattachment from "./components/user/viewattachment";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/userpage" element={<Userhome />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/project" element={<Project />} />
        <Route exact path="/createproject" element={<Createproject />} />
        <Route exact path="/team" element={<Team />} />
        <Route exact path="/team/:id" element={<Team />} />
        <Route exact path="/addmember/:id" element={<Addmember />} />
        <Route exact path="/addtask/:id" element={<Addtask />} />
        <Route exact path="/task/:id" element={<Task />} />
        <Route exact path="/attachment/:id" element={<Attachment />} />
        <Route exact path="/addattachment/:id" element={<Addattachment />} />
        <Route exact path="/yourtask/:id" element={<Yourtask />} />
        <Route exact path="/yourproject" element={<Yourproject />} />
        <Route exact path="/viewdocument/:id" element={<Viewattachment />} />
      </Routes>
    </div>
  );
}

export default App;
