import React, { createContext, useContext } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import { graphql, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"

import SearchBar, { SearchBarContext } from "../../components/searchbar";
import LayoutComponent from "../../components/layout";
import GiftItemComponent, { GiftResultItem, GiftResult } from "../../components/gift-item";
import SEOComponent from "../../components/seo-component";
import GiftsSourceJSON from "../../../data/gifts/gifts-source.json";

type GiftsSearchComponentProps = {};
type GiftsSearchComponentState = {
  maxResults: number;
}

function getData(): Array<GiftResultItem> {
  const data = GiftsSourceJSON.data;

  return data;
}

function getTagToData(data) {
  const tagToData = {};
  for (const item of data) {
    for (const tag of item.tags) {
      if (!tagToData[tag]) {
        tagToData[tag] = []
      }
      tagToData[tag].push(item);
    }
  }
  return tagToData;
}

const GIFT_RESULTS = getData();
const TAG_TO_GIFT_RESULT = getTagToData(GIFT_RESULTS);
const ALL_GIFT_RESULTS: Array<GiftResult> = GIFT_RESULTS.map(item => {
  return {
    queryMatches: [],
    item: item,
  };
});

class GiftsSearchComponent extends React.Component<GiftsSearchComponentProps, GiftsSearchComponentState> {
  constructor(props: GiftsSearchComponentProps) {
    super(props);
    this.state = {
      maxResults: 5,
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
        <ul className="">
          {
            matches.map(giftResult => {
              return (
                <GiftItemComponent giftResult={giftResult} />
              );
            })
          }
        </ul>
      </div>
    )
  }

  private getMatches(
    words?: string,
  ): Array<GiftResult> {
    let matches = ALL_GIFT_RESULTS;
    if (words) {
      const matchesObj:Record<string, GiftResult> = {};
      const wordsAry = words.split(" ");
      if (wordsAry.length > 0) {
        matches = [];
        for (const word of wordsAry) {
          for (const tag in TAG_TO_GIFT_RESULT) {
            if (word.length > 0 && tag.startsWith(word) && tag !== word) {
              wordsAry.push(tag);
            }
          }
        }
        for (const word of wordsAry) {
          if (TAG_TO_GIFT_RESULT[word]) {
            TAG_TO_GIFT_RESULT[word].forEach(item => {
              if (!matchesObj[item.id]) {
                matchesObj[item.id] = {
                  queryMatches: [],
                  item: item,
                }
              }
              matchesObj[item.id].queryMatches.push(word);
            });
          }
        }
        matches = Object.values(matchesObj);
      }
    }
    matches.sort((a, b) => {
      if (a.queryMatches.length < b.queryMatches.length) {
        return 1;
      }
      else if (a.queryMatches.length > b.queryMatches.length) {
        return -1;
      }
      return 0;
    });
    return matches.slice(0, this.state.maxResults);
  }

  private loadMoreOnScroll() {
    if (!window || !document || !document.documentElement) {
      return;
    }
    if (window.innerHeight + document.documentElement.scrollTop + 20 >= document.scrollingElement.scrollHeight) {
      this.setState({
        maxResults: this.state.maxResults + 5,
      })
    }
  }

}

interface GiftsIndexPageProps extends RouteComponentProps {
};
type GiftsIndexPageState = {
  searchText: string;
};

class GiftsIndexPage extends React.Component<GiftsIndexPageProps,GiftsIndexPageState> {
  constructor(props: GiftsIndexPageProps) {
    super(props);
    let searchText = "";
    console.log("Created with props:", this.props);

    if (this.props.location.state && (this.props.location.state as any).searchText) {
      searchText = (this.props.location.state as any).searchText;
    }
    this.state = {
      searchText,
    }
  }

  public render() {
    const searchContext = {
      searchText: this.state.searchText,
      setSearchText: (val) => {
        this.setState({
          searchText: val,
        });
      },
      submitSearch: () => {
        navigate("/gifts", {
          state: {
            searchText: this.state.searchText,
          }
        });
      },
    };
    return (
      <SearchBarContext.Provider value={searchContext}>
        <LayoutComponent pageTitle="Gifts">
          <SEOComponent title="Gifts"/>
          <GiftsSearchComponent />
        </LayoutComponent>
      </SearchBarContext.Provider>

    )
  }
}

export default GiftsIndexPage;
