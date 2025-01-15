import React, { useState } from "react";
import { marked } from "marked";
import {
  faBold,
  faItalic,
  faCode,
  faListUl,
  faQuoteRight,
  faLink,
  faImage,
  faUndo,
  faRedo,
  faListOl,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostAnswer = () => {
  const [content, setContent] = useState("");
  const [history, setHistory] = useState([""]);
  const [historyIndex, setHistoryIndex] = useState(0);

  marked.setOptions({
    gfm: true,
    breaks: true,
  });

  const updateContent = (newContent) => {
    const updatedHistory = [...history.slice(0, historyIndex + 1), newContent];
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setContent(newContent);
  };

  const handleInsert = (syntaxStart, syntaxEnd = "", isLink = false) => {
    const textarea = document.querySelector("textarea");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const before = content.slice(0, start);
    const selectedText = content.slice(start, end) || "your text";
    const after = content.slice(end);

    let newContent = `${before}${syntaxStart}${selectedText}${syntaxEnd}${after}`;

    if (isLink) {
      const url = prompt("Enter the URL:");
      if (url) {
        newContent = `${before}[${selectedText}](${url})${after}`;
      }
    }

    updateContent(newContent);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setContent(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setContent(history[historyIndex + 1]);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <p>Your answer</p>
      <div className="w-full border border-gray-300 rounded-md flex flex-col justify-between">
        <div className="w-full flex border-b border-b-gray-300">
          <button
            className="w-[3rem] text-center py-2 rounded hover:bg-gray-300"
            onClick={() => handleInsert("**", "**")}
          >
            <FontAwesomeIcon icon={faBold} />
          </button>
          <button
            className="w-[3rem] text-center py-2 rounded hover:bg-gray-300"
            onClick={() => handleInsert("_", "_")}
          >
            <FontAwesomeIcon icon={faItalic} />
          </button>
          <button
            className="w-[3rem] text-center py-2 rounded hover:bg-gray-300"
            onClick={() => handleInsert("[", "]", true)}
          >
            <FontAwesomeIcon icon={faLink} />
          </button>
          <button
            className="w-[3rem] text-center py-2 rounded hover:bg-gray-300"
            onClick={() => handleInsert("> ")}
          >
            <FontAwesomeIcon icon={faQuoteRight} />
          </button>
          <button
            className="w-[3rem] text-center py-2 rounded hover:bg-gray-300"
            onClick={() => handleInsert("`", "`")}
          >
            <FontAwesomeIcon icon={faCode} />
          </button>
          <button
            className="w-[3rem] text-center py-2 rounded hover:bg-gray-300"
            onClick={() => handleInsert("![alt text](", ")")}
          >
            <FontAwesomeIcon icon={faImage} />
          </button>
          <button
            className="w-[3rem] text-center py-2 rounded hover:bg-gray-300"
            onClick={() => handleInsert("- ")}
          >
            <FontAwesomeIcon icon={faListUl} />
          </button>
          <button
            className="w-[3rem] text-center py-2 rounded hover:bg-gray-300"
            onClick={() => handleInsert("1. ")}
          >
            <FontAwesomeIcon icon={faListOl} />
          </button>
          <button
            className="w-[3rem] text-center py-2 rounded hover:bg-gray-300"
            onClick={handleUndo}
            disabled={historyIndex === 0}
          >
            <FontAwesomeIcon icon={faUndo} />
          </button>
          <button
            className="w-[3rem] text-center py-2 rounded hover:bg-gray-300"
            onClick={handleRedo}
            disabled={historyIndex === history.length - 1}
          >
            <FontAwesomeIcon icon={faRedo} />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          className="w-full p-3 rounded-b-md text-sm outline-none"
          rows="10"
          value={content}
          onChange={(e) => updateContent(e.target.value)}
          placeholder="Type your content here..."
        ></textarea>
      </div>
      {/* Preview */}
      <div className="mt-4 w-full p-2 border border-gray-300 rounded bg-gray-100 text-sm">
        <h3 className="font-bold mb-2">Preview</h3>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: marked(content) }}
        ></div>
      </div>
      <button className="border openSans w-[8rem] border-red-600 bg-white font-light text-red-600 rounded text-xs px-2 py-2 hover:bg-red-100">
        Post Your Answer
      </button>
    </div>
  );
};

export default PostAnswer;
