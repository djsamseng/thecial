
import React, { createContext } from "react";
import { Router, RouteComponentProps } from "@reach/router";
import { useStaticQuery, graphql, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import LayoutComponent from "../components/layout";
import { SearchBarContext } from "../components/searchbar";




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
          <div className="flex flex-col items-center">
            <h1 className="text-3xl">Gather Badger</h1>
            <p>Helping You Find That Perfect Gift</p>


            <div className="mt-20 flex flex-col items-center">
              <p className="text-xl">Grandpa + Favorite bird + Golf = Grandpa's Favorite Birdie</p>

              <StaticImage className="mt-2" alt="Grandpa's favorite birdie" src="../images/grandpas_favorite_birdie.png"/>
              <p className="mt-2">Show just how much you know him. Personalize a golfball with his favorite Birdie</p>
            </div>


          </div>

        </LayoutComponent>
      </SearchBarContext.Provider>
    );
  }
}

export default IndexPage;
