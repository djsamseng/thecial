import React, { useContext } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import { Link, navigate } from "gatsby";

type SearchBarProps = {
  searchEntryContext: React.Context<any>;
};
type SearchBarState = {
  searchText: string;
};
class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    console.log("Search props:", props);
    this.state = {
      searchText: "",
    }
  }
  public render() {
    if (!this.props.searchEntryContext) {
      return (
        <div></div>
      )
    }
    console.log(this.props.searchEntryContext);
    const { searchText, setSearchText } = useContext(this.props.searchEntryContext);
    return (
      <div className="flex-1 flex flex-row items-center shrink-0 min-w-fit px-1">
        <form className="flex-1 flex flex-row" onSubmit={this.onSubmit.bind(this)}>
          <input className="flex-1 border-slate-500 text-slate-900 border-2 rounded" type="search" onChange={(evt) => setSearchText(evt.target.value)} value={searchText} ></input>
          <button className="ml-5" type="submit">Search</button>
        </form>
      </div>
    );
  }

  private onSearchChange(evt) {
    this.setState({
      searchText: evt.target.value,
    })
  }
  private onSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    navigate("/gifts", {
      state: {
        searchText: this.state.searchText,
      }
    });
  }
}

export default SearchBar;