import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image"

type CategoriesGridComponentProps = {};
type CategoriesGridComponentState = {};

class CategoriesGridComponent extends React.Component<CategoriesGridComponentProps, CategoriesGridComponentState> {
  constructor(props: CategoriesGridComponentProps) {
    super(props);
  }

  public render() {
    return (
      <div className="flex flex-row justify-center">
        <div className="flex flex-col items-center space-y-5">
          <div className="flex flex-col items-center">
            <StaticImage className="" alt="Personal" src="../images/grandpas_favorite_birdie.png" width={400}/>
            <div className="mt-[-30px] z-10 text-black">
              Personal
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex flex-row items-center space-x-5">
              <div className="flex flex-col items-center">
                <StaticImage alt="Special" src="../images/grandpas_favorite_birdie.png" width={200}/>
                <div className="mt-[-30px] z-10 text-black">
                  Special
                </div>
              </div>
              <div className="flex flex-col items-center">
                <StaticImage alt="All About Them" src="../images/grandpas_favorite_birdie.png" width={200}/>
                <div className="mt-[-30px] z-10 text-black">
                  All About Them
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-end">
            <div className="flex flex-row space-x-4">
              <Link className="text-2xl mt-10 rounded-md p-1 px-2 bg-slate-600 text-white" to="/gifts">Start Searching</Link>
              <Link className="text-2xl mt-10 border border-slate-600 rounded-md p-1 px-2" to="/guide">More Examples</Link>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default CategoriesGridComponent;