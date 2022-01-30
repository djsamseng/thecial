import React from "react";
import { Link } from "gatsby";

type SearchBarProps = {};
type SearchBarState = {};
class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
  }
  public render() {
    return (
      <div className="hidden xl:block">
        <form className="h-14 flex items-center">
          <input className="appearance-none text-md py-1 px-2 focus:outline-none border-2 focus:ring-blue-600 focus:border-blue-600 dark:bg-gray-900 text-purple-900 dark:text-gray-100 placeholder-purple-300 dark:placeholder-gray-600 font-semibold rounded-l"
            type="search">
          </input>
          <button className="bg-blue-500 hover:bg-blue-800 px-5 py-1 text-lg font-bold hover:shadow-2xl cursor-pointer transition duration-250 ease-in-out rounded-r"
            type="submit" value="Search" color="blue">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;