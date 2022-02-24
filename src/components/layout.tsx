import React from "react";

import HeaderComponent from "./header-component";
import FooterComponent from "./footer-component";

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
      <div className="flex flex-col min-h-screen w-full justify-between font-roboto bg-stone-200 dark:bg-gray-900 dark:text-slate-200">
        <title>{this.props.pageTitle}</title>
        <HeaderComponent />
        <main className="mb-auto min-h-[600px] px-3">
          {this.props.children}
        </main>
        <FooterComponent />

      </div>
    )
  }
}

export default LayoutComponent;

