import React from "react";
import { withKnobs } from "@storybook/addon-knobs";

import "../Application/Root.css";
import BannerImage from "../Application/BannerImage/BannerImage";
import imageSourceSelect from "./knobs/bannerImageSourceSelect";

export default {
  title: "Banner Image",
  component: BannerImage,
  decorators: [withKnobs],
};

export const ImageSource = () => <BannerImage src={imageSourceSelect()} />;
