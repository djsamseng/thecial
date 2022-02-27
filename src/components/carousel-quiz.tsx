import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import GiftItemComponent from "./gift-item";


type CarouselQuizElementProps = {
  image: any;
  quizText: string;
  answerText: string;
  searchText: string;
};
type CarouselQuizElementState = {

};
class CarouselQuizElement extends React.Component<CarouselQuizElementProps, CarouselQuizElementState> {
  constructor(props: CarouselQuizElementProps) {
    super(props);
  }

  public render() {
    return (
      <Link className="m-4 bg-stone-50 hover:bg-white dark:bg-gray-900 dark:hover:bg-gray-800" to="/gifts" state={{ searchText: this.props.searchText}}>
        <div className="flex flex-col items-stretch">
          <div className="flex flex-row mb-1">
            <input className="flex-1 pl-1 border-slate-500 border-2 rounded-lg rounded-r-none border-r-0 border-opacity-50 dark:border-slate-700"
                type="search"
                value={this.props.quizText}
                disabled={true}
                aria-disabled={true}
              />
            <button className="bg-amber-200 border-slate-500 border-2 w-9 h-9 sm:h-10 rounded-r-lg border-l-0 flex flex-col items-center justify-center opacity-50"
              type="submit"
              disabled={true}
              aria-disabled={true}>
                <svg className="w-5 h-5 dark:text-black dark:opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
              </button>
          </div>

          {this.props.image}
          <div className="h-[40px] mt-[-40px] z-10 rounded-b-lg bg-gray-900 opacity-50">
          </div>
          <div className="mt-[-40px] flex flex-col z-20 items-center text-xl text-white">
            {this.props.answerText}
          </div>
        </div>
      </Link>
    )
  }
}

type CarouselQuizComponentProps = {};
type CarouselQuizComponentState = {};

class CarouselQuizComponent extends React.Component<CarouselQuizComponentProps, CarouselQuizComponentState> {
  constructor(props: CarouselQuizComponentProps) {
    super(props);
  }

  public render() {
    return (
      <div className="flex flex-row justify-center">
        <div className="flex flex-col items-center">

          <CarouselQuizElement image={(<StaticImage className="rounded-b-lg" alt="Personalized Potato Chips Bag" src="../images/grandmas-ruffles.png" width={400}/>)}
            quizText="Grandma + Potato Chips"
            answerText="Personalized Potato Chips Bag"
            searchText="grandma potato chips" />
          <CarouselQuizElement image={(<StaticImage className="rounded-b-lg" alt="Custom NFL Logo Phone Charger" src="../images/jen-nfl-leather.png" width={400}/>)}
            quizText="Football + iPhone"
            answerText="Custom NFL Logo Phone Charger"
            searchText="football iphone" />
          <CarouselQuizElement image={(<StaticImage className="rounded-b-lg" alt="Photo Playing Cards" src="../images/three-family-cards.png" width={400}/>)}
            quizText="Family + Games"
            answerText="Photo Playing Cards"
            searchText="family games playing cards" />
          <div className="flex flex-col items-center sm:items-end">
            <div className="flex flex-row space-x-4">
              <Link className="text-2xl mt-10 rounded-md p-1 px-2 bg-slate-600 text-white" to="/gifts">Explore Gifts</Link>
              <Link className="text-2xl mt-10 border border-slate-600 rounded-md p-1 px-2" to="/guide">Read the Guide</Link>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export class CarouselQuizComponent2 extends React.Component<CarouselQuizComponentProps, CarouselQuizComponentState> {
  constructor(props: CarouselQuizComponentProps) {
    super(props);
  }

  public render() {
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
      <div className="flex flex-row justify-center">
        <div className="flex flex-col items-center">
          <CarouselQuizElement image={(<StaticImage className="rounded-b-lg" alt="Personalized Golf Balls" src="../images/grandpas-favorite-birdie.png" width={400}/>)}
            quizText="Golf + Bird Watching"
            answerText="Personalized Golf Balls"
            searchText="golf bird watching" />
          <CarouselQuizElement image={(
              <div className="w-[400px] mb-10 mt-[-24px] list-none">
                <GiftItemComponent giftResult={trumpCandle} />
              </div>
            )}
            quizText="Funny + Politics"
            answerText="Donald Trump Candle"
            searchText="funny politics" />
          <div className="flex flex-col items-center sm:items-end">
            <div className="flex flex-row space-x-4">
              <Link className="text-2xl mt-10 rounded-md p-1 px-2 bg-slate-600 text-white" to="/guide">More Examples</Link>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default CarouselQuizComponent;