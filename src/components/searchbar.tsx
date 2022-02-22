import React from "react";
import { Link } from "gatsby";

type SearchBarProps = {};
type SearchBarState = {
  searchText: string;
};
class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      searchText: "",
    }
  }
  public render() {
    return (
      <div className="hidden flex-1 sm:flex flex-row items-center shrink-0 min-w-fit">
        <form onSubmit={this.onSubmit.bind(this)}>
          <input className="border-slate-500 border-2 rounded" type="search" onChange={this.onSearchChange.bind(this)} value={this.state.searchText}></input>
          <button className="ml-5" type="submit">Search</button>
        </form>
      </div>
    );
  }

  private onSearchChange(evt) {

  }
  private onSubmit(evt) {

  }
}

export default SearchBar;