import React from "react";
import { Link } from "gatsby";

import * as navbarStyles from "./navbar.module.css";

type NavBarProps = {};
type NavBarState = {};
class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props:NavBarProps) {
    super(props);
  }
  public render() {
    const liItems = [
      { text: "Home", href: "/" },
      { text: "Guide", href: "/guide" },
      { text: "Blog", href: "/blog" },
    ].map(item => {
      return (
        <li className={navbarStyles.navLinkItem}>
          <Link to={item.href} className={navbarStyles.navLinkText}>
            {item.text}
          </Link>
        </li>
      )
    });
    return (
      <nav>
        <ul className={navbarStyles.navLinks}>
          {liItems}
        </ul>
      </nav>
    );
  }
}

export default NavBar;