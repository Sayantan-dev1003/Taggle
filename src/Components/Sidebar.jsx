import React from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faQuestionCircle, faTag, faBookmark } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isVisible }) => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await fetch('/logout', { method: 'POST', credentials: 'include' });
            toast.success("Logged out successfully");
            window.location.href = '/';
        } catch (error) {
            toast.error("Logout failed");
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className={`flex flex-col text-base bg-white w-48 pt-14 pb-6 fixed top-[3.6rem] z-40 border border-t-0 border-b-0 border-l-0 border-r-gray-300 h-[calc(100vh-3.6rem)] justify-between transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
            <div>
                <div className="sidebar-option flex items-center space-x-4 py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-lg hover:font-medium" onClick={() => navigate('/home')}>
                    <FontAwesomeIcon icon={faHome} className="text-gray-600" />
                    <span className="text-gray-600">Home</span>
                </div>

                <div className="sidebar-option flex items-center space-x-4 py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-lg hover:font-medium" onClick={() => navigate('/questions')}>
                    <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-600" />
                    <span className="text-gray-600">Questions </span>
                </div>

                <div className="sidebar-option flex items-center space-x-4 py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-lg hover:font-medium" onClick={() => navigate('/tags')}>
                    <FontAwesomeIcon icon={faTag} className="text-gray-600" />
                    <span className="text-gray-600">Tags</span>
                </div>

                <div className="sidebar-option flex items-center space-x-4 py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-lg hover:font-medium" onClick={() => navigate('/saves')}>
                    <FontAwesomeIcon icon={faBookmark} className="text-gray-600" />
                    <span className="text-gray-600">Saves</span>
                </div>
            </div>

            <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white mx-4 font-bold py-2 px-4 rounded">
                Logout
            </button>
        </div>
    );
};

export default Sidebar;