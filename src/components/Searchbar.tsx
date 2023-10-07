import React from "react";

const Searchbar = () => {
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("Track item");
  };

  return (
    <form className="mt-12 flex flex-wrap gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Amazon product link"
        className="w-full min-w-[200px] flex-1 rounded-md border border-gray-300 p-3 text-gray-500 shadow-sm focus:outline-1 focus:outline-green-300"
      />

      <button className="cta-button" type="submit">
        Track
      </button>
    </form>
  );
};

export default Searchbar;
