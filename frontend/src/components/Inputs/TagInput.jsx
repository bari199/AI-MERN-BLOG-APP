import React, { useState } from "react";

const TagInput = ({ tags, setTags }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      const newTag = input.trim();

      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }

      setInput(""); // Clear input after adding
    }
  };

  const handleRemove = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center border border-gray-300 rounded-md p-2 min-h-12 mt-3">
      {tags.map((tag, index) => (
        <div
          className="flex items-center bg-sky-100/70 text-sky-700 px-3 py-1 rounded text-sm font-medium"
          key={index}
        >
          {tag}
          <button
            type="button"
            className="ml-2 text-sky-500 hover:text-sky-700 font-bold cursor-pointer"
            onClick={() => handleRemove(index)}
          >
            &times;
          </button>
        </div>
      ))}

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press enter"
        className="flex-1 min-w-[120px] border-none outline-none text-sm p-1"
      />
    </div>
  );
};

export default TagInput;
