import React from "react";
import { RouteComponentProps } from "@reach/router";

import SearchBarContextComponent from "./search-context";
import GiftResultProviderComponent from "./gift-result-provider-context";

import HeaderComponent from "./header-component";
import FooterComponent from "./footer-component";
import SvgIconBackground from "./svg-icon-background";

type LayoutComponentProps = {
  pageTitle: string;
  children: React.ReactNode;
  location: RouteComponentProps["location"];
};
type LayoutComponentState = {};


class LayoutComponent extends React.Component<LayoutComponentProps, LayoutComponentState> {
  constructor(props: LayoutComponentProps) {
    super(props);

  }

  public render() {
    return (
      <SearchBarContextComponent location={this.props.location}>
        <GiftResultProviderComponent location={this.props.location}>
          <div className="relative bg-transparent flex flex-col min-h-screen w-full justify-between font-roboto dark:text-slate-200">
            <HeaderComponent />
            <main className="mb-auto min-h-[600px]">
              {this.props.children}
            </main>
            <FooterComponent />
            <SvgIconBackground />
          </div>
        </GiftResultProviderComponent>
      </SearchBarContextComponent>
    )
  }
}

export default LayoutComponent;

