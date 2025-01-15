import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark as faBookmarkReg,
  faThumbsDown as faThumbsDownReg,
  faThumbsUp as faThumbsUpReg,
} from "@fortawesome/free-regular-svg-icons";
import {
  faThumbsDown as faThumbsDownSolid,
  faThumbsUp as faThumbsUpSolid,
} from "@fortawesome/free-solid-svg-icons";

import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import PostAnswer from "../Components/PostAnswer";

const QuestionDetails = () => {
  const { title } = useParams();
  const [question, setQuestion] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`/api/questions/${title}`);
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();
        setQuestion(data.questions[0]);
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    };

    fetchQuestions();
  }, [title]);

  if (!question) {
    return <div>Loading...</div>;
  }

  const getTimeDifference = (timestamp) => {
    const now = new Date();
    const postedDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postedDate) / 1000);

    const intervals = [
      { label: "yr", seconds: 31536000 },
      { label: "mon", seconds: 2592000 },
      { label: "wk", seconds: 604800 },
      { label: "dy", seconds: 86400 },
      { label: "hr", seconds: 3600 },
      { label: "min", seconds: 60 },
      { label: "s", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count > 0) {
        return `${count} ${interval.label} ago`;
      }
    }

    return "just now";
  };

  return (
    <>
      <div className="flex flex-col">
        <Header
          onToggleSidebar={toggleSidebar}
          className="fixed top-0 left-0 right-0 z-10 bg-white"
        />

        <Sidebar isVisible={isSidebarVisible} />
        <div className="flex flex-grow mt-14 openSans">
          <div className="flex-col flex-grow overflow-y-auto">
            <div className="w-full bg-white p-4 openSans flex flex-col items-start justify-between gap-2 laptop:w-2/3 laptop:mx-auto">
              <div className="w-full border-b border-b-gray-300">
                <div className="w-full flex justify-between mobile:flex-col-reverse mobile:gap-2">
                  <h1 className="text-2xl font-medium">{question.title}</h1>
                  <div className="mobile:w-full flex mobile:items-end mobile:justify-end">
                    <button
                        className="border openSans border-red-600 bg-white font-light text-red-600 rounded text-xs px-2 py-2 hover:bg-red-100"
                        onClick={() => navigate("/ask-question")}
                    >
                        Ask Question
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-[0.65rem] text-gray-400">
                    Asked by{" "}
                    <span className="text-red-600 tracking-wider">
                      {question.author?.fullname || "Anonymous"}
                    </span>{" "}
                    on <span>{getTimeDifference(question.timestamp)}</span>
                  </span>
                </div>
              </div>
              <div className="w-full flex gap-6 mt-3">
                <div className="flex flex-col gap-3">
                  <div className="rounded-full p-2 flex items-center justify-center border border-gray-400 cursor-pointer transition-transform hover:scale-110">
                    <FontAwesomeIcon icon={faThumbsUpReg} />
                  </div>
                  <div className="flex items-center justify-center">
                    <p>
                      {Array.isArray(question.upvotes) &&
                      Array.isArray(question.downvotes)
                        ? question.upvotes.length + question.downvotes.length
                        : 0}
                    </p>
                  </div>
                  <div className="rounded-full p-2 flex items-center justify-center border border-gray-400 cursor-pointer transition-transform hover:scale-110">
                    <FontAwesomeIcon icon={faThumbsDownReg} />
                  </div>
                  <FontAwesomeIcon
                    icon={faBookmarkReg}
                    className="text-gray-400 text-lg transition-transform hover:scale-110 m-2"
                  />
                </div>
                <div className="flex flex-col gap-8">
                  <p className="text-sm tracking-wide text-gray-600">
                    {question.description}
                  </p>
                  <div className="flex items-center gap-2 text-[0.6rem] font-bold mobile:w-full tablet:w-full mobile:flex-wrap tablet:flex-wrap">
                    {question.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-slate-200 rounded p-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full mt-8">
                <PostAnswer />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuestionDetails;
