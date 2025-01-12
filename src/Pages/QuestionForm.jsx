import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const QuestionForm = () => {
  const [activeInfo, setActiveInfo] = useState("title");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Header onToggleSidebar={handleToggleSidebar} />
      <Sidebar isMenuOpen={isMenuOpen} />
      <div className="w-full bg-white p-4 openSans flex flex-col items-start justify-between gap-2 laptop:w-3/5 laptop:mx-auto">
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <p className="montserrat text-xl mobile:w-3/4 mobile:text-center">
            Asking a question in Staging Ground
          </p>
          <p className="text-xs tracking-wider text-center">
            A private space to help new users write their questions.
          </p>
        </div>
        <form className="w-full poppins flex flex-col gap-10 my-16">
          <div className="w-full flex flex-col gap-2">
            <div
              className={`info w-full border border-gray-300 rounded-md p-5 flex gap-4 ${
                activeInfo === "title" ? "block" : "hidden"
              }`}
            >
              <FontAwesomeIcon
                icon={faPencil}
                className="text-3xl text-red-600"
              />
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">Writing a good title</p>
                <p className="text-xs font-light">
                  Your title should summarize the problem.
                </p>
                <p className="text-xs font-light">
                  You might find that you have better idea of your title after
                  writing out the rest of the question.
                </p>
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="title" className="text-sm font-semibold">
                Title
              </label>
              <p className="text-[0.65rem] font-light">
                Be specific and imagine you&apos;re asking a question to another
                person.
              </p>
              <input
                type="text"
                id="title"
                className="w-full border border-gray-300 rounded-md mt-4 p-2 text-[0.7rem]"
                placeholder="e.g. Is there an R function for finding the index of an array?"
                onFocus={() => setActiveInfo("title")}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <div
              className={`info w-full border border-gray-300 rounded-md p-5 flex gap-4 ${
                activeInfo === "description" ? "block" : "hidden"
              }`}
            >
              <FontAwesomeIcon
                icon={faPencil}
                className="text-3xl text-red-600"
              />
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">Introduce the problem</p>
                <p className="text-xs font-light">
                  Explain how you encountered the problem you&apos;re trying to
                  solve, and any difficulties that have prevented you from
                  solving it yourself.
                </p>
                <p className="text-xs font-light">
                  Show what you&apos;ve tried, tell us what happened, and why it
                  didn&apos;t meet your needs.
                </p>
                <p className="text-xs font-light">
                  Not all questions benefit from including code, but if your
                  problem is better understood with code you&apos;ve written,
                  you should include a minimal, reproducible example.
                </p>
              </div>
            </div>
            <div className="w-full">
              <label htmlFor="description" className="text-sm font-semibold">
                What are the details of your problem?
              </label>
              <p className="text-[0.65rem] font-light">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </p>
              <input
                type="text"
                id="description"
                className="w-full border border-gray-300 rounded-md mt-4 p-2 text-[0.7rem]"
                placeholder="e.g. Is there an R function for finding the index of an array?"
                onFocus={() => setActiveInfo("description")}
              />
            </div>
          </div>

          <div className="w-full">
            <div
              className={`info w-full border border-gray-300 rounded-md p-5 flex gap-4 ${
                activeInfo === "tags" ? "block" : "hidden"
              }`}
            >
              <FontAwesomeIcon
                icon={faPencil}
                className="text-3xl text-red-600"
              />
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">Adding tags</p>
                <p className="text-xs font-light">
                  Tags help ensure that your question will get attention from
                  the right people.
                </p>
                <p className="text-xs font-light">
                  Tag things in more than one way so people can find them more
                  easily. Add tags for product lines, projects, teams, and the
                  specific technologies or languages used.
                </p>
              </div>
            </div>
            <div>
              <label htmlFor="tags" className="text-sm font-semibold">
                Tags
              </label>
              <p className="text-[0.65rem] font-light">
                Add up to 5 tags to describe what your question is about. Start
                typing to see suggestions.
              </p>
              <input
                type="text"
                id="title"
                className="w-full border border-gray-300 rounded-md mt-4 p-2 text-[0.7rem]"
                placeholder="e.g. Is there an R function for finding the index of an array?"
                onFocus={() => setActiveInfo("tags")}
              />
            </div>
          </div>

          <div className="">
            <button className="border openSans border-red-600 bg-white font-light text-red-600 rounded text-xs px-2 py-2">
              Ask Question
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default QuestionForm;
