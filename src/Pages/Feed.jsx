import React, { useState } from "react";

import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Welcome from "../Components/Welcome";
import QuesFeedView from "../Components/QuesFeedView";
import Footer from "../Components/Footer";

const Feed = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

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
              <Welcome />
              <QuesFeedView />
            </div>
          </div>
      </div>
      <Footer />
    </>
  );
};

export default Feed;