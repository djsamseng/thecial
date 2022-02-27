import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"


type GridElementComponentProps = {
  image: any;
  text: string;
  searchText: string;
};
type GridElementComponentState = {

};
class GridElementComponent extends React.Component<GridElementComponentProps, GridElementComponentState> {
  constructor(props: GridElementComponentProps) {
    super(props);
  }

  public render() {
    return (
      <Link className="m-1 border rounded p-4 border-stone-200 bg-stone-50 hover:bg-white dark:bg-gray-900 dark:border-gray-800 dark:hover:bg-gray-800" to="/gifts" state={{ searchText: this.props.searchText}}>
        <div className="flex flex-col items-stretch">
          {this.props.image}
          <div className="h-[30px] z-10">
          </div>
          <div className="mt-[-20px] flex flex-col z-20 items-center text-xl">
            {this.props.text}
          </div>
        </div>
      </Link>
    )
  }
}

type CategoriesGridComponentProps = {};
type CategoriesGridComponentState = {};

class CategoriesGridComponent extends React.Component<CategoriesGridComponentProps, CategoriesGridComponentState> {
  constructor(props: CategoriesGridComponentProps) {
    super(props);
  }

  public render() {
    return (
      <div className="flex flex-row justify-center">
        <div className="flex flex-col items-center">

          <GridElementComponent image={(<StaticImage className="" alt="Personal" src="../images/grandmas-ruffles.png" width={400}/>)}
            text="Grandma + Potato Chips = Personalized Potato Chips Bag"
            searchText="personal" />
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center">
              <GridElementComponent image={(<StaticImage alt="Special" src="../images/jen-nfl-leather.png" width={300}/>)}
                text="Football + iPhone + Personalized = Custom NFL Logo Phone Charger"
                searchText="special" />
              <GridElementComponent image={(<StaticImage alt="All About Them" src="../images/grandpas-favorite-birdie.png" width={300}/>)}
                text="Grandpa + Golf + Bird Watching = Personalized Golf Balls"
                searchText="grandpa golf bird watching" />
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-end">
            <div className="flex flex-row space-x-4">
              <Link className="text-2xl mt-10 rounded-md p-1 px-2 bg-slate-600 text-white" to="/gifts">Explore</Link>
              <Link className="text-2xl mt-10 border border-slate-600 rounded-md p-1 px-2" to="/guide">Read the Guide</Link>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default CategoriesGridComponent;