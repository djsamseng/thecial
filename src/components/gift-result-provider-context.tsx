import React, { useContext } from "react";
import { RouteComponentProps } from "@reach/router";

import { navigate, withPrefix } from "gatsby";

import GiftProviderInstance from "../providers/gift-provider";
import { GiftResult } from "../providers/base-gift-provider";
import { SearchBarContext } from "./search-context";

export const GiftResultProviderContext = React.createContext({
  searchMatches: [],
  loadMore: (totalCount: number) => {},
  submitSearch: () => {},
  totalResults: 0,
  isSearching: false,
});

type GiftResultsProviderComponentProps = {
  children: React.ReactNode;
  location: RouteComponentProps["location"];
}

type GiftResultsProviderComponentState = {
  searchMatches: Array<GiftResult>;
  isSearching: boolean;
  totalResults: number;
}

class GiftResultsProviderComponent extends React.Component<GiftResultsProviderComponentProps, GiftResultsProviderComponentState> {
  static contextType = SearchBarContext;
  constructor(props: GiftResultsProviderComponentProps) {
    super(props);
    this.state = {
      searchMatches: [],
      isSearching: false,
      totalResults: 0,
    };

  }

  public render() {
    if ((this.props.location?.state as any)?.source === "search-context") {
      (this.props.location.state as any).source = "self";
      this.setState({
        searchMatches: [],
        isSearching: false,
        totalResults: 0,
      });
      this.getMatches("");
    }
    const { searchText, pendingSearchText, submitSearch } = this.context
    const giftResultProviderContext = {
      searchMatches: this.state.searchMatches,
      loadMore: this.loadMore.bind(this, searchText),
      totalResults: this.state.totalResults,
      isSearching: this.state.isSearching,
      submitSearch: this.submitSearch.bind(this, pendingSearchText, submitSearch),
    };
    return (
      <GiftResultProviderContext.Provider value={giftResultProviderContext}>
        { this.props.children }
      </GiftResultProviderContext.Provider>
    )

  }

  public componentDidMount(): void {
    this.getMatches(this.context.searchText);
    if (!window) {
      console.log("No window for componentDidMount");
      return;
    }
    window.addEventListener("popstate", this.handlePopState.bind(this));
  }

  public componentWillUnmount(): void {
    if (!window) {
      console.log("No window for componentWillUnmount");
      return;
    }
    window.removeEventListener("popstate", this.handlePopState.bind(this));
  }


  private async submitSearch(searchText: string, completion: (override?: string, addToHistory?:boolean) => void, addToHistory: boolean = true) {
    await this.getMatches(searchText);
    completion(searchText, addToHistory);
  }

  private async getMatches(searchText: string) {
    if (this.state.isSearching) {
      console.log("Already searching. Ignoring:", searchText);
      return;
    }
    if (this.props.location && this.props.location.pathname.indexOf(withPrefix("/gifts")) >= 0) {
      this.setState({
        isSearching: true,
        totalResults: 0,
      });
      console.log("Will search:", searchText);
      const { matches, totalResults } = await GiftProviderInstance.getGiftsForSearch(searchText);
      this.setState({
        searchMatches: matches,
        totalResults,
        isSearching: false,
      });
    }
  }

  private async loadMore(searchText: string, totalCount: number) {
    this.setState({
      isSearching: true,
      totalResults: 0,
    });
    const { matches, totalResults } = await GiftProviderInstance.getGiftsForSearch(searchText, totalCount);
    this.setState({
      searchMatches: matches,
      totalResults,
      isSearching: false,
    });
  }

  private handlePopState() {
    if (this.props.location.pathname.indexOf(withPrefix("/gifts")) >= 0) {
      const newSearchText = this.getSearchTextFromLocation();
      if (newSearchText.length > 0) {
        this.submitSearch(newSearchText, this.context.submitSearch, false);
      }
    }
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

export default GiftResultsProviderComponent;