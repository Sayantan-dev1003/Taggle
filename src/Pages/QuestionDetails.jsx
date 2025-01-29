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
  faBookmark as faBookmarkSolid
} from "@fortawesome/free-solid-svg-icons";

import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";

const QuestionDetails = () => {
  const { title } = useParams();
  const [question, setQuestion] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchQuestionDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/questions/${title}`);
        if (!response.ok) {
          throw new Error("Failed to fetch question details");
        }
        const data = await response.json();
        setQuestion(data.questions[0]); // Ensure the question includes the author field
      } catch (error) {
        setError(error.message);
        console.error("Error fetching questions: ", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/user/fullname", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserId(data.userId);
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };

    const fetchAnswers = async () => {
      try {
        const response = await fetch(`/api/questions/${title}/answers`);
        if (!response.ok) {
          throw new Error("Failed to fetch answers");
        }
        const data = await response.json();
        // Reverse the order of answers to show the latest first
        setAnswers(data.answers);
      } catch (error) {
        console.error("Error fetching answers: ", error);
      }
    };

    fetchQuestionDetails();
    fetchUserDetails();
    fetchAnswers(); // Fetch answers for the question
  }, [title]);

  const handleVote = async (type, isAdding) => {
    try {
      const response = await fetch(`/api/questions/${title}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, isAdding }),
      });

      if (!response.ok) {
        throw new Error("Failed to update vote count");
      }

      const updatedQuestion = await response.json();
      setQuestion(updatedQuestion.question);
    } catch (error) {
      console.error("Error updating vote count: ", error);
    }
  };

  const handleUpvote = () => {
    if (!question || !userId) return;
    const isCurrentlyUpvoted = question.upvotes.includes(userId);
    const isCurrentlyDownvoted = question.downvotes.includes(userId);

    if (isCurrentlyUpvoted) {
      handleVote("upvote", false);
    } else {
      handleVote("upvote", true);
      if (isCurrentlyDownvoted) {
        handleVote("downvote", false);
      }
    }
  };

  const handleDownvote = () => {
    if (!question || !userId) return;
    const isCurrentlyDownvoted = question.downvotes.includes(userId);
    const isCurrentlyUpvoted = question.upvotes.includes(userId);

    if (isCurrentlyDownvoted) {
      handleVote("downvote", false);
    } else {
      handleVote("downvote", true);
      if (isCurrentlyUpvoted) {
        handleVote("upvote", false);
      }
    }
  };

  const handleAnswerSubmit = async (event) => {
    event.preventDefault();
    const answerContent = event.target.elements.description.value.trim();

    if (!answerContent) {
      alert("Answer cannot be empty");
      return;
    }

    try {
      const response = await fetch(`/api/questions/${title}/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: answerContent }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit answer");
      }

      const newAnswer = await response.json();
      // Add new answer to the beginning of the answers array
      setAnswers((prevAnswers) => [newAnswer.answer, ...prevAnswers]); // Add new answer to the beginning
      event.target.reset(); // Clear the textarea
    } catch (error) {
      console.error("Error submitting answer: ", error);
      alert("Error submitting answer: " + error.message);
    }
  };

  const handleSaveQuestion = async () => {
    try {
      const response = await fetch(`/api/questions/${title}/save`, {
        method: isSaved ? "DELETE" : "POST", // Use DELETE to unsave
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to save question");
      }

      setIsSaved((prev) => !prev); // Toggle saved status
    } catch (error) {
      console.error("Error saving question: ", error);
    }
  };

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="flex flex-col">
        <Header onToggleSidebar={toggleSidebar} className="fixed top-0 left-0 right-0 z-10 bg-white" />
        <Sidebar isVisible={isSidebarVisible} />
        <div className="flex flex-grow mt-14 openSans">
          <div className="flex-col flex-grow overflow-y-auto">
            <div className="w-full bg-white p-4 openSans flex flex-col items-start justify-between gap-2 laptop:w-2/3 laptop:mx-auto">
              <div className="w-full border-b border-b-gray-300">
                <div className="w-full flex justify-between mobile:flex-col-reverse mobile:gap-2">
                  <h1 className="text-2xl font-medium">{question?.title || "Loading title..."}</h1>
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
                    <span className="text-red-600 tracking-wider">{question.authorFullname || "Anonymous"}</span> on{" "}
                    <span>{question?.timestamp ? getTimeDifference(question.timestamp) : "N/A"}</span>
                  </span>
                </div>
              </div>
              <div className="w-full flex gap-6 my-3 border-b border-b-gray-300">
                <div className="flex flex-col gap-3">
                  <div
                    className="rounded-full p-2 flex items-center justify-center border border-gray-400 cursor-pointer transition-transform hover:scale-110"
                    onClick={handleUpvote}
                  >
                    <FontAwesomeIcon
                      icon={
                        question?.upvotes.includes(userId)
                          ? faThumbsUpSolid
                          : faThumbsUpReg
                      }
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <p>{question?.upvotes.length - question?.downvotes.length || 0}</p>
                  </div>
                  <div
                    className="rounded-full p-2 flex items-center justify-center border border-gray-400 cursor-pointer transition-transform hover:scale-110"
                    onClick={handleDownvote}
                  >
                    <FontAwesomeIcon
                      icon={
                        question?.downvotes.includes(userId)
                          ? faThumbsDownSolid
                          : faThumbsDownReg
                      }
                    />
                  </div>
                  <div
                    className="rounded-full p-2 flex items-center justify-center border border-gray-400 cursor-pointer transition-transform hover:scale-110"
                    onClick={handleSaveQuestion} // Add click handler
                  >
                    <FontAwesomeIcon
                      icon={isSaved ? faBookmarkSolid : faBookmarkReg} // Toggle icon
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-8 mb-4">
                  <p className="text-sm tracking-wide text-gray-600">{question?.description || "No description available"}</p>
                  <div className="flex items-center gap-2 text-[0.6rem] font-bold mobile:w-full tablet:w-full mobile:flex-wrap tablet:flex-wrap">
                    {question?.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-slate-200 rounded p-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-full mt-6">
                <p className="font-medium">{answers.length}{" "}Answers</p>
                {answers.length > 0 ? (
                  answers.map((answer, index) => (
                    <div key={index} className="border-b border-b-gray-300 p-4">
                      <p className="text-sm tracking-wide text-gray-600">{answer.content}</p>
                      <span className="text-[0.65rem] text-gray-400">
                        Answered by{" "}
                        <span className="text-red-600 tracking-wider">{answer.authorFullname || "Anonymous"}</span> on{" "}
                        <span>{getTimeDifference(answer.timestamp)}</span>
                      </span>
                    </div>
                  ))
                ) : (
                  <p>No answers yet.</p>
                )}
              </div>
              <div className="w-full mt-8">
                <p className="font-medium">Your answer</p>
                <form onSubmit={handleAnswerSubmit}>
                  <textarea
                    id="description"
                    className="w-full border border-gray-300 rounded-md mt-4 p-2 text-[0.7rem]"
                    placeholder="Write your answer..."
                    name="content"
                    rows={8}
                    required
                  />
                  <button
                    type="submit"
                    className="border openSans border-red-600 bg-white font-light text-red-600 rounded text-xs mt-4 p-2 hover:bg-red-100"
                  >
                    Post Answer
                  </button>
                </form>
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