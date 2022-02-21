import React from "react";
import { Link, useStaticQuery, graphql, } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import NavBar from "./navbar";
import SearchBar from "./searchbar";

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
  // CC0 license https://www.svgrepo.com/svg/252816/badger
  return (
    <div className="font-bold font-heading text-3xl flex-1">
      <p className="sr-only">{data.site.siteMetadata.title}</p>
      <Link to="/">
        <StaticImage className="mt-[-30px] mb-[-40px] mr-5" height={100} alt="Gather Badger" src="../images/badger-logo.svg"/>
        {data.site.siteMetadata.title}
      </Link>
    </div>
  );
  // <header className="text-3xl font-bold font-heading">{data.site.siteMetadata.title}</header>
}

type ControlsPanelProps = {};
type ControlsPanelState = {
  theme: string;
};
class ControlsPanel extends React.Component<ControlsPanelProps, ControlsPanelState> {
  constructor(props: ControlsPanelProps) {
    super(props);
    this.state = {
      theme: typeof window !== 'undefined' ? window.__theme : null,
    }
  }

  public componentDidMount(): void {
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme })
    }
  }

  public render() {
    let icon = this.state.theme === "dark" ?
      (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z">

          </path>
        </svg>
      )
      :
      (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>);
    return (
      <div className="flex-1 mr-6 flex flex-col items-end">
        <button className="" onClick={this.onToggleDarkTheme.bind(this)}>
          {icon}
        </button>
      </div>
    );
  }

  private onToggleDarkTheme() {
    const newTheme = this.state.theme === "light" ? "dark" : "light";
    window.__setPreferredTheme(newTheme);
  }
}

type HeaderComponentProps = {};
type HeaderComponentState = {};
class HeaderComponent extends React.Component<HeaderComponentProps, HeaderComponentState> {
  constructor(props: HeaderComponentProps) {
    super(props);
  }

  public render() {
    return (
      <header className="bg-gray-100 border-b dark:bg-slate-800 dark:border-gray-700 lg:w-full lg:top-0 lg:left-0 mb-5">
        <section className="px-2 py-5 mx-5 flex flex-col">
          <div className="flex flex-row justify-between">
              <TitleComponent />
              <NavBar />
              <ControlsPanel />
          </div>
        </section>
      </header>

    );
  }
}

type FooterComponentProps = {};
type FooterComponentState = {};
class FooterComponent extends React.Component<FooterComponentProps, FooterComponentState> {
  constructor(props: FooterComponentProps) {
    super(props);
  }

  public render() {
    return (
      <div className="pt-5 pb-5 bg-slate-100 dark:bg-slate-700">
        <div className="flex flex-col items-center">
          <p className="text-2xl">Thank You!</p>
          <p>This website uses affiliate links. Everytime you click a link and buy that product a small percentage goes to charity and towards helping support this website</p>
        </div>
      </div>

    )
  }
}

class LayoutComponent extends React.Component<LayoutComponentProps, LayoutComponentState> {
  constructor(props: LayoutComponentProps) {
    super(props);

  }

  public render() {
    return (
      <div className="flex flex-col min-h-screen w-full justify-between font-roboto dark:bg-gray-900 dark:text-slate-200">
        <title>{this.props.pageTitle}</title>
        <HeaderComponent />
        <main className="mb-auto">
          {this.props.children}
        </main>
        <FooterComponent />

      </div>
    )
  }
}

export default LayoutComponent;

