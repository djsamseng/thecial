import React, { createContext, useContext } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import { graphql, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"

import SearchBar, { SearchBarContext } from "./searchbar";
import SupaGiftItemComponent, { SupabaseSearchResult } from "./supa-gift-item";

type SupaGiftsComponentProps = {};
type SupaGiftsComponentState = {
  maxResults: number;
}

class SupaGiftsComponent extends React.Component<SupaGiftsComponentProps, SupaGiftsComponentState> {
  constructor(props: SupaGiftsComponentProps) {
    super(props);
    this.state = {
      maxResults: 8,
    }
  }

  public componentDidMount(): void {
    if (!window) {
      return;
    }
    window.addEventListener("scroll", this.loadMoreOnScroll.bind(this));
  }

  public componentWillUnmount(): void {
    if (!window) {
      return;
    }
    window.removeEventListener("scroll", this.loadMoreOnScroll.bind(this));
  }


  public render() {
    const { searchText, setSearchText, submitSearch } = useContext(SearchBarContext);
    const matches = this.getMatches(searchText.toLowerCase());
    if (matches.length == 0) {
      return (
        <div className="pt-5 pb-20 px-3 items-center">
          Nothing Found!
        </div>
      )
    }
    return (
      <div className="pt-5 pb-20 px-3 items-center">
        <ul className="flex flex-row flex-wrap items-start justify-center space-x-2">
          {
            matches.map(giftResult => {
              return (
                <SupaGiftItemComponent giftResult={giftResult} />
              );
            })
          }
        </ul>
      </div>
    )
  }

  private getMatches(
    words?: string,
  ): Array<SupabaseSearchResult> {
    return [];
  }

  private loadMoreOnScroll() {
    if (!window || !document || !document.documentElement) {
      return;
    }
    if (window.innerHeight + document.documentElement.scrollTop + 50 >= document.scrollingElement.scrollHeight) {
      this.setState({
        maxResults: this.state.maxResults + 8,
      })
    }
  }

}

export default SupaGiftsComponent;
