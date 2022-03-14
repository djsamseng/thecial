import React, { useContext } from "react";

import { SearchBarContext } from "./search-context";
import { GiftResultProviderContext } from "./gift-result-provider-context";
import GiftItemComponent from "./gift-item";
import GiftProviderInstance, { GiftResult } from "../providers/gift-provider";

type SupaGiftsComponentProps = {};
type SupaGiftsComponentState = {
  matches: Array<GiftResult>;
  maxResults: number;
}

class SupaGiftsComponent extends React.Component<SupaGiftsComponentProps, SupaGiftsComponentState> {
  constructor(props: SupaGiftsComponentProps) {
    super(props);
    this.state = {
      matches: [],
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
    const { searchText } = useContext(SearchBarContext);
    const { searchMatches, loadMore, hasMore } = useContext(GiftResultProviderContext);
    const matches = searchMatches;
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
      this.setState({
        maxResults: this.state.maxResults + 8,
      })
    }
  }

}

export default SupaGiftsComponent;
