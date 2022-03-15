import React, { createContext, useContext } from "react";

import GiftItemComponent from "./gift-item";
import { GiftResultProviderContext } from "./gift-result-provider-context";
import { GiftResult } from "../providers/base-gift-provider";



type GiftsSearchComponentProps = {};
type GiftsSearchComponentState = {
  maxResults: number;
}

class GiftsSearchComponent extends React.Component<GiftsSearchComponentProps, GiftsSearchComponentState> {
  static contextType = GiftResultProviderContext;
  constructor(props: GiftsSearchComponentProps) {
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
    const { searchMatches, totalResults } = this.context as React.ContextType<typeof GiftResultProviderContext>;
    const matches = searchMatches as Array<GiftResult>;
    if (matches.length == 0) {
      return (
        <div className="pt-5 pb-20 px-3 items-center">
          Nothing Found!
        </div>
      )
    }
    return (
      <div className="pt-5 pb-20 px-3 items-center">
        <div className="flex flex-col items-end mx-14">
          <p className="">Showing {matches.length} of {totalResults}</p>
        </div>

        <ul className="flex flex-row flex-wrap items-start justify-center space-x-2">
          {
            matches.map(giftResult => {
              return (
                <GiftItemComponent gift={giftResult} />
              );
            })
          }
        </ul>
        { matches.length < totalResults ? (
          <div className="flex flex-col items-center mx-14">
            <button type="submit" onClick={this.onLoadMore.bind(this)}>{ matches.length < totalResults ? ("Load More") : ("") }</button>
          </div>
        ): (<div></div>)}

      </div>
    )
  }

  private onLoadMore() {
    const { loadMore, isSearching } = this.context as React.ContextType<typeof GiftResultProviderContext>;
    if (!isSearching) {
      loadMore(this.state.maxResults + 8);
      this.setState({
        maxResults: this.state.maxResults + 8,
      });
    }

  }

  private loadMoreOnScroll() {
    if (!window || !document || !document.documentElement) {
      return;
    }
    if (window.innerHeight + document.documentElement.scrollTop + 50 >= document.scrollingElement.scrollHeight) {
      this.onLoadMore();
    }
  }
}

export default GiftsSearchComponent;
