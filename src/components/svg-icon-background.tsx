import React from "react";
import { graphql, useStaticQuery } from "gatsby";

// https://www.iconfinder.com/search?q=&license=gte__1&style=outline&price=free
const SVGS = [
  <svg className="absolute w-10 h-10 right-[40px] top-[60px]"      enable-background="new 0 0 48 48" height="48px" id="Layer_1" version="1.1" viewBox="0 0 48 48" width="48px" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M24.804,43.648L24,44l-0.804-0.352C12.862,37.313,2,22.893,2,14.884  C2.035,8.326,7.404,3.002,14,3.002c4.169,0,7.849,2.128,10,5.349c2.151-3.221,5.831-5.349,10-5.349c6.596,0,11.965,5.324,12,11.882  C46,22.893,35.138,37.313,24.804,43.648z M34,4.993c-3.354,0-6.469,1.667-8.335,4.46L24,11.946l-1.665-2.494  C20.469,6.66,17.354,4.993,14,4.993c-5.484,0-9.971,4.442-10,9.891c0,7.064,10.234,20.808,20,26.917  c9.766-6.109,20-19.852,20-26.907C43.971,9.435,39.484,4.993,34,4.993z" fill-rule="evenodd"/></svg>
];

const SvgIconBackground = () => {
  return (
    <div className="w-full h-full absolute -z-10 bg-white dark:bg-gray-900">
      <div className="relative max-w-4xl mx-auto pt-16 mt-[200px]">
        {
          SVGS.map((node, idx) => {
            return (
              <div className="fill-stone-300 dark:fill-slate-600">
                {node}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default SvgIconBackground;