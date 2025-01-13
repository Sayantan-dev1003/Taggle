import React from "react";
import Logo from "../images/TAGGLE LOGO1.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <>
      <footer className="w-full flex items-start justify-between bg-black px-4 py-8 mt-10 text-gray-400 mobile:flex-col mobile:items-center tablet:flex-col tablet:items-center">
        <div className="flex flex-col gap-2 text-sm mobile:items-center tablet:items-center">
          <img src={Logo} alt="" className="w-[6rem] h-auto mb-4" />
          <div className="flex flex-col mobile:flex mobile:flex-row mobile:gap-4 tablet:flex tablet:flex-row tablet:gap-4 gap-2">
            <span>Questions</span>
            <span>Help</span>
            <span>Chat</span>
          </div>
        </div>
        <div className="flex flex-col mt-7 gap-2 text-sm mobile:items-center tablet:items-center">
          <span className="text-base font-semibold mb-3">PRODUCTS</span>
          <div className="flex flex-col mobile:flex mobile:flex-row mobile:gap-4 tablet:flex tablet:flex-row tablet:gap-4 gap-2">
            <span>Terms</span>
            <span>Advertising</span>
            <span>Talent</span>
          </div>
        </div>
        <div className="flex flex-col mt-7 gap-2 text-sm mobile:items-center tablet:items-center">
          <span className="text-base font-semibold mb-3">COMPANY</span>
          <div className="flex flex-col mobile:flex mobile:flex-row mobile:flex-wrap mobile:justify-center mobile:gap-4 tablet:flex tablet:flex-row tablet:flex-wrap tablet:justify-center tablet:gap-4 gap-2">
            <span>About</span>
            <span>Press</span>
            <span>Work Here</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact Us</span>
            <span>Cookie Settings</span>
            <span>Cookie Policy</span>
          </div>
        </div>
        <div className="flex flex-col mt-7 gap-2 text-sm mobile:items-center mobile:border-b mobile:border-b-slate-300 mobile:pb-10 tablet:items-center tablet:border-b tablet:border-b-slate-300 tablet:pb-10">
          <span className="text-base font-semibold mb-3">TAGGLE NETWORKS</span>
          <div className="flex flex-col mobile:flex mobile:flex-row mobile:flex-wrap mobile:justify-center mobile:gap-4 tablet:flex tablet:flex-row tablet:flex-wrap tablet:justify-center tablet:gap-4 gap-2">
            <span>Technology</span>
            <span>Culture & recreation</span>
            <span>Life & arts</span>
            <span>Science</span>
            <span>Professional</span>
            <span>Business</span>
            <span>API</span>
            <span>Data</span>
          </div>
        </div>
        <div className="flex flex-col mt-7 text-sm gap-56 mobile:gap-2 mobile:items-center mobile:w-full tablet:gap-2 tablet:items-center tablet:w-full">
          <div className="text-lg flex gap-4">
            <FontAwesomeIcon icon={faFacebookF} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faLinkedin} />
            <FontAwesomeIcon icon={faInstagram} />
          </div>
          <div>
            <p>© Taggle 2025 All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
