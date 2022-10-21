import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useResultContext } from "../context/ResultContextProvider";

import { Links } from "./Links";

export const Search = () => {
  const [text, setText] = useState("Elon Musk");
  const { setSearchTerm } = useResultContext();

  // Debounce search term so that it only gives us latest value ...
  // ... if text has not been updated within last 300ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const [debouncedValue] = useDebounce(text, 300);

  useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
      <input
        value={text}
        type={text}
        className="sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
        placeholder="search googlè or type URL"
        onChange={(e) => setText(e.target.value)}
      />
      {!text && (
        <button
          type="button"
          className="absolute top-1.5 right-4 text-2xl text-gray-500"
          onClick={() => setText("")}
        >
          X
        </button>
      )}
      <Links />
    </div>
  );
};
