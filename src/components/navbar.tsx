import React from "react";
import { Link } from "gatsby";

type NavBarProps = {
  showVertical?: boolean;
};
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
        <li className="h-12 w-12 flex flex-row items-center">
          <Link to={item.href} className="hover:text-gray-400" state={{ source: "navbar" }}>
            {item.text}
          </Link>
        </li>
      )
    });
    const directionFlex = this.props.showVertical ? "flex-col" : "flex-row";
    const spacing = this.props.showVertical ? "" : "space-x-12"
    return (
      <nav className="flex flex-row justify-center shrink py-1 pb-1" aria-label="Desktop Navigation">
        <ul className={`flex ${directionFlex} items-center px-4 font-semibold font-heading ${spacing}`}>
          {liItems}
        </ul>
      </nav>
    );
  }
}

export default NavBar;