import { select } from "@storybook/addon-knobs";

const imageSourceOptionsLabel = "Image Source Options";

//prettier-ignore
const imageSourceOptions = {
  "Image 1": "graphical/94341-g.jpg",
  "Image 2": "graphical/84047-g.jpg",
  "Image 3": "graphical/83731-g3.jpg",
  "Broken Image": "https://www.qwerasdfzxcvtyuighjkbnm.com/abc123.jpg",
  null: null,
  undefined: undefined,
};

const imageSourceOptionsDefaultValue = imageSourceOptions["Image 1"];
const imagesourceOptionsGroupID = undefined;

const imageSourceSelect = () =>
  select(
    imageSourceOptionsLabel,
    imageSourceOptions,
    imageSourceOptionsDefaultValue,
    imagesourceOptionsGroupID
  );

export default imageSourceSelect;
