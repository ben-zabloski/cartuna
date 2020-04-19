import React from "react";
import { withKnobs } from "@storybook/addon-knobs";

import Image from "../Application/Image/Image";
import imageSourceSelect from "./knobs/imageSourceSelect";

export default {
  title: "Image",
  component: Image,
  decorators: [withKnobs],
};

export const ImageSource = () => (
  <div style={{ width: "200px" }}>
    <Image src={imageSourceSelect()} />
  </div>
);
