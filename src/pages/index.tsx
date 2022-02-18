
import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import LayoutComponent from "../components/layout";

type IndexPageProps = {};
type IndexPageState = {};
class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
  constructor(props: IndexPageProps) {
    super(props);
  }

  render() {
    return (
      <LayoutComponent pageTitle="Home Page">
        <h1>Thecial</h1>
        <p>Find that the gift for the special someone</p>
        <br/>
        <p>Grandpa + Favorite bird + Golf = Grandpa's Favorite Birdie</p>
        <StaticImage alt="Grandpa's favorite birdie" src="../images/grandpas_favorite_birdie.png"/>
      </LayoutComponent>
    );
  }
}

export default IndexPage;
