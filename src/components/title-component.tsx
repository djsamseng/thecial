import React from "react";

import { Link, useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

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
    <div className="font-bold font-heading text-xl xs:text-2xl sm:text-3xl flex-1 shrink-0 min-w-fit mr-5">
      <p className="sr-only">{data.site.siteMetadata.title}</p>
      <Link to="/" className="flex flex-row flex-nowrap items-center">
        <StaticImage className="mr-5" height={60} alt="Gather Badger" src="../images/badger-logo.svg"/>
        <div className="whitespace-nowrap">{data.site.siteMetadata.title}</div>
      </Link>
    </div>
  );
}

export default TitleComponent;