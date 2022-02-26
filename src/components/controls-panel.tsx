import React from "react";

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
    console.log("Currently we think the theme is:", this.state.theme);
    window.__setPreferredTheme(newTheme);
    this.setState({
      theme: newTheme
    });
  }
}

export default ControlsPanel;