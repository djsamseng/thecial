import React, { createContext, useContext } from "react";

import { SearchBarContext } from "./search-context";
import GiftItemComponent from "./gift-item";

import GiftsSourceJSON from "../../data/gifts/gifts-source.json";

type GiftsSearchComponentProps = {};
type GiftsSearchComponentState = {
  maxResults: number;
}
type GiftResultItem = {
  id: number;
  title: string;
  img: string;
  real_title: string;
  url: string;
  img_amazon_ad?: string;
  img_amazon_orig?: string;
  iframe?: string;
  desc?: string;
  real_desc: string;
  price: number;
  score: number;
  tags: Array<string>;
};
type GiftResult = {
  queryMatches: Array<string>;
  titleMatches: Array<string>;
  descMatches: Array<string>;
  item: GiftResultItem;
}


function getData(): Array<GiftResultItem> {
  const data = GiftsSourceJSON.data;
  return data;
}

type TagToData = Record<string, {
  tagMatches: Array<number>;
  titleMatches: Array<number>;
  descMatches: Array<number>;
}>;
function getTagToData(data: Array<GiftResultItem>): TagToData  {
  const tagToData: TagToData = {};
  for (const item of data) {
    if (typeof item.id !== "number") {
      console.error("NOT NUMBER!", item.id);
    }
    for (let tag of item.tags) {
      tag = tag.toLowerCase();
      if (!tagToData[tag]) {
        tagToData[tag] = {
          tagMatches: [],
          titleMatches: [],
          descMatches: [],
        }
      }
      tagToData[tag].tagMatches.push(item.id);
    }
    for (let titleWord of item.title.split(" ")) {
      titleWord = titleWord.toLowerCase();
      if (!tagToData[titleWord]) {
        tagToData[titleWord] = {
          tagMatches: [],
          titleMatches: [],
          descMatches: [],
        }
      }
      tagToData[titleWord].titleMatches.push(item.id);
    }
    for (let realTitleWord of item.real_title.split(" ")) {
      realTitleWord = realTitleWord.toLowerCase();
      if (!tagToData[realTitleWord]) {
        tagToData[realTitleWord] = {
          tagMatches: [],
          titleMatches: [],
          descMatches: [],
        }
      }
      tagToData[realTitleWord].titleMatches.push(item.id);
    }
    for (let realDescWord of item.real_desc.split(" ")) {
      realDescWord = realDescWord.toLowerCase();
      if (!tagToData[realDescWord]) {
        tagToData[realDescWord] = {
          tagMatches: [],
          titleMatches: [],
          descMatches: [],
        }
      }
      tagToData[realDescWord].descMatches.push(item.id);
    }
  }
  return tagToData;
}

const GIFT_RESULTS = getData();
const ID_TO_GIFT_RESULT = Object.values(GIFT_RESULTS).reduce((map, g) => {
  map[g.id] = g;
  return map;
}, {} as Record<number, GiftResultItem>)
const TAG_TO_GIFT_RESULT = getTagToData(GIFT_RESULTS);
const ALL_GIFT_RESULTS: Array<GiftResult> = GIFT_RESULTS.map(item => {
  return {
    queryMatches: [],
    titleMatches: [],
    descMatches: [],
    item: item,
  };
});

class GiftsSearchComponent extends React.Component<GiftsSearchComponentProps, GiftsSearchComponentState> {
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
    const { searchText } = useContext(SearchBarContext);
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
              const item = giftResult.item;
              const newItem = {
                id: item.id,
                title: item.title,
                img: item.img,
                score_sum: 1,
                url: item.url,
                custom_desc: item.desc || "",
                word_matches: giftResult.queryMatches,
              }
              return (
                <GiftItemComponent gift={newItem} />
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
            TAG_TO_GIFT_RESULT[word].tagMatches.forEach(itemId => {
              const item = ID_TO_GIFT_RESULT[itemId]
              if (!matchesObj[item.id]) {
                matchesObj[item.id] = {
                  queryMatches: [],
                  titleMatches: [],
                  descMatches: [],
                  item: item,
                }
              }
              matchesObj[item.id].queryMatches.push(word);
            });
            TAG_TO_GIFT_RESULT[word].titleMatches.forEach(itemId => {
              const item = ID_TO_GIFT_RESULT[itemId]
              if (!matchesObj[item.id]) {
                matchesObj[item.id] = {
                  queryMatches: [],
                  titleMatches: [],
                  descMatches: [],
                  item: item,
                }
              }
              matchesObj[item.id].titleMatches.push(word);
            });
            TAG_TO_GIFT_RESULT[word].descMatches.forEach(itemId => {
              const item = ID_TO_GIFT_RESULT[itemId]
              if (!matchesObj[item.id]) {
                matchesObj[item.id] = {
                  queryMatches: [],
                  titleMatches: [],
                  descMatches: [],
                  item: item,
                }
              }
              matchesObj[item.id].descMatches.push(word);
            });
          }
        }
        matches = Object.values(matchesObj);
      }
    }
    matches.sort((a, b) => {
      const matchScore = (r: GiftResult) => {
        return r.queryMatches.length + 0.8 * r.titleMatches.length + 0.5 * r.item.score + 0.001 * r.descMatches.length
      }
      const aScore = matchScore(a);
      const bScore = matchScore(b);
      return bScore - aScore;
    });
    return matches.slice(0, this.state.maxResults);
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

export default GiftsSearchComponent;
