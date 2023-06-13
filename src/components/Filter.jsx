/* eslint-disable react/prop-types */
/* eslint-disable no-undef */

import {
  useFetchAuthorsQuery,
  useFetchCategoriesQuery,
  useFetchSourcesQuery,
} from "../store";
import { IoFilter } from "react-icons/io5";
import { useState } from "react";
import Button from "../components/Button";
import Input from "./Input";

function Filter({ onChange }) {
  const date = new Date();
  date.setDate(date.getDate() - 2); // Subtract 2 days from today's date
  const twoDaysBeforeNow = date.toISOString().split("T")[0];

  const today = new Date().toISOString().split("T")[0];

  const [toggleFilter, setToggleFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [dateFrom, setDateFrom] = useState(twoDaysBeforeNow);
  const [dateTo, setDateTo] = useState(today);

  const {
    data: categories,
    error: categoriesError,
    isFetching: categoriesIsFetching,
  } = useFetchCategoriesQuery(null);

  const {
    data: sources,
    error: sourcesError,
    isFetching: sourcesIsFetching,
  } = useFetchSourcesQuery(selectedCategory);

  const {
    data: authors,
    error: authorsError,
    isFetching: authorsIsFetching,
  } = useFetchAuthorsQuery({ sources: selectedSources });

  const handleToggleFilter = () => {
    setToggleFilter(!toggleFilter);
  };

  const handleChooseCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleSelectSource = (source) => {
    if (selectedSources.includes(source)) {
      const updatedItems = selectedSources.filter((id) => id !== source);
      setSelectedSources(updatedItems);
      return;
    }

    setSelectedSources([...selectedSources, source]);
  };

  const handleSelectAuthor = (author) => {
    if (selectedAuthors.includes(author)) {
      const updatedItems = selectedAuthors.filter((id) => id !== author);
      setSelectedSources(updatedItems);
      return;
    }
    setSelectedAuthors([...selectedAuthors, author]);
  };

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };

  const handleApplyFilters = () => {
    const filters = {
      category: selectedCategory,
      sources: selectedSources,
      authors: selectedAuthors,
      from: dateFrom,
      to: dateTo,
    };

    onChange(filters);
    handleToggleFilter();
  };

  let renderedCategories;
  let renderedSources;
  let renderedAuthors;

  if (categoriesIsFetching) {
    renderedCategories = "Please wait...";
  } else if (categoriesError) {
    renderedCategories = "Error fetching categories...";
  } else {
    renderedCategories = categories.map((category, idx) => {
      return (
        <div className=" flex gap-2 items-center __filter_subitem" key={idx}>
          <div className="">
            <Input
              type="radio"
              name="category"
              className="p-0 h-auto mt-0"
              id={category}
              onClick={() => handleChooseCategory(category)}
            />
          </div>

          <div>
            <label htmlFor={category} className="capitalize">
              {category}
            </label>
          </div>
        </div>
      );
    });
  }

  if (sourcesIsFetching) {
    renderedSources = "Please wait...";
  } else if (sourcesError) {
    renderedSources = "Error fetching sources...";
  } else {
    renderedSources = sources.sources.map((source, idx) => {
      return (
        <div className=" flex gap-2 items-center __filter_subitem" key={idx}>
          <div className="">
            <Input
              type="checkbox"
              name={source.id}
              className="p-0 h-auto mt-0"
              id={source.id}
              onClick={() => handleSelectSource(source.id)}
            />
          </div>

          <div>
            <label htmlFor={source.id} className="capitalize">
              {source.name}
            </label>
          </div>
        </div>
      );
    });
  }

  if (authorsIsFetching) {
    renderedAuthors = "Please wait...";
  } else if (authorsError) {
    if (!selectedSources.length) {
      renderedAuthors = "Please choose a source";
    } else {
      renderedAuthors = "Error fetching sources...";
    }
  } else {
    renderedAuthors = authors.map((author, idx) => {
      return (
        <div className=" flex gap-2 items-center __filter_subitem" key={idx}>
          <div className="">
            <Input
              type="checkbox"
              name={author}
              className="p-0 h-auto mt-0"
              id={author}
              onClick={() => handleSelectAuthor(author)}
            />
          </div>

          <div>
            <label htmlFor={author} className="capitalize">
              {author}
            </label>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="__filter relative">
      <Button className="p-0" onClick={() => handleToggleFilter()}>
        <IoFilter className="text-2xl text-[#2D3748]" />
      </Button>

      {toggleFilter && (
        <div className="flex z-50 absolute right-[10px] top-[39px]">
          <div className="text-[10px] flex gap-[31px]">
            <div className="text-[#2D3748] max-w-xs bg-white rounded shadow-lg p-4 font-normal dark:highlight-white/5 w-full">
              <div className="">
                <ul className="text-sm space-y-3">
                  <li className="flex flex-col">
                    <div className="__filter_title">
                      <h2 className="font-bold">Categories</h2>
                    </div>

                    <div className="ml-2 mt-2">{renderedCategories}</div>
                  </li>

                  <li className="flex flex-col">
                    <div className="__filter_title">
                      <h2 className="font-bold">Sources</h2>
                    </div>

                    <div className="ml-2 mt-2 max-h-[100px] overflow-auto">
                      {renderedSources}
                    </div>
                  </li>

                  <li className="flex flex-col">
                    <div className="__filter_title">
                      <h2 className="font-bold">Authors</h2>
                    </div>

                    <div className="ml-2 mt-2 max-h-[100px] overflow-auto">
                      {renderedAuthors}
                    </div>
                  </li>

                  <li className="flex gap-2 items-center">
                    <div>From</div>

                    <div>
                      <Input
                        type="date"
                        className="p-[5px] rounded mt-0 h-auto"
                        onChange={handleChange(setDateFrom)}
                        value={dateFrom}
                      />
                    </div>
                  </li>

                  <li className="flex gap-2 items-center">
                    <div>To</div>

                    <div>
                      <Input
                        type="date"
                        className="p-[5px] rounded mt-0 h-auto"
                        onChange={handleChange(setDateTo)}
                        value={dateTo}
                      />
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex justify-end">
                <Button
                  primary
                  className="py-2 px-5 mt-5 rounded-sm text-xs tracking-wide uppercase"
                  onClick={handleApplyFilters}
                >
                  Apply Filter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
