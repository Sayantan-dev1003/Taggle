import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Feed from "./Pages/Feed";
import UserAgreement from "./Pages/UserAgreement";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import CookiesPolicy from "./Pages/CookiesPolicy";
import QuestionForm from "./Pages/QuestionForm";
import Questions from "./Pages/Questions";
import QuestionDetails from "./Pages/QuestionDetails";
import Saves from "./Pages/Saves";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/user-agreement" element={<UserAgreement />}></Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
        <Route path="/cookies-policy" element={<CookiesPolicy />}></Route>
        <Route path="/ask-question" element={<QuestionForm />}></Route>
        <Route path="/questions" element={<Questions />}></Route>
        <Route path="/questions/:title" element={<QuestionDetails />}></Route>
        <Route path="/saves" element={<Saves />}></Route>
      </Routes>
    </Router>
  )
}

export default App