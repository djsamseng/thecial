import React, { createContext, useContext } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"

import LayoutComponent from "../../components/layout";

type GiftsSearchComponentProps = {
  searchEntryContext: React.Context<any>;
};
type GiftsSearchComponentState = {
  maxResults: number;
}

type GiftResultItem = {
  key: string;
  url?: string;
  title: string;
  tags: Array<string>;
  img?: string;
  iframe?: string;
  desc: string;
}
type GiftResult = {
  queryMatches: Array<string>;
  item: GiftResultItem;
}
function getData(): Array<GiftResultItem> {
  const data = [
    {
      url: "https://www.etsy.com/listing/828799390/",
      img: "https://i.etsystatic.com/24300406/r/il/41cf8d/2494911473/il_794xN.2494911473_k1r2.jpg",
      title: "Golf Cheating Device",
      tags: ["golf", "prank"],
      description: "",
    },
    {
      iframe: "//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=gatherbadger-20&language=en_US&marketplace=amazon&region=US&placement=B08PRTS8ZQ&asins=B08PRTS8ZQ&linkId=08d5f2060b90cdd4d801602f3876937d&show_border=true&link_opens_in_new_window=true",

      url: "https://www.amazon.com/dp/B08PRTS8ZQ?_encoding=UTF8&aaxitk=725dc1b75a163389022bd2f25cede2a3&hsa_cr_id=6905224560001&pd_rd_plhdr=t&pd_rd_r=bdf49a6b-dd0a-4c02-a8b7-a1729f488941&pd_rd_w=VJVZ5&pd_rd_wg=JYawM&linkCode=li3&tag=gatherbadger-20&linkId=eb7aae2f15687d33213bee51e445cf2c&language=en_US&ref_=as_li_ss_il",
      img: "//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B08PRTS8ZQ&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=gatherbadger-20&language=en_US",
      title: "Family Puzzle",
      tags: ["family", "picture", "puzzle", "personalized"],
      desc: "Personalize this with photos from a special vacation or wedding"
    },
    {
      url: "https://www.amazon.com/gp/product/B07Q6XSVS9/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=B07Q6XSVS9&linkCode=as2&tag=gatherbadger-20&linkId=f780aece6a780f63aba7d88539cdd422",
      img: "//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=B07Q6XSVS9&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=gatherbadger-20",
      title: "Personalized Hot Tub Sign",
      tags: ["hot", "tub", "pool", "personalized"],
      html: `<a target="_blank"  href=""><img border="0" src="" ></a>`,
      desc: "Personalize this with the name of the street you live on or the person's nickname."
    },
    {
      iframe: "//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=gatherbadger-20&language=en_US&marketplace=amazon&region=US&placement=B07SMB7NSW&asins=B07SMB7NSW&linkId=8eba85cbd36b7a48b6f1377b7a75bd01&show_border=true&link_opens_in_new_window=true",
      title: "Personalized Golf Balls",
      tags: ["golf", "personalized"],
      html: `<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src=""></iframe>`,
      desc: "Personalize this with the name of the book they wrote or their favorite bird for a birdie!"
    },
    {
      iframe: "//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=gatherbadger-20&language=en_US&marketplace=amazon&region=US&placement=1944247300&asins=1944247300&linkId=602066e3b93c400fb2c628419b5793f5&show_border=true&link_opens_in_new_window=true",
      title: "Crossword Jigsaw Puzzle",
      tags: ["jigsaw", "puzzle", "crossword"],
      desc: "",
    },
  ];

  return data.map((item, idx) => {
    item.key = idx;
    return item;
  });
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
    const { searchText, setSearchText } = useContext(this.props.searchEntryContext);
    const matches = this.getMatches(searchText);

    return (
      <div className="flex flex-col pt-5 pb-20 items-center">
        <ul className="">
          {
            matches.map(giftResult => {
              const item = giftResult.item;
              let img = null;
              let iframe = null;
              if (item.iframe) {
                iframe = (
                  <iframe className="ml-5 mt-1 w-[120px] h-[240px]" scrolling="no" src={item.iframe}/>
                )
              }

              if (item.img) {
                img = (
                  <img className="ml-5 mt-1 max-w-xs" src={item.img}></img>
                )
              }
              let queryMatches = giftResult.queryMatches.length > 0 ? giftResult.queryMatches.join(" ") : ""
              return (
                <li className="mt-5" key={item.key}>
                  <a target="_blank" href={item.url}>
                    <p className="text-2xl">{item.title}</p>
                    <div className="flex flex-row items-baseline">
                      {img}
                    </div>
                    <p className="mt-1">{item.desc}</p>
                  </a>
                  <p>{queryMatches}</p>
                </li>
              )
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
        console.log(wordsAry);
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
              if (!matchesObj[item.key]) {
                matchesObj[item.key] = {
                  queryMatches: [],
                  item: item,
                }
              }
              matchesObj[item.key].queryMatches.push(word);
            });
          }
        }
        matches = Object.values(matchesObj);
      }
    }
    return matches.slice(0, this.state.maxResults);
  }

  private loadMoreOnScroll() {
    if (!window || !document || !document.documentElement) {
      return;
    }
    if (window.innerHeight + document.documentElement.scrollTop + 20 >= document.scrollingElement.scrollHeight) {
      console.log("Should load more elements");
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
    this.state = {
      searchText: "",
    }
  }

  public render() {
    const SearchEntry = createContext({
      searchText: this.state.searchText,
      setSearchText: (val) => {
        this.setState({
          searchText: val,
        });
      }
    });
    return (
      <LayoutComponent pageTitle="Gifts" searchEntryContext={SearchEntry}>
        <GiftsSearchComponent searchEntryContext={SearchEntry} />
      </LayoutComponent>
    )
  }
}

export default GiftsIndexPage;
