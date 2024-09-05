import { useState } from "react";

const getRecentSearches = () => {
  const searches = localStorage.getItem("recentSearches");
  return searches ? JSON.parse(searches) : [];
};

const saveRecentSearches = (searches: string[]) => {
  localStorage.setItem("recentSearches", JSON.stringify(searches));
};

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>(
    getRecentSearches()
  );

  const addSearch = (city: string) => {
    const searchedCity = new Set([...getRecentSearches(), city]);
    setRecentSearches([...searchedCity]);
    saveRecentSearches([...searchedCity]);
  };

  return { recentSearches, addSearch };
};
