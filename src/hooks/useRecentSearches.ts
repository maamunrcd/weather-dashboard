import { useState } from "react";

const getRecentSearches = () => {
  const searches = localStorage.getItem("recentSearches");
  return searches ? JSON.parse(searches) : [];
};

const saveRecentSearches = (searches: { city: string }[]) => {
  localStorage.setItem("recentSearches", JSON.stringify(searches));
};

export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState<{ city: string }[]>(
    getRecentSearches()
  );

  const addSearch = (city: string) => {
    const newSearches = [
      { city },
      ...recentSearches.filter((search) => search.city !== city),
    ];
    setRecentSearches(newSearches);
    saveRecentSearches(newSearches);
  };

  return { recentSearches, addSearch };
};
