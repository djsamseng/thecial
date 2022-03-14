import React, { createContext, useContext } from "react";

import GiftItemComponent from "./gift-item";
import { GiftResultProviderContext } from "./gift-result-provider-context";
import { GiftResult } from "../providers/gift-provider";



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
    const { searchMatches, loadMore } = this.context;
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
        <ul className="flex flex-row flex-wrap items-start justify-center space-x-2">
          {
            matches.map(giftResult => {
              return (
                <GiftItemComponent gift={giftResult} />
              );
            })
          }
        </ul>
      </div>
    )
  }

  private loadMoreOnScroll() {
    if (!window || !document || !document.documentElement) {
      return;
    }
    if (window.innerHeight + document.documentElement.scrollTop + 50 >= document.scrollingElement.scrollHeight) {
      const { loadMore, isSearching } = this.context;
      if (!isSearching) {
        loadMore(this.state.maxResults + 8);
        this.setState({
          maxResults: this.state.maxResults + 8,
        });
      }

    }
  }
}

export default GiftsSearchComponent;
