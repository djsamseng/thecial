import React from "react";

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
      </LayoutComponent>
    );
  }
}

export default IndexPage;