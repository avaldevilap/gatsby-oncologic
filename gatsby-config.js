const path = require("path");
const fetch = require("node-fetch");
const { createHttpLink } = require("apollo-link-http");
require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: "Oncologic",
    titleTemplate: "%s | Oncologic"
  },
  plugins: [
    `gatsby-plugin-typescript`,
    // `gatsby-plugin-eslint`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        productionPrefix: "oncologic"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`)
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `tomato`,
        // Disable the loading spinner.
        showSpinner: false
      }
    }
  ]
};
