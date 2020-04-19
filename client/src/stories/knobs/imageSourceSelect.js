import { select } from "@storybook/addon-knobs";

const imageSourceOptionsLabel = "Image Source Options";

//prettier-ignore
const imageSourceOptions = {
  "Image 1": "https://www.thetvdb.com/banners/posters/94341-1.jpg",
  "Image 2": "https://www.thetvdb.com/banners/series/84047/posters/62037563.jpg",
  "Image 3": "https://www.thetvdb.com/banners/posters/83731-2.jpg",
  null: null,
  undefined: undefined,
};

const imageSourceOptionsDefaultValue = "Image1";
const imagesourceOptionsGroupID = undefined;

const imageSourceSelect = () =>
  select(
    imageSourceOptionsLabel,
    imageSourceOptions,
    imageSourceOptionsDefaultValue,
    imagesourceOptionsGroupID
  );

export default imageSourceSelect;
