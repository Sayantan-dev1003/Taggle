import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const naviagte = useNavigate();
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    fetch("/api/user/fullname")
      .then((response) => response.json())
      .then((data) => setFullName(data.fullName))
      .catch((error) => console.error("Error fetching full name:", error));
  }, []);

  return (
    <>
      <div className="w-full bg-white p-4 openSans flex items-start justify-between gap-2 laptop:w-3/5 laptop:mx-auto">
        <div className="flex flex-col w-[70vw]">
          <p className="text-2xl font-bold text-gray-800">
            Welcome to Taggle, {fullName}!
          </p>
          <span className="text-[0.6rem] tracking-wide text-gray-600">
            Find answers to your technical questions and help others answer
            theirs.
          </span>
        </div>
        <div className="w-[30vw] text-end">
          <button
            className="border openSans border-red-600 bg-white font-light text-red-600 rounded text-xs px-2 py-2 hover:bg-red-200"
            onClick={() => naviagte("/ask-question")}
          >
            Ask Question
          </button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
