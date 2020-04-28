import React from "react";
import { withKnobs } from "@storybook/addon-knobs";

import "../Application/Root.css";
import Image from "../Application/Image/Image";
import imageSourceSelect from "./knobs/imageSourceSelect";

export default {
  title: "Image",
  component: Image,
  decorators: [withKnobs],
};

export const ImageSource = () => (
  <Image
    style={{ width: "200px", height: "294.11px", backgroundColor: "#333333" }}
    src={imageSourceSelect()}
  />
);
