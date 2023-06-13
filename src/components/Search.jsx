/* eslint-disable react/prop-types */
import { IoSearch } from "react-icons/io5";
import Input from "../components/Input";

function Search({ handleSubmitSearch, handleSearchValueChange }) {
  return (
    <form onSubmit={handleSubmitSearch}>
      <div className="__search relative flex items-center justify-start">
        <IoSearch className="ml-[13px] absolute h-[15px] w-[15px] text-[#2D3748]" />
        <Input
          onChange={handleSearchValueChange}
          name="submit"
          className="border pl-10 focus:outline-none rounded-[10px] h-[40px] w-[200px]"
          placeholder="Search"
        ></Input>
      </div>
    </form>
  );
}

export default Search;
