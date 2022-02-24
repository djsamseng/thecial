import React from "react";

import TitleComponent from "./title-component";
import SearchBar from "./searchbar";
import ControlsPanel from "./controls-panel";
import NavBar from "./navbar";

type HeaderComponentProps = {};
type HeaderComponentState = {};
class HeaderComponent extends React.Component<HeaderComponentProps, HeaderComponentState> {
  constructor(props: HeaderComponentProps) {
    super(props);
  }

  public render() {
    return (
      <header className="border-b bg-stone-300 dark:bg-slate-800 dark:border-gray-700 lg:w-full lg:top-0 lg:left-0 mb-5">
        <section className="mx-2 xs:mx-5 flex flex-col">
          <div className="flex flex-row justify-between">
              <div className="flex flex-1 flex-row py-1 justify-between">
                <TitleComponent />
                <div className="hidden flex-1 sm:flex flex-row items-center shrink-0 min-w-fit">
                  <SearchBar />
                </div>
                <ControlsPanel />
              </div>
          </div>
        </section>

        <section className="flex sm:hidden flex-1 flex-row py-1 justify-center items-center w-full ">
          <SearchBar />
        </section>
        <section className="">
          <NavBar />
        </section>
      </header>

    );
  }
}

export default HeaderComponent;