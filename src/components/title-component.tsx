import React from "react";

import { Link, useStaticQuery, graphql } from "gatsby";

const GiftSvg = ({}) => {
  const height = 40;
  return (
    <svg fill="currentColor" stroke="none" version="1.1" width={height} height={height} viewBox="178 175 400 400" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="m522.81 432.07c0-7.4258-6.0195-13.445-13.445-13.445h-148.34c-7.4258 0-13.445 6.0195-13.445 13.445v119.92c0 7.4219 6.0195 13.441 13.445 13.441h148.34c7.4258 0 13.445-6.0195 13.445-13.445z"/>
        <path d="m551.23 323.14c0-7.4258-6.0195-13.445-13.445-13.445h-176.75c-7.4258 0-13.445 6.0195-13.445 13.445v58.355c0 7.4258 6.0195 13.445 13.445 13.445h176.75c7.4258 0 13.445-6.0195 13.445-13.445z"/>
        <path d="m314.44 551.99c0 7.4258-6.0195 13.445-13.445 13.445h-53.621c-7.4258 0-13.445-6.0195-13.445-13.445v-119.92c0-7.4258 6.0195-13.445 13.445-13.445h53.617c7.4297 0 13.449 6.0195 13.449 13.445z"/>
        <path d="m314.44 381.5c0 7.4258-6.0195 13.449-13.445 13.449h-82.035c-7.4258 0-13.445-6.0195-13.445-13.449v-58.352c0-7.4258 6.0195-13.445 13.445-13.445h82.035c7.4258 0 13.445 6.0195 13.445 13.445z"/>
        <path d="m509.65 201.29c-7.8359-13.578-24.145-21.68-43.594-21.68-44.289 0-75.672 40.406-91.09 65.914-15.445-25.48-46.816-65.656-91.008-65.656-28.027 0-48.363 16.863-48.363 39.742 0 40.578 45.82 67.051 137.93 67.051 92.105 0 140.91-34.031 140.91-66.715-0.007813-6.5-1.4336-12.859-4.7812-18.656zm-226.18 40.41c-15.48-7.957-20.992-16.887-20.992-22.598 0-7.3008 9.0273-12.602 21.473-12.602 29.977 0 53.699 29.789 66.59 50.527-34.535-2.2148-55.258-9.25-67.07-15.328zm201.97-15.805c-7.8008 13.5-34.371 27.812-85.852 31.125 12.996-20.734 36.824-50.516 66.453-50.516 11.465 0 18.004 4.2539 20.309 8.2344 1.832 3.1719 1.5273 6.9297-0.91016 11.156z"/>
      </g>
    </svg>
  );
};

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
    <div className="font-heading text-xl xs:text-2xl sm:text-3xl md:text-4xl justify-self-start shrink-0 min-w-fit mr-5">
      <p className="sr-only">{data.site.siteMetadata.title}</p>
      <Link to="/" className="flex flex-row flex-nowrap items-center space-x-4">
        <div className="">
          < GiftSvg />
        </div>
        <div className="flex flex-col items-center border-l dark:border-bg-dark-border pl-4">
          <div className="whitespace-nowrap font-thin font-serif text-4xl md:text-5xl">{data.site.siteMetadata.title}</div>
          <div className="hidden sm:relative md:flex whitespace-nowrap text-sm">Find the Perfect Gift</div>
        </div>

      </Link>
    </div>
  );
}

export default TitleComponent;