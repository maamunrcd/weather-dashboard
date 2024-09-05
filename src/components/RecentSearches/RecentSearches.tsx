import React from "react";
import { List, Typography } from "antd";

const { Title } = Typography;

interface RecentSearchesProps {
  recentSearches: string[];
  handleSearch: (city: string) => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({
  recentSearches,
  handleSearch,
}) => {
  console.log("recent: ", recentSearches);
  return (
    <div>
      <Title level={3}>Recent Searches</Title>
      <List
        bordered
        dataSource={recentSearches}
        renderItem={(item) => (
          <List.Item
            style={{ textTransform: "capitalize" }}
            onClick={() => handleSearch(item)}
          >
            {item}
          </List.Item>
        )}
      />
    </div>
  );
};

export default RecentSearches;
