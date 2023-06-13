/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Newsfeed from "../components/Newsfeed";
import Search from "../components/Search";
import useAuthContext from "../context/AuthContext";
import { useFetchNewsQuery, useSearchNewsQuery } from "../store";
import Filter from "../components/Filter";
import { useNavigate } from "react-router-dom";

function NewfeedPage() {
  const [searchValue, setSearchValue] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({}); // State to hold selected filters
  const navigate = useNavigate();

  const {
    data: allNews,
    error: allError,
    isFetching: allIsFetching,
  } = useFetchNewsQuery(null);

  const {
    data: searchData,
    error: searchError,
    isFetching: searchIsFetching,
  } = useSearchNewsQuery({ q: searchValue });

  const {
    data: filteredData,
    error: filteredError,
    isFetching: filteredIsFetching,
  } = useSearchNewsQuery({
    sources: selectedFilters.sources,
    from: selectedFilters.from,
    to: selectedFilters.to,
  });

  const { user, getUser, updateFirstLogin } = useAuthContext();

  useEffect(() => {
    if (!user) {
      getUser();
    }

    const isFirstLogin = user.first_login;

    if (parseInt(isFirstLogin)) {
      navigate("/preference");
      updateFirstLogin(user.id);
    }
  }, []);

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
  };

  let content;

  if (allIsFetching || searchIsFetching || filteredIsFetching) {
    content = <div className="p-5">Please wait...</div>;
  } else if (searchError || allError || filteredError) {
    content = <div className="p-5 text-red-500">Error fetching news</div>;
  } else {
    if (searchValue) {
      content = <Newsfeed data={searchData} />;
    } else if (selectedFilters.sources) {
      content = <Newsfeed data={filteredData} />;
    } else {
      content = <Newsfeed data={allNews} />;
    }
  }

  return (
    <div className="max-w-9xl mx-auto py-10 container bg-white">
      <div className="flex justify-start md:justify-between mb-5 mr-[17px] p-5 flex-col md:flex-row md:p-0 gap-3">
        <div>
          <h1 className=" font-bold tracking-wide uppercase text-gray-900 text-xl md:px-0">
            Latest News
          </h1>
        </div>
        <div className="flex gap-5 items-center">
          <Search
            handleSubmitSearch={handleSubmitSearch}
            handleSearchValueChange={handleSearchValueChange}
          />

          <Filter onChange={handleFilterChange} />
        </div>
      </div>

      {content}
    </div>
  );
}

export default NewfeedPage;
