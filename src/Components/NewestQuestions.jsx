import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewestQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/display-questions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const getTimeDifference = (timestamp) => {
    const now = new Date();
    const postedDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now - postedDate) / 1000);

    const intervals = [
      { label: "yr", seconds: 31536000 },
      { label: "mon", seconds: 2592000 },
      { label: "wk", seconds: 604800 },
      { label: "d", seconds: 86400 },
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
      <div className="w-full bg-white p-4 openSans flex flex-col items-start justify-between gap-2 laptop:w-2/3 laptop:mx-auto">
        <p className="text-lg text-gray-800">
          {questions.length} questions
        </p>
        <div className="w-full flex flex-col border rounded border-gray-300 mt-2 text-[0.7rem]">
          {questions.map((question, index) => (
            <div
              key={index}
              className="w-full flex flex-col p-3 gap-1 border-b border-gray-300 laptop:flex-row laptop:items-start laptop:gap-4 mobile:w-full tablet:w-full"
              onClick={() => navigate(`/questions/${question.title}`)}
            >
              <div className="flex items-center gap-2 laptop:w-1/4 laptop:flex-col laptop:items-end mobile:w-full tablet:w-full">
                <span>
                  {Array.isArray(question.upvotes) &&
                    Array.isArray(question.downvotes)
                    ? question.upvotes.length + question.downvotes.length
                    : 0}{" "}
                  votes
                </span>
                <span className="border border-green-900 bg-white font-light text-green-900 py-0.5 px-1 rounded">
                  {Array.isArray(question.answers)
                    ? `${question.answers.length} answer${question.answers.length !== 1 ? "s" : ""
                    }`
                    : "0 answers"}
                </span>
              </div>
              <div className="flex flex-col gap-1 laptop:w-3/4 mobile:w-full tablet:w-full">
                <p className="text-xs text-red-600 tracking-wider w-full">
                  {question.title}
                </p>
                <p className="text-[0.6rem] tracking-wider w-full">
                  {question.description}
                </p>
                <div className="flex items-center gap-2 text-[0.6rem] font-bold mobile:w-full tablet:w-full mobile:flex-wrap tablet:flex-wrap">
                  {question.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-slate-200 rounded p-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-[0.6rem] justify-end w-full">
                  <span className="text-red-600 tracking-wider">
                    {question.authorID ? question.authorID.fullname : "Anonymous"}
                  </span>
                  <span className="text-gray-400">
                    {getTimeDifference(question.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NewestQuestions;