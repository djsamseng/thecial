
import React, { createContext } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import { useStaticQuery, graphql, navigate, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import LayoutComponent from "../components/layout";
import { SearchBarContext } from "../components/searchbar";
import BestGiftAnimationComponent from "../components/best-gift-animation";
import GiftItemComponent from "../components/gift-item";
import SEOComponent from "../components/seo-component";

import HeadlineWithExamplesComponent, { ROTATION } from "../components/headline-with-examples";

interface IndexPageProps extends RouteComponentProps {

};
type IndexPageState = {
  searchText: string;
};
class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  constructor(props: IndexPageProps) {
    super(props);
    this.state = {
      searchText: "",
    }
  }

  render() {
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
    const personalizedGolfBall = {
      item: {
        key: "1",
        url: "https://www.amazon.com/dp/B07SMB7NSW?&linkCode=li2&tag=gatherbadger-20&linkId=9f9798d72e794f3ab815c0a91ad843f7&language=en_US&ref_=as_li_ss_il",
        iframe: "//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=gatherbadger-20&language=en_US&marketplace=amazon&region=US&placement=B07SMB7NSW&asins=B07SMB7NSW&linkId=8eba85cbd36b7a48b6f1377b7a75bd01&show_border=true&link_opens_in_new_window=true",
        title: "Personalized Golf Balls",
        tags: ["golf", "personalized"],
        html: `<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src=""></iframe>`,
        desc: "Personalize this with the name of their favorite bird for a birdie!",
      },
      queryMatches: ["grandpa", "golf", "birds"],
    };
    const trumpCandle = {
      item: {
        key: "2",
        url: "https://www.amazon.com/Donald-Trump-Candle-Scented-Embossed/dp/B08BFJH2Y1?crid=BAUEUFCK88K&keywords=trump+candle&qid=1645744608&sprefix=trump+candle%2Caps%2C84&sr=8-3&linkCode=li2&tag=gatherbadger-20&linkId=6bc507a87625441db09e77e4e3333dd1&language=en_US&ref_=as_li_ss_il",
        iframe: "//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=gatherbadger-20&language=en_US&marketplace=amazon&region=US&placement=B08BFJH2Y1&asins=B08BFJH2Y1&linkId=ac32dbce2bf5749b013b112b1428e19c&show_border=true&link_opens_in_new_window=true",
        img: "//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B08BFJH2Y1&Format=_SL160_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=gatherbadger-20&language=en_US",
        title: "Donald Trump Candle",
        tags: ["politics", "donald", "trump", "funny", "candle"],
        desc: "Net Weight: Huge",
      },
      queryMatches: ["coworker", "funny", "politics"]
    }
    const headlinesWithExamples = [
      {
        headline: "Personal",
        examples: [
          {
            text: "Their Name",
            rotation: ROTATION.R6,
          },
          {
            text: "A Book They Wrote",
            rotation: ROTATION.RN6,
          },
          {
            text: "Their Hangout Spot",
            rotation: ROTATION.R6,
          }
        ],
      },
      {
        headline: "Special",
        examples: [
          {
            text: "From the Heart",
            rotation: ROTATION.RN6,
          },
          {
            text: "Funny",
            rotation: ROTATION.R6
          }
        ]
      },
      {
        headline: "All About Them",
        examples: [
          {
            text: "Hobbies",
            rotation: ROTATION.R6,
          },
          {
            text: "Sports",
            rotation: ROTATION.R0,
          },
          {
            text: "Passions",
            rotation: ROTATION.RN6,
          }
        ],
      }
    ]
    return (
      <SearchBarContext.Provider value={searchContext}>
        <LayoutComponent pageTitle="Home Page">
          <SEOComponent title="Home Page"/>
          <div className="flex flex-col items-center">
            <div className="border-b dark:border-gray-700 self-stretch pb-10 px-3">
              <div className="flex flex-row justify-center">
                <div className="flex flex-col">
                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-center">Find the Perfect Gift</h1>
                  <HeadlineWithExamplesComponent headlines={headlinesWithExamples}/>
                  <div className="flex flex-col items-center sm:items-end">
                    <div className="flex flex-row space-x-4">
                      <Link className="text-2xl mt-10 rounded-md p-1 px-2 bg-slate-600 text-white" to="/gifts">Get Started</Link>
                      <Link className="text-2xl mt-10 border border-slate-600 rounded-md p-1 px-2" to="/guide">Read the Guide</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <BestGiftAnimationComponent />
            <div className="items-center list-none my-10 px-3">
              <div className="mt-20">
                <p className="text-xl font-bold">Grandpa + Golf + Bird = Grandpa's Favorite Birdie</p>
                <GiftItemComponent giftResult={personalizedGolfBall}>
                  <StaticImage className="mt-2" alt="Grandpa's favorite birdie" src="../images/grandpas_favorite_birdie.png"/>
                </GiftItemComponent>
              </div>
              <div className="mt-10">
                <p className="text-xl font-bold">Coworker + Funny + Politics = Donald Trump Candle</p>
                <GiftItemComponent giftResult={trumpCandle}>
                </GiftItemComponent>
              </div>
            </div>
          </div>
        </LayoutComponent>
      </SearchBarContext.Provider>
    );
  }
}

export default IndexPage;
