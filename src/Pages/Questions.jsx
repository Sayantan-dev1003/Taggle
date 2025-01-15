import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import NewestQuestions from "../Components/NewestQuestions";

const Questions = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <>
      <div className="flex flex-col">
        <Header
          onToggleSidebar={toggleSidebar}
          className="fixed top-0 left-0 right-0 z-10 bg-white"
        />

        <Sidebar isVisible={isSidebarVisible} />
        <div className="flex flex-grow mt-14">
          <div className="flex-col flex-grow overflow-y-auto">
            <div className="w-full bg-white p-4 openSans flex items-start justify-between gap-2 laptop:w-2/3 laptop:mx-auto">
              <div className="flex flex-col w-[70vw]">
                <p className="text-2xl montserrat font-semibold text-gray-800">
                  Newest Questions
                </p>
              </div>
              <div className="w-[30vw] text-end">
                <button
                  className="border openSans border-red-600 bg-red-600 font-light text-white rounded text-xs px-2 py-2 hover:bg-red-100"
                  onClick={() => navigate("/ask-question")}
                >
                  Ask Question
                </button>
              </div>
            </div>
            <NewestQuestions />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Questions;
