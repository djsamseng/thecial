import React from "react";

import HeaderComponent from "./header-component";
import FooterComponent from "./footer-component";
import SvgIconBackground from "./svg-icon-background";

type LayoutComponentProps = {
  pageTitle: string;
  children: React.ReactNode;
};
type LayoutComponentState = {};


class LayoutComponent extends React.Component<LayoutComponentProps, LayoutComponentState> {
  constructor(props: LayoutComponentProps) {
    super(props);

  }

  public render() {
    return (
      <div className="relative bg-transparent flex flex-col min-h-screen w-full justify-between font-roboto dark:text-slate-200">
        <HeaderComponent />
        <main className="mb-auto min-h-[600px]">
          {this.props.children}
        </main>
        <FooterComponent />
        <SvgIconBackground />
      </div>
    )
  }
}

export default LayoutComponent;

