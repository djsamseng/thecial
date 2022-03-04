
import React, { createContext } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import { useStaticQuery, graphql, navigate, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import LayoutComponent from "../components/layout";
import { SearchBarContext } from "../components/searchbar";
import BestGiftAnimationComponent from "../components/best-gift-animation";
import GiftItemComponent from "../components/gift-item";
import SEOComponent from "../components/seo-component";

import CarouselQuizComponent, { CarouselQuizComponent2 } from "../components/carousel-quiz";
import CategoriesGridComponent from "../components/categories-grid";

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

    return (
      <SearchBarContext.Provider value={searchContext}>
        <LayoutComponent pageTitle="Home Page">
          <SEOComponent title="Home Page"/>
          <div className="flex flex-col items-center">
            <div className="border-b dark:border-gray-700 self-stretch pb-10 px-3">
              <CarouselQuizComponent />
            </div>
            <BestGiftAnimationComponent />
            <div className="border-t dark:border-gray-700 self-stretch mt-[120px] pb-10 px-3">
              <CarouselQuizComponent2 />
            </div>

          </div>
        </LayoutComponent>
      </SearchBarContext.Provider>
    );
  }
}

export default IndexPage;
