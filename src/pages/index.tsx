
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
        <h1>Gather Badger</h1>
        <p>Find that the gift for the special someone</p>
        <br/>
        <p>Grandpa + Favorite bird + Golf = Grandpa's Favorite Birdie</p>
        <StaticImage alt="Grandpa's favorite birdie" src="../images/grandpas_favorite_birdie.png"/>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="search" onChange={this.onSearchChange.bind(this)} value={this.state.searchText}></input>
          <button type="submit">Search</button>
        </form>
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
