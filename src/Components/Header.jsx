import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faComments,
  faTrophy,
  faQuestionCircle,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Logo2 from "../images/TAGGLE LOGO2.png";
import { useNavigate } from "react-router-dom";

const Header = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userFullName, setUserFullName] = useState("");

  const getInitials = (name) => {
    const nameArray = name.split(" ");
    const initials = nameArray.map((word) => word[0]).join("");
    return initials;
  };

  useEffect(() => {
    fetch("/api/user/fullname")
      .then((response) => response.json())
      .then((data) => setUserFullName(data.fullname))
      .catch((error) => console.error("Error fetching full name:", error));
  }, []);

  return (
    <header className="flex items-center w-full justify-between bg-white border border-b-gray-300 py-2 px-4 fixed z-50">
      <div className="flex gap-4 items-center">
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
          <img
            src={Logo2}
            alt="Taggle Logo"
            className="w-[5rem] h-auto cursor-pointer"
            onClick={() => navigate("/feed")}
          />
        </div>
      </div>

      <div className="search-bar block flex-grow mx-4 mobile:hidden tablet:block">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border border-gray-300 rounded-lg px-3 py-1 outline-none"
        />
      </div>

      <div className="nav-icons flex items-center gap-4">
        <div className="icon">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-xl text-gray-600 laptop:hidden tablet:hidden"
          />
        </div>

        <div className="icon bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-red-600 mobile:text-sm">
          {getInitials(userFullName) || "SH"}
        </div>

        <div className="icon">
          <FontAwesomeIcon
            icon={faComments}
            className="text-xl text-gray-600"
          />
        </div>

        <div className="icon">
          <FontAwesomeIcon icon={faTrophy} className="text-xl text-gray-600" />
        </div>

        <div className="icon">
          <FontAwesomeIcon
            icon={faQuestionCircle}
            className="text-xl text-gray-600"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
