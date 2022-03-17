require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.gatherbadger.com",
    title: "Gather Badger",
    description: "Find the perfect gift. Searching our hand crafted gift list or use our idea generator to come up with a truly unique gift. The perfect present is awaiting. Leave that special someone beloved with a personalized gift",
    author: "Gather Badger"
  },
  plugins: [
    "gatsby-plugin-dts-css-modules",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/data/blog`
      }
    },
    {
      resolve: `gatsby-transformer-json`,
      options: {
        path: `${__dirname}/data/lists`,
        typeName: `lists`
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "lists",
        path: `${__dirname}/data/lists`
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`
      }
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-postcss",
    "gatsby-plugin-preact",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GatherBadger`,
        short_name: `GatherBadger`,
        start_url: `/`,
        // background_color: `#111827`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#111827`,
        display: `minimal-ui`,
        icon: `src/images/gift-logo-512-512.png`, // This path is relative to the root of the site.
      },
    },
  ],
};
