import React, { useState } from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';

const Feed = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarVisible(prev => !prev);
    };

    return (
        <>
            <Header onToggleSidebar={toggleSidebar} />
            <Sidebar isVisible={isSidebarVisible} />
        </>
    );
};

export default Feed;