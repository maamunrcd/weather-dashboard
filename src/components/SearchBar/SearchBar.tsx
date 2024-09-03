// src/components/SearchBar/SearchBar.tsx

import React, { useState, useCallback } from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "../../utils/debounce"; // Import your custom debounce function
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const { Search } = Input;

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
    <div className={styles.searchBar}>
      <Search
        placeholder="Enter city name"
        value={city}
        onChange={handleChange}
        onPressEnter={handleSearch}
        enterButton={
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleSearch}
          >
            Search
          </Button>
        }
        size="large"
      />
    </div>
  );
};

export default SearchBar;
