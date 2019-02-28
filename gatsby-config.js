const path = require("path");
require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: "Oncologic",
    titleTemplate: "%s | Oncologic",
    description: require("./package.json").description,
    url: "https://oncologic.hlg.sld.cu",
    twitterUsername: "@OncoHolguin"
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-styled-components`,
    // `gatsby-plugin-react-native-web`,
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
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/images/favicon.png"
      }
    }
  ]
};
