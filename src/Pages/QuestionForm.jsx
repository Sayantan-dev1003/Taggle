import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";

const QuestionForm = () => {
  const [activeInfo, setActiveInfo] = useState("title");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const handleTagChange = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = tagInput.trim();
      if (value && !tags.includes(value) && tags.length < 5) {
        setTags([...tags, value]);
        setTagInput("");
      }
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tags }),
    });

    const result = await response.json();
    if (result.message === "Question created successfully") {
      toast.success("Question created successfully!"); // Success toast
      setTitle("");
      setDescription("");
      setTags([]);
      setTagInput("");
    } else {
      toast.error("Failed to create question."); // Error toast
    }
  };

  return (
    <>
      <Header onToggleSidebar={toggleSidebar} />
      <Sidebar isVisible={isSidebarVisible} />
      <div className="w-full bg-white p-4 pt-20 openSans flex flex-col items-start justify-between gap-2 laptop:w-2/3 laptop:mx-auto">
        <div className="flex flex-col justify-center items-center gap-2 w-full">
          <p className="montserrat text-xl mobile:w-3/4 mobile:text-center">
            Asking a question in Staging Ground
          </p>
          <p className="text-xs tracking-wider text-center">
            A private space to help new users write their questions.
          </p>
        </div>
        <form
          className="w-full poppins flex flex-col gap-10 my-16"
          onSubmit={handleSubmit}
          value={title}
        >
          <div className="w-full flex flex-col gap-2">
            <div
              className={`info w-full border border-gray-300 rounded-md p-5 flex gap-4 ${activeInfo === "title" ? "block" : "hidden"
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
                value={title}
                className="w-full border border-gray-300 rounded-md mt-4 p-2 text-[0.7rem]"
                placeholder="e.g. Is there an R function for finding the index of an array?"
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => setActiveInfo("title")}
                required
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <div
              className={`info w-full border border-gray-300 rounded-md p-5 flex gap-4 ${activeInfo === "description" ? "block" : "hidden"
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
              <textarea
                id="description"
                className="w-full border border-gray-300 rounded-md mt-4 p-2 text-[0.7rem]"
                placeholder="Describe your problem in detail..."
                value={description}
                rows={8}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={() => setActiveInfo("description")}
                required
              />
            </div>
          </div>

          <div className="w-full">
            <div
              className={`info w-full border border-gray-300 rounded-md p-5 flex gap-4 ${activeInfo === "tags" ? "block" : "hidden"
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
                id="tags"
                className="w-full border border-gray-300 rounded-md mt-4 p-2 text-[0.7rem]"
                placeholder="Add tags (up to 5)"
                onFocus={() => setActiveInfo("tags")}
                onKeyDown={handleTagChange}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-red-200 text-red-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagDelete(tag)}
                      className="ml-1 text-red-600 hover:text-red-800"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <button className="border openSans border-red-600 bg-white font-light text-red-600 rounded text-xs px-2 py-2 hover:bg-red-100" onClick={() => navigate("/feed")}>
              Ask Question
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default QuestionForm;
