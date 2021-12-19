import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const YoPage = () => (
  <Layout>
    <Seo title="Home" />
    <marquee>yo</marquee>
  </Layout>
)

export default YoPage
