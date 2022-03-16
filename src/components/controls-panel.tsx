import React from "react";

import { StaticImage } from "gatsby-plugin-image";
import NavBar from "./navbar";

type DarkModePanelProps = {};
type DarkModePanelState = {
  theme: string;
};
class DarkModePanel extends React.Component<DarkModePanelProps, DarkModePanelState> {
  constructor(props: DarkModePanelProps) {
    super(props);
    this.state = {
      theme: typeof window !== 'undefined' ? window.__theme : null,
    }
  }

  public componentDidMount(): void {
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme });
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
      <div className="justify-self-end shrink flex flex-col items-end">
        <div className="flex-1 flex flex-row items-center">
          <button className="px-4" onClick={this.onToggleDarkTheme.bind(this)} aria-label="Toggle dark theme">
            {icon}
          </button>
        </div>
      </div>
    );
  }

  private onToggleDarkTheme() {
    const newTheme = this.state.theme === "light" ? "dark" : "light";
    window.__setPreferredTheme(newTheme);
    this.setState({
      theme: newTheme
    });
  }
}



type ControlsPanelProps = {};
type ControlsPanelState = {
  isNavOpen: boolean;
};

class ControlsPanel extends React.Component<ControlsPanelProps, ControlsPanelState> {
  constructor(props: ControlsPanelProps) {
    super(props);
    this.state = {
      isNavOpen: false,
    }
  }

  public render() {
    let navbar = (<div></div>);
    if (this.state.isNavOpen) {
      navbar = (
        <div className="absolute z-20 bg-white border-2 border-slate-700 dark:bg-bg-dark dark:border-white rounded-lg top-14 min-w-fit w-3/4 min-h-fit">
          <NavBar showVertical={true} />
        </div>
      )
    }
    return (
      <div className="justify-self-end shrink flex flex-col items-end">
        <div className="hidden sm:flex">
          <DarkModePanel />
        </div>
        <div className="flex sm:hidden">
          <button className="h-12 w-12" onClick={this.toggleNavOpen.bind(this)}>
            <svg xmlns="http://www.w3.org/2000/svg" height={30} viewBox="0 0 448 512" fill="currentColor" stroke="currentColor">
              <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/>
            </svg>
          </button>
        </div>
        {navbar}
      </div>
    )
  }

  private toggleNavOpen(evt: React.MouseEvent<HTMLButtonElement>) {
    evt.preventDefault();
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }
}

export default ControlsPanel;