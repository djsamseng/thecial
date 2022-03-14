import React from "react";
import { RouteComponentProps } from "@reach/router";


import LayoutComponent from "../../components/layout";
import SEOComponent from "../../components/seo-component";
import GiftsSearchComponent from "../../components/static-gifts";
import SupaGiftsComponent from "../../components/supa-gifts";

const USE_STATIC_GIFTS = true;

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
        { USE_STATIC_GIFTS ? (<GiftsSearchComponent />) : (<SupaGiftsComponent />)}
      </LayoutComponent>
    )
  }
}

export default GiftsIndexPage;
