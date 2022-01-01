import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import * as layoutStyles from "./layout.module.css";
import NavBar from "./navbar";



type LayoutComponentProps = {
  pageTitle: string;
  children: React.ReactNode;
};
type LayoutComponentState = {};

const TitleComponent = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <header className={layoutStyles.siteTitle}>{data.site.siteMetadata.title}</header>
  )
}

class LayoutComponent extends React.Component<LayoutComponentProps, LayoutComponentState> {
  constructor(props: LayoutComponentProps) {
    super(props);

  }

  public render() {
    return (
      <div className={layoutStyles.container}>
        <title>{this.props.pageTitle}</title>
        <TitleComponent />
        <NavBar></NavBar>
        <main>
          <h1 className={layoutStyles.heading}>
            {this.props.pageTitle}
          </h1>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default LayoutComponent;