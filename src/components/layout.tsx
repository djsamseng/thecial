import React from "react";
import { Link } from "gatsby";

import * as layoutStyles from "./layout.module.css";


type NavBarProps = {};
type NavBarState = {};
class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props:NavBarProps) {
    super(props);
  }
  public render() {
    const liItems = [
      {text: "Home", href: "/" },
      {text: "Guide", href: "/guide" }
    ].map(item => {
      return (
        <li className={layoutStyles.navLinkItem}>
          <Link to={item.href} className={layoutStyles.navLinkText}>
            {item.text}
          </Link>
        </li>
      )
    })
    return (
      <nav>
        <ul className={layoutStyles.navLinks}>
          {liItems}
        </ul>
      </nav>
    )
  }
}

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
      <div className={layoutStyles.container}>
        <title>{this.props.pageTitle}</title>
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