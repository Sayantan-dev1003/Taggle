import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faUser , faComments, faTrophy, faQuestionCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import Logo2 from "../images/TAGGLE LOGO2.png";
import { useNavigate } from 'react-router-dom';

const Header = ({ onToggleSidebar }) => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="flex items-center w-full justify-between bg-white border border-b-gray-300 py-2 px-4 fixed z-50">
            <div className='flex gap-4 items-center'>
                <div className="icon">
                    <FontAwesomeIcon 
                        icon={isMenuOpen ? faXmark : faBars} 
                        className="text-xl text-gray-600 cursor-pointer" 
                        onClick={() => {
                            setIsMenuOpen(!isMenuOpen);
                            onToggleSidebar();
                        }} 
                    />
                </div>

                <div className="logo flex items-center">
                    <img src={Logo2} alt="Taggle Logo" className="w-[5rem] h-auto cursor-pointer" onClick={() => navigate("/feed")} />
                </div>
            </div>

            <div className="search-bar block flex-grow mx-4 mobile:hidden tablet:block">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-1 outline-none"
                />
            </div>

            <div className="nav-icons flex items-center space-x-6">
                <div className="icon">
                    <FontAwesomeIcon icon={faSearch} className="text-xl text-gray-600 laptop:hidden tablet:hidden" />
                </div>

                <div className="icon">
                    <FontAwesomeIcon icon={faUser } className="text-xl text-gray-600" />
                </div>

                <div className="icon">
                    <FontAwesomeIcon icon={faComments} className="text-xl text-gray-600" />
                </div>

                <div className="icon">
                    <FontAwesomeIcon icon={faTrophy} className="text-xl text-gray-600" />
                </div>

                <div className="icon">
                    <FontAwesomeIcon icon={faQuestionCircle} className="text-xl text-gray-600" />
                </div>
            </div>
        </header>
    );
};

export default Header;