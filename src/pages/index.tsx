
import React, { createContext } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import { useStaticQuery, graphql, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import LayoutComponent from "../components/layout";
import { SearchBarContext } from "../components/searchbar";
import BestGiftAnimationComponent from "../components/best-gift-animation";
import GiftItemComponent from "../components/gift-item";




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
        iframe: "//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=gatherbadger-20&language=en_US&marketplace=amazon&region=US&placement=B07SMB7NSW&asins=B07SMB7NSW&linkId=8eba85cbd36b7a48b6f1377b7a75bd01&show_border=true&link_opens_in_new_window=true",
        title: "Personalized Golf Balls",
        tags: ["golf", "personalized"],
        html: `<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src=""></iframe>`,
        desc: "Personalize this with the name of the book they wrote or their favorite bird for a birdie!",
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
    return (
      <SearchBarContext.Provider value={searchContext}>
        <LayoutComponent pageTitle="Home Page">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl">Gather Badger</h1>
            <p>Helping You Find That Perfect Gift</p>

            <BestGiftAnimationComponent />

            <div className="items-center list-none">
              <div className="mt-20">
                <p className="text-xl font-bold">Grandpa + Golf + Bird = Grandpa's Favorite Birdie</p>

                <GiftItemComponent giftResult={personalizedGolfBall}>
                  <StaticImage className="mt-2" alt="Grandpa's favorite birdie" src="../images/grandpas_favorite_birdie.png"/>
                </GiftItemComponent>

                <p className="mt-2">Show just how much you know him. Personalize a golfball with his favorite Birdie</p>
              </div>

              <div className="mt-20">
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
