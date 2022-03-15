

import GiftsSourceJSON from "../../data/gifts/gifts-source.json";

import { BaseGiftProvider, GiftResult } from "./base-gift-provider";

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
type GiftResultMatches = {
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
const ALL_GIFT_RESULTS: Array<GiftResultMatches> = GIFT_RESULTS.map(item => {
  return {
    queryMatches: [],
    titleMatches: [],
    descMatches: [],
    item: item,
  };
});

function getMatches(
  words: string,
  maxResults: number,
): {
  matches: Array<GiftResult>;
  totalResults: number;
}  {
  let matches = ALL_GIFT_RESULTS;
  if (words && words.length > 0) {
    const matchesObj:Record<string, GiftResultMatches> = {};
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
    const matchScore = (r: GiftResultMatches) => {
      return r.queryMatches.length + 0.8 * r.titleMatches.length + 0.5 * r.item.score + 0.001 * r.descMatches.length
    }
    const aScore = matchScore(a);
    const bScore = matchScore(b);
    return bScore - aScore;
  });
  const totalResults = matches.length;
  matches = matches.slice(0, maxResults);
  const matchResults = matches.map(m => {
    const item = m.item;
    return {
      id: item.id,
      title: item.title,
      img: item.img,
      score_sum: 1,
      url: item.url,
      custom_desc: item.desc || "",
      word_matches: m.queryMatches,
    };
  });
  return {
    matches: matchResults,
    totalResults,
  }
}

class StaticGiftProvider extends BaseGiftProvider {
  constructor() {
    super();
  }
  public async getMatches(searchText:string, totalCount: number) {
    return Promise.resolve(getMatches(searchText, totalCount));
  }
}

const s_staticGiftProvider = new StaticGiftProvider();
export default s_staticGiftProvider;
