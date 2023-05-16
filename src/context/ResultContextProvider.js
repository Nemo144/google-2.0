import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseUrl = "https://google-search74.p.rapidapi.com/";

export const ResultContextProvider = ({ children }) => {
  //API search results
  const [results, setResults] = useState([]);

  // Searching status (whether there is pending API request)
  const [isLoading, setIsLoading] = useState(false);

  //state for searchterm
  const [searchTerm, setSearchTerm] = useState("Nike");
  console.log(searchTerm);

  const getResults = async (type) => {
    setIsLoading(true);

    const response = await fetch(`${baseUrl}${type}`, {
      method: "GET",
      url: "https://google-search74.p.rapidapi.com/",
      params: { query: "Nike", limit: "10", related_keywords: "true" },
      headers: {
        "X-RapidAPI-Key": "",
        "X-RapidAPI-Host": "",
      },
    });

    const data = await response.json();

    setResults(data);
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
