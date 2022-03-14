import React from "react";
import { RouteComponentProps } from "@reach/router";


import LayoutComponent from "../../components/layout";
import SEOComponent from "../../components/seo-component";
import GiftsComponent from "../../components/gifts-component";

interface GiftsIndexPageProps extends RouteComponentProps {
};
type GiftsIndexPageState = {
};

class GiftsIndexPage extends React.Component<GiftsIndexPageProps,GiftsIndexPageState> {
  constructor(props: GiftsIndexPageProps) {
    super(props);
  }

  public render() {
    return (
      <LayoutComponent pageTitle="Gift Search" location={this.props.location}>
        <SEOComponent title="Gift Search"/>
        <GiftsComponent />
      </LayoutComponent>
    )
  }
}

export default GiftsIndexPage;
