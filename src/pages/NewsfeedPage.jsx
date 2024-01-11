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

  const defaultData = {
    articles: [
    {
      title: "Scientists Make Breakthrough in Cancer Research",
      description: "A team of researchers discovers a potential cure for a rare form of cancer.",
      content: "Scientists have made a significant breakthrough in cancer research, offering hope for patients with a rare form of the disease...",
      author: "Dr. Amanda Johnson",
      publishedAt: "2024-01-11T09:15:00Z",
      url: "https://example.com/cancer-breakthrough",
      urlToImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1dSxRp0Skr1huD0teh0Lb38qqU_hLnwvWqA&usqp=CAU"
    },
    {
      title: "Space Exploration Mission Successfully Launched",
      description: "NASA's latest mission aims to explore distant planets and gather crucial data about the universe.",
      content: "NASA has successfully launched its most ambitious space exploration mission to date, aiming to uncover the mysteries of distant planets...",
      author: "Alan Spacewalker",
      publishedAt: "2024-01-10T18:45:00Z",
      url: "https://example.com/space-exploration",
      urlToImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1dSxRp0Skr1huD0teh0Lb38qqU_hLnwvWqA&usqp=CAU"
    },
    {
      title: "New Environmental Regulations Implemented Globally",
      description: "Countries unite to combat climate change with stricter environmental policies.",
      content: "In a joint effort to address the pressing issue of climate change, countries around the world have implemented new and stricter environmental regulations...",
      author: "Eco Guardian",
      publishedAt: "2024-01-09T14:20:00Z",
      url: "https://example.com/environmental-regulations",
      urlToImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1dSxRp0Skr1huD0teh0Lb38qqU_hLnwvWqA&usqp=CAU"
    },
    {
      title: "Technology Company Announces Groundbreaking AI Advancements",
      description: "Cutting-edge artificial intelligence technologies set to redefine industries.",
      content: "A leading technology company has announced groundbreaking advancements in artificial intelligence, with potential applications across various industries...",
      author: "Tech Innovator",
      publishedAt: "2024-01-08T12:30:00Z",
      url: "https://example.com/ai-advancements",
      urlToImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1dSxRp0Skr1huD0teh0Lb38qqU_hLnwvWqA&usqp=CAU"
    },
    {
      title: "Sports Team Celebrates Historic Victory",
      description: "Underdog team achieves a remarkable triumph in a thrilling championship game.",
      content: "In an unexpected turn of events, the underdog sports team celebrated a historic victory in a nail-biting championship game, leaving fans in awe...",
      author: "Sports Analyst",
      publishedAt: "2024-01-07T20:10:00Z",
      url: "https://example.com/historic-sports-victory",
      urlToImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1dSxRp0Skr1huD0teh0Lb38qqU_hLnwvWqA&usqp=CAU"
    },
    {
      title: "New Educational Initiative Aims to Bridge the Digital Divide",
      description: "A nonprofit organization launches a campaign to provide digital access to underserved communities.",
      content: "A nonprofit organization has initiated a new educational campaign with the goal of bridging the digital divide by providing access to technology in underserved communities...",
      author: "Education Advocate",
      publishedAt: "2024-01-06T16:55:00Z",
      url: "https://example.com/digital-divide-initiative",
      urlToImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1dSxRp0Skr1huD0teh0Lb38qqU_hLnwvWqA&usqp=CAU"
    },
    {
      title: "Healthcare Breakthrough: Promising Vaccine Shows High Efficacy",
      description: "A pharmaceutical company announces positive results in the development of a new vaccine.",
      content: "In a major development for global health, a pharmaceutical company has revealed highly promising results in the clinical trials of a new vaccine...",
      author: "Dr. Sarah Thompson",
      publishedAt: "2024-01-05T11:40:00Z",
      url: "https://example.com/promising-vaccine",
      urlToImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1dSxRp0Skr1huD0teh0Lb38qqU_hLnwvWqA&usqp=CAU"
    },
    {
      title: "Cultural Event Draws Record Attendance",
      description: "A city's cultural festival becomes a massive success, attracting visitors from around the world.",
      content: "The annual cultural festival of a vibrant city has achieved record attendance this year, drawing visitors and participants from diverse backgrounds...",
      author: "Cultural Correspondent",
      publishedAt: "2024-01-04T19:25:00Z",
      url: "https://example.com/cultural-event-success",
      urlToImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1dSxRp0Skr1huD0teh0Lb38qqU_hLnwvWqA&usqp=CAU"
    },
    {
      title: "Finance Industry Adopts Blockchain Technology for Efficiency",
      description: "Leading financial institutions embrace blockchain to streamline operations and enhance security.",
      content: "In a move towards technological innovation, major players in the finance industry are adopting blockchain technology to improve efficiency and security...",
      author: "Financial Analyst",
      publishedAt: "2024-01-03T13:15:00Z",
      url: "https://example.com/blockchain-finance",
      urlToImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1dSxRp0Skr1huD0teh0Lb38qqU_hLnwvWqA&usqp=CAU"
    },
    {
      title: "Fashion Week Showcases Sustainable and Ethical Designs",
      description: "Fashion industry leaders prioritize sustainability and ethical practices in a renowned fashion week event.",
      content: "This year's fashion week witnessed a significant shift as industry leaders showcased sustainable and ethical designs, signaling a commitment to responsible fashion...",
      author: "Fashion Insider",
      publishedAt: "2024-01-02T09:50:00Z",
      url: "https://example.com/sustainable-fashion-week",
      urlToImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1dSxRp0Skr1huD0teh0Lb38qqU_hLnwvWqA&usqp=CAU"
    }
    ]
  }

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

    const isFirstLogin = user ? user.first_login : 0;

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
    // content = <div className="p-5 text-red-500">Error fetching news ( Need to update your back-end api :) )</div>;
    content = <Newsfeed data={defaultData} />;
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
