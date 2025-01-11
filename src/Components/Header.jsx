import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faUser , faComments, faTrophy, faQuestionCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import Logo2 from "../images/TAGGLE LOGO2.png";
import { useNavigate } from 'react-router-dom';

const Header = ({ onToggleSidebar }) => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="flex items-center justify-between bg-white border border-b-gray-300 py-2 px-4 sticky">
            <div className='flex gap-4 items-center'>
                <div className="icon">
                    <FontAwesomeIcon 
                        icon={isMenuOpen ? faXmark : faBars} 
                        className="text-xl text-gray-600 cursor-pointer" 
                        onClick={() => {
                            setIsMenuOpen(!isMenuOpen);
                            onToggleSidebar(); // Call the toggle function passed as a prop
                        }} 
                    />
                </div>

                {/* Logo */}
                <div className="logo flex items-center">
                    <img src={Logo2} alt="Taggle Logo" className="w-[5rem] h-auto cursor-pointer" onClick={() => navigate("/feed")} />
                </div>
            </div>

            {/* Search Bar */}
            <div className="search-bar block flex-grow mx-4 mobile:hidden tablet:block">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-1 outline-none"
                />
            </div>

            {/* Navigation Icons */}
            <div className="nav-icons flex items-center space-x-6">
                {/* Search Icon */}
                <div className="icon">
                    <FontAwesomeIcon icon={faSearch} className="text-xl text-gray-600 laptop:hidden tablet:hidden" />
                </div>

                {/* Profile Icon */}
                <div className="icon">
                    <FontAwesomeIcon icon={faUser } className="text-xl text-gray-600" />
                </div>

                {/* Message Icon */}
                <div className="icon">
                    <FontAwesomeIcon icon={faComments} className="text-xl text-gray-600" />
                </div>

                {/* Trophy Icon */}
                <div className="icon">
                    <FontAwesomeIcon icon={faTrophy} className="text-xl text-gray-600" />
                </div>

                {/* Question Icon */}
                <div className="icon">
                    <FontAwesomeIcon icon={faQuestionCircle} className="text-xl text-gray-600" />
                </div>
            </div>
        </header>
    );
};

export default Header;