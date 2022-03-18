import React from "react";
import { RouteComponentProps } from "@reach/router";

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

const OneWordHeader = ({}) => {
  return (
    <div className="h-20 flex flex-row items-center">
      <div className="flex-grow w-4">
      </div>
      <div className="flex-grow-0 flex-shrink-0 flex flex-col items-center self-center">
        <div className=" text-4xl sm:text-5xl">OneWord</div>

      </div>
      <div className="align-center flex-grow w-4">
        <DarkModePanel />
      </div>
    </div>
  )
};

const OneWordLayouut = ({pageTitle, children}:{pageTitle: string, children:React.ReactNode}) => {
  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 dark:text-white">
      <OneWordHeader />
      { children }
    </div>

  )
};

function getLetters() {
  const letters = Array.from(Array(26))
    .map((_, i) => i + 65)
    .map(num => String.fromCharCode(num));
  letters.push("?");
  return letters
}

const LetterTileCommon = ({ letter }: { letter: string }) => {
  const options = getLetters()
    .map(char => {
      const selected = char === letter.toUpperCase();
      return (
        <option value={char} selected={selected}>{char}</option>
      )
    });
  if (letter === "+") {
    return (
      <div className="flex flex-col items-center">
        <button className="bg-inherit text-center text-5xl h-20 w-20 hide-select px-4">
          {letter}
        </button>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center">
      <select className="bg-inherit text-center text-5xl h-20 w-20 hide-select px-4">
        {options}
      </select>
    </div>
  )
};

const LetterTile = ({letter, bg}: { letter: string; bg:string; }) => {
  return (
    <div className={`${bg} w-fit h-fit border rounded-xl`}>
      <LetterTileCommon letter={letter} />
    </div>
  )
};

type OneWordFormProps = {};
type OneWordFormState = {
  letters: Array<{
    selectedLetter: string;
    letterNotHere: Array<string>;
  }>;
};
class OneWordForm extends React.Component<OneWordFormProps, OneWordFormState> {
  constructor(props: OneWordFormProps) {
    super(props);
    const letters = Array.from(Array(5)).map((_, idx) => {
      return {
        selectedLetter: idx === 0 ? "A" : "?",
        letterNotHere: idx === 1 ? ["C", "D"] : [],
      };
    });
    console.log(letters);
    this.state = {
      letters,
    }
  }

  public render() {
    const numFails = this.state.letters.reduce((maxSoFar: number, letterObj) => {
      if (letterObj.letterNotHere.length > maxSoFar) {
        return letterObj.letterNotHere.length;
      }
      return maxSoFar;
    }, 0);
    return (
      <div className="flex flex-col mt-10">
        <form>
          <label>
            <span>I have <input type="number" value={this.state.letters.length}/> letters</span>
          </label>
        </form>
        <div className="flex flex-row mt-5">
          {
            this.state.letters.map(letterObj => {
              const tileBg = letterObj.selectedLetter === "?" ? "bg-yellow-400" : "bg-green-500"
              return (
                <LetterTile letter={letterObj.selectedLetter} bg={tileBg} />
              );
            })
          }
        </div>
        {
          Array.from(Array(numFails + 1)).map((_, idx) => {
            return (
              <div className="flex flex-row">
                {
                  this.state.letters.map(letterObj => {
                    let letterTile = (
                      <div className="invisible">
                        <LetterTile letter="?" bg="" />
                      </div>
                    );
                    if (idx < letterObj.letterNotHere.length) {
                      letterTile = (
                        <LetterTile letter={letterObj.letterNotHere[idx]} bg="bg-red-400" />
                      );
                    }
                    if (idx === letterObj.letterNotHere.length) {
                      letterTile = (
                        <LetterTile letter="+" bg="" />
                      );
                    }
                    return (
                      <div className="flex flex-row">
                        {letterTile}
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

interface OneWordPageProps extends RouteComponentProps {

};
type OneWordPageState = {

};
class OneWordPage extends React.Component<OneWordPageProps, OneWordPageState> {
  constructor(props: OneWordPageProps) {
    super(props);
  }

  public render() {
    return (
      <OneWordLayouut pageTitle="One Word">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl sm:text-5xl">Word Solver</h1>
            <OneWordForm />
          </div>
        </div>
      </OneWordLayouut>
    );
  }
}

export default OneWordPage;