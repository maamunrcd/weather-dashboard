const saveRecentSearches = (searches: { city: string }[]) => {
  localStorage.setItem("recentSearches", JSON.stringify(searches));
};

export default saveRecentSearches;
