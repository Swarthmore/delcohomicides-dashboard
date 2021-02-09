import {
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  teal,
  green,
  lightGreen,
  grey,
} from "@material-ui/core/colors";

export const colors = [
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  teal,
  green,
  lightGreen,
];

// These are the possible values of each race
const BLACK = "Black";
const WHITE = "White";
const ASIAN = "Asian/Pacific Islander";
const HISPANIC = "Hispanic";
const MISSING = "missing";
const UNKNOWN = "Unknown";
const OTHER = "Other";

const DEFAULT_MISSING = grey[500];

export const raceColormap = {
  [BLACK]: green[500],
  [WHITE]: indigo[500],
  [ASIAN]: teal[500],
  [HISPANIC]: blue[500],
  [MISSING]: DEFAULT_MISSING,
  [UNKNOWN]: DEFAULT_MISSING,
  [OTHER]: DEFAULT_MISSING,
};
