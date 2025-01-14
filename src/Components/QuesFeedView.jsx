import React, { useEffect, useState } from "react";

const QuesFeedView = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/display-questions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data.questions.reverse());
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <>
      <div className="w-full bg-white p-4 openSans flex flex-col items-start justify-between gap-2 laptop:w-3/5 laptop:mx-auto">
        <p className="text-lg font-bold text-gray-800">
          Interesting posts for you
        </p>
        <span className="text-xs tracking-wide text-gray-600">
          Based on your viewing history and watched tags.
        </span>
        <div className="w-full flex flex-col border rounded border-gray-300 mt-2 text-[0.7rem]">
          {questions.map((question, index) => (
            <div
              key={index}
              className="w-full flex flex-col p-3 gap-1 border-b border-gray-300 laptop:flex-row laptop:items-start laptop:gap-4 mobile:w-full tablet:w-full"
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
                    ? `${question.answers.length} answer${
                        question.answers.length !== 1 ? "s" : ""
                      }`
                    : "0 answers"}
                </span>
              </div>
              <div className="flex flex-col gap-1 mobile:w-full tablet:w-full">
                <p className="text-xs text-red-600 tracking-wider">
                  {question.title}
                </p>
                <p className="text-[0.6rem] tracking-wider">
                  {question.description}
                </p>
                <div className="flex items-center gap-2 text-[0.6rem] font-bold mobile:w-full tablet:w-full mobile:flex-wrap tablet:flex-wrap">
                  {question.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-slate-200 rounded p-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-[0.6rem] justify-end">
                  <span className="text-red-600 tracking-wider">
                    {question.author}
                  </span>
                  <span className="text-gray-400">
                    {new Date(question.timestamp).toLocaleString()}
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

export default QuesFeedView;
