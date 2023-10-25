import React, { useState, type KeyboardEvent } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";

const Searchbar = () => {
  const [link, setLink] = useState<string>("");

  const ctx = api.useContext();

  const { mutate, isLoading } = api.product.create.useMutation({
    onSuccess: () => {
      setLink("");
      toast.success("Added product to track!");
      void ctx.product.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors?.content;
      if (errorMessage?.[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error(e.message);
      }
    },
  });

  const handleClickSubmit = () => {
    if (link !== "") {
      mutate({ url: link });
    }
  };

  const handleKeyboardSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (link !== "") {
        mutate({ url: link });
      }
    }
  };

  return (
    <div className="mt-12 flex flex-wrap gap-4 px-6 py-4 md:px-20">
      <input
        type="url"
        value={link}
        disabled={isLoading}
        placeholder="Enter Amazon product link"
        className="focus:outline-accent text-accent w-full min-w-[200px] flex-1 rounded-md border border-gray-300 p-3 shadow-sm focus:outline-1"
        onChange={(e) => setLink(e.target.value)}
        onKeyDown={handleKeyboardSubmit}
      />

      <button
        className="cta-button"
        type="submit"
        onClick={handleClickSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Tracking..." : "Track"}
      </button>
    </div>
  );
};

export default Searchbar;
