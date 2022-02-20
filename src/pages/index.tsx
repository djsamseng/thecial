
import React from "react";
import { Router } from "@reach/router";
import { useStaticQuery, graphql, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import LayoutComponent from "../components/layout";

type IndexPageProps = {};
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
      <LayoutComponent pageTitle="Home Page">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl">Gather Badger</h1>
          <p>Helping You Find That Perfect Gift</p>

          <div className="mt-5">
            <form onSubmit={this.onSubmit.bind(this)}>
              <input className="border-slate-500 border-2 rounded" type="search" onChange={this.onSearchChange.bind(this)} value={this.state.searchText}></input>
              <button className="ml-5" type="submit">Search</button>
            </form>
          </div>

          <div className="mt-20 flex flex-col items-center">
            <p className="text-xl">Grandpa + Favorite bird + Golf = Grandpa's Favorite Birdie</p>

            <StaticImage className="mt-2" alt="Grandpa's favorite birdie" src="../images/grandpas_favorite_birdie.png"/>
            <p className="mt-2">Show just how much you know him. Personalize a golfball with his favorite Birdie</p>
          </div>


        </div>

      </LayoutComponent>
    );
  }

  private onSearchChange(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchText: evt.target.value,
    });
  }

  private onSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    navigate("/gifts", {
      state: {
        searchText: this.state.searchText,
      }
    });
  }
}

export default IndexPage;
