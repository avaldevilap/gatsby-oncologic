import "moment/locale/es";

import Img from "gatsby-image";
import * as moment from "moment";
import * as React from "react";

import { Grid, Typography } from "@material-ui/core";

import Layout from "../components/layout";
import SEO from "../components/SEO";

moment.locale("es");

export default () => {
  return (
    <Layout>
      <SEO title="Inicio" />
      <Grid item sm={12}>
        <Typography variant="title">Amazing Pandas Eating Things</Typography>
      </Grid>
      <Grid item sm={12}>
        <Img
          fixed={{
            src:
              "https://2.bp.blogspot.com/-BMP2l6Hwvp4/TiAxeGx4CTI/AAAAAAAAD_M/XlC_mY3SoEw/s1600/panda-group-eating-bamboo.jpg",
            width: 400,
            height: 200,
            srcSet:
              "https://2.bp.blogspot.com/-BMP2l6Hwvp4/TiAxeGx4CTI/AAAAAAAAD_M/XlC_mY3SoEw/s1600/panda-group-eating-bamboo.jpg"
          }}
          alt="Group of pandas eating bamboo"
        />
      </Grid>
    </Layout>
  );
};
