import React, { useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Welcome from "../Components/Welcome";
import QuesFeedView from "../Components/QuesFeedView";

const Feed = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex w-full">
        <Sidebar isVisible={isSidebarVisible} />
        <Welcome />
      </div>
      <QuesFeedView />
    </>
  );
};

export default Feed;