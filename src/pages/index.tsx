
import React from "react";
import { RouteComponentProps } from "@reach/router";

import LayoutComponent from "../components/layout";
import BestGiftAnimationComponent from "../components/best-gift-animation";
import SEOComponent from "../components/seo-component";

import CarouselQuizComponent, { CarouselQuizComponent2 } from "../components/carousel-quiz";

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
    return (
      <LayoutComponent pageTitle="Find the Perfect Gift" location={this.props.location}>
        <SEOComponent title="Find the Perfect Gift" titleTemplate="Gather Badger | %s"/>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl sm:text-5xl ">Spark your creativity</h1>
            <h2 className="text-center">Explore Our One of a Kind Gift Ideas</h2>
          </div>
          <div className="border-b dark:border-gray-700 self-stretch pb-10 px-3">
            <CarouselQuizComponent />
          </div>
          <BestGiftAnimationComponent />
          <div className="border-t dark:border-gray-700 self-stretch mt-[120px] pb-10 px-3">
            <CarouselQuizComponent2 />
          </div>

        </div>
      </LayoutComponent>
    );
  }
}

export default IndexPage;
