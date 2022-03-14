import React, { useContext } from "react";
import { navigate, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import GiftItemComponent from "./gift-item";
import { GiftResult } from "../providers/gift-provider";
import { SearchBarContext } from "./search-context";


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
    const { submitSearch } = useContext(SearchBarContext);
    return (
      <Link className="m-4 bg-stone-50 hover:bg-white dark:bg-gray-900 dark:hover:bg-gray-800" to="/gifts" onClick={this.onLinkClick.bind(this, submitSearch)}>
        <div className="flex flex-col items-stretch">
          <div className="flex flex-row mb-1">
            <input className="flex-1 pl-1 text-black dark:text-white bg-stone-50 hover:bg-white dark:bg-slate-500 border-slate-500 border-2 rounded-lg rounded-r-none border-r-0 opacity-75 border-opacity-50 dark:border-slate-700"
                type="text"
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
          <div className="h-[40px] mt-[-40px] z-10 bg-gray-900 opacity-50">
          </div>
          <div className="mt-[-40px] flex flex-col z-20 items-center text-xl text-white">
            {this.props.answerText}
          </div>
        </div>
      </Link>
    )
  }

  private onLinkClick(submitSearch: (string?) => void, evt: React.MouseEvent<HTMLInputElement>) {
    evt.preventDefault();
    submitSearch(this.props.searchText);
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
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-center">
          <div className="flex flex-row items-start flex-wrap justify-center">
            <CarouselQuizElement image={(<StaticImage className="" alt="Photo Playing Cards" src="../images/three-family-cards.png" height={293} width={400}/>)}
              quizText="Family + Games"
              answerText="Photo Playing Cards"
              searchText="family games playing cards" />
            <CarouselQuizElement image={(<StaticImage className="" alt="Custom Garden Markers" src="../images/garden-markers.png" height={293} width={400}/>)}
              quizText="Gardening + Personalized"
              answerText="Custom Garden Markers"
              searchText="personalized garden markers" />
            <CarouselQuizElement image={(<StaticImage className="" alt="Personalized Golf Balls" src="../images/grandpas-favorite-birdie.png" height={293} width={400}/>)}
              quizText="Golf + Bird Watching"
              answerText="Personalized Golf Balls"
              searchText="golf bird watching personalized" />


          </div>

        </div>
        <div className="flex flex-col items-center sm:items-end">
          <div className="flex flex-row space-x-4">
            <Link className="text-2xl mt-10 rounded-md p-1 px-2 bg-slate-600 text-white" to="/gifts">Search Gifts</Link>
            <Link className="text-2xl mt-10 border border-slate-600 rounded-md p-1 px-2" to="/guide">Read the Guide</Link>
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
    const hideAPoo: GiftResult = {
      "id": 16,
      "url": "https://www.amazon.com/Prank-Pack-Hide-Poo-Prank/dp/B07W4FLX96?crid=38JY0XNXTSH7W&keywords=prank+box&qid=1646422154&sprefix=prank+box%2Caps%2C75&sr=8-8&linkCode=li3&tag=gatherbadger-20&linkId=a1574d77ea50606ab8a3a6776be3bfdb&language=en_US&ref_=as_li_ss_il",
      "img": "//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07W4FLX96&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=gatherbadger-20&language=en_US",
      "custom_desc": "",
      "title": "Dog Prank Gift Box",
      "score_sum": 1,
      "word_matches": ["prank", "gift", "box"]
    };
    const harryPotterWand: GiftResult = {
      "id": 18,
      "url": "https://www.amazon.com/HARRY-POTTER-Remote-Control-Wand/dp/B00FXMDRZK?crid=1UYG5DZ1VJKPT&keywords=wand+tv+remote&qid=1646422369&sprefix=wand+tv+remote%2Caps%2C70&sr=8-1&linkCode=li3&tag=gatherbadger-20&linkId=585a444695c834b7298577f608486e70&language=en_US&ref_=as_li_ss_il",
      "img": "//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B00FXMDRZK&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=gatherbadger-20&language=en_US",
      "custom_desc": "",
      "title": "Harry Potter TV Remote Control Wand",
      "score_sum": 1,
      "word_matches": ["TV", "harry", "potter"],
    };
    const tennisSpreader: GiftResult = {
      "id": 21,
      "url": "https://www.amazon.com/Wine-Things-00730-Tennis-Spreader/dp/B0043TAKDG?keywords=tennis+cheese+spreader&qid=1646422681&sprefix=tennis+cheese%2Caps%2C74&sr=8-1&linkCode=li3&tag=gatherbadger-20&linkId=bfc54f0de10be08ef94693640f5add43&language=en_US&ref_=as_li_ss_il",
      "img": "//ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B0043TAKDG&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=gatherbadger-20&language=en_US",
      "custom_desc": "",
      "title": "Tennis Cheese Spreader",
      "score_sum": 1,
      "word_matches": ["tennis", "cheese"],
    };
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-center">
          <div className="flex flex-row items-start flex-wrap justify-center">
            <CarouselQuizElement image={(
                <div className="w-[340px] sm:w-[420px] mb-10 mt-[-24px] list-none">
                  <GiftItemComponent gift={hideAPoo}/>
                </div>
              )}
              quizText="Dog + Prank"
              answerText="Dog Prank Gift Box"
              searchText="dog prank gift box" />
            <CarouselQuizElement image={(
                <div className="w-[340px] sm:w-[420px] mb-10 mt-[-24px] list-none">
                  <GiftItemComponent gift={harryPotterWand}/>
                </div>
              )}
              quizText="TV + Harry Potter"
              answerText="TV Remote Control Wand"
              searchText="harry potter tv remote control" />
            <CarouselQuizElement image={(
                <div className="w-[340px] sm:w-[420px] mb-10 mt-[-24px] list-none">
                  <GiftItemComponent gift={tennisSpreader}/>
                </div>
              )}
              quizText="Tennis + Cheese"
              answerText="Tennis Cheese Spreader"
              searchText="tennis cheese" />


          </div>
        </div>
        <div className="flex flex-col items-center sm:items-end">
          <div className="flex flex-row space-x-4">
            <Link className="text-2xl mt-10 rounded-md p-1 px-2 bg-slate-600 text-white" to="/gifts">More Examples</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default CarouselQuizComponent;