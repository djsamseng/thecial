import React from "react";
import { RouteComponentProps } from "@reach/router";

import { navigate, withPrefix } from "gatsby";

export const SearchBarContext = React.createContext({
  pendingSearchText: "",
  searchText: "",
  setPendingSearchText: (val: string) => {},
  submitSearch: (override?: string, addToHistory?: boolean) => {},
});


type SearchBarContextComponentProps = {
  location: RouteComponentProps["location"];
  children: React.ReactNode;
}
type SearchBarContextComponentState = {
  searchText: string;
  pendingSearchText: string;
}
class SearchBarContextComponent extends React.Component<SearchBarContextComponentProps, SearchBarContextComponentState> {
  constructor(props: SearchBarContextComponentProps) {
    super(props);
    const searchText = this.getSearchTextFromLocation();
    this.state = {
      searchText,
      pendingSearchText: searchText,
    }
  }

  public render() {
    if ((this.props.location?.state as any)?.source === "navbar") {
      (this.props.location.state as any).source = "search-context";
      this.setState({
        pendingSearchText: "",
        searchText: "",
      });
    }
    const searchContext = {
      pendingSearchText: this.state.pendingSearchText,
      searchText: this.state.searchText,
      setPendingSearchText: (newText: string) => {
        this.setState({
          pendingSearchText: newText,
        })
      },
      submitSearch: this.submitSearch.bind(this),
    };
    return (
      <SearchBarContext.Provider value={searchContext}>
        { this.props.children }
      </SearchBarContext.Provider>
    )
  }


  private submitSearch(override?: string, addToHistory: boolean = true) {
    const searchText = override ? override : this.state.pendingSearchText;
    const newUrl = this.getNewUrl(searchText);
    if (this.props.location && this.props.location.pathname.indexOf(withPrefix("/gifts")) >= 0) {
      if (addToHistory) {
        window.history.pushState("", "", newUrl);
      }

      this.setState({
        pendingSearchText: searchText,
        searchText,
      });
    }
    else {
      navigate(newUrl);
    }
  }

  private getNewUrl(searchText: string) {
    const newUrl = "/gifts/?search=" + encodeURIComponent(searchText.replace(" ", "+"));
    return newUrl;
  }

  private getSearchTextFromLocation(): string {
    if (this.props.location && this.props.location.search) {
      const params = new URLSearchParams(this.props.location.search);
      const query = params.get("search").replace("+", " ");
      return query;
    }
    return "";
  }


}

export default SearchBarContextComponent;
