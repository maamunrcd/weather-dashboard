// src/components/SearchBar/SearchBar.tsx

import React, { useState, useCallback } from "react";
import { Input } from "antd";
import { debounce } from "../../utils/debounce";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState<string>("");

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value.trim());
    }, 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    debouncedSearch(value.toLowerCase());
  };

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city.trim());
      setCity("");
    }
  };

  return (
    <Input
      placeholder="Enter city name"
      value={city}
      onChange={handleChange}
      onPressEnter={handleSearch}
      size="large"
    />
  );
};

export default SearchBar;
