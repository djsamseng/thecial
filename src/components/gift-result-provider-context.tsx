import React, { useContext } from "react";
import { RouteComponentProps } from "@reach/router";

import { withPrefix } from "gatsby";

import GiftProviderInstance, { GiftResult } from "../providers/gift-provider";
import { SearchBarContext } from "./search-context";

export const GiftResultProviderContext = React.createContext({
  searchMatches: [],
  loadMore: () => {},
  submitSearch: () => {},
  hasMore: true,
  isSearching: false,
});

type GiftResultsProviderComponentProps = {
  children: React.ReactNode;
  location: RouteComponentProps["location"];
}

type GiftResultsProviderComponentState = {
  searchMatches: Array<GiftResult>;
  isSearching: boolean;
  hasMore: boolean;
}

class GiftResultsProviderComponent extends React.Component<GiftResultsProviderComponentProps, GiftResultsProviderComponentState> {
  constructor(props: GiftResultsProviderComponentProps) {
    super(props);
    this.state = {
      searchMatches: [],
      isSearching: false,
      hasMore: true,
    };
    this.getMatches("");
  }

  public render() {
    if ((this.props.location?.state as any)?.source === "search-context") {
      (this.props.location.state as any).source = "self";
      this.setState({
        searchMatches: [],
        isSearching: false,
        hasMore: true,
      });
      this.getMatches("");
    }
    const { pendingSearchText, submitSearch } = useContext(SearchBarContext);
    const giftResultProviderContext = {
      searchMatches: this.state.searchMatches,
      loadMore: this.loadMore.bind(this),
      hasMore: this.state.hasMore,
      isSearching: this.state.isSearching,
      submitSearch: this.submitSearch.bind(this, pendingSearchText, submitSearch),
    };
    return (
      <GiftResultProviderContext.Provider value={giftResultProviderContext}>
        { this.props.children }
      </GiftResultProviderContext.Provider>
    )

  }

  private async submitSearch(searchText: string, completion: () => void) {
    await this.getMatches(searchText);
    completion();
  }

  private async getMatches(searchText: string) {
    if (this.state.isSearching) {
      console.log("Already searching. Ignoring:", searchText);
      return;
    }
    if (this.props.location && this.props.location.pathname.indexOf(withPrefix("/gifts")) >= 0) {
      this.setState({
        isSearching: true,
      });
      console.log("Will search:", searchText);
      const { matches, hasMore } = await GiftProviderInstance.getGiftsForSearch(searchText);
      this.setState({
        searchMatches: matches,
        hasMore,
        isSearching: false,
      });
    }
  }

  private async loadMore() {

  }
}

export default GiftResultsProviderComponent;