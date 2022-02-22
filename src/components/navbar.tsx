import React from "react";
import { Link } from "gatsby";

type NavBarProps = {};
type NavBarState = {};
class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props:NavBarProps) {
    super(props);
  }
  public render() {
    const liItems = [
      { text: "Home", href: "/" },
      { text: "Gifts", href: "/gifts" },
      { text: "Guide", href: "/guide" },
      { text: "Blog", href: "/blog" },
    ].map(item => {
      return (
        <li>
          <Link to={item.href} className="hover:text-gray-200">
            {item.text}
          </Link>
        </li>
      )
    });
    return (
      <nav className="hidden xs:flex shrink" aria-label="Desktop Navigation">
        <ul className="xs:flex px-4 font-semibold font-heading space-x-12">
          {liItems}
        </ul>
      </nav>
    );
  }
}

export default NavBar;