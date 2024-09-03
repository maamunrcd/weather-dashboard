const getRecentSearches = () => {
  const searches = localStorage.getItem("recentSearches");
  return searches ? JSON.parse(searches) : [];
};

export default getRecentSearches;
