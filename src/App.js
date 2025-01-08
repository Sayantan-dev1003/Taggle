import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Feed from "./Pages/Feed";
import UserAgreement from "./Pages/UserAgreement";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/user-agreement" element={<UserAgreement />}></Route>
      </Routes>
    </Router>
  )
}

export default App