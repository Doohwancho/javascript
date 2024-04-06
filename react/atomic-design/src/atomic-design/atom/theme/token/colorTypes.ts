/*
 * 1. interface BaseColorScheme(mother), AccentColorScheme(child), ShadesColorScheme
 * 2. type ColorToken, Color, ColorPallete
 * 3. const colors(red, ..., lime) - ingredient: base, lighten1~5, darken1~5, accent1~4
 * 4. const variantPresetColors(모든 컬러 const vars 담고있음), defaultPresetColors(각 color당 Hex color code 담고있음)
 */
type HEX = `#${string}`;
interface BaseColorScheme {
  base: string;
  lighten1: string;
  lighten2: string;
  lighten3: string;
  lighten4: string;
  lighten5: string;
  darken1: string;
  darken2: string;
  darken3: string;
  darken4: string;
}

//not using it yet
interface AccentColorScheme extends BaseColorScheme {
  accent1: string;
  accent2: string;
  accent3: string;
  accent4: string;
}

// interface ShadesColorScheme {
//   black: string;
//   white: string;
//   transparent: string;
// }

type ColorPallete =
  | "red"
  | "pink"
  | "purple"
  | "deepPurple"
  | "indigo"
  | "blue"
  | "blue"
  | "lightBlue"
  | "cyan"
  | "teal"
  | "green"
  | "lightGreen"
  | "lime"
  | "yellow"
  | "amber"
  | "orange"
  | "deepOrange"
  | "brown"
  | "blueGrey"
  | "grey"
  | "shades";

type ColorToken = `${ColorPallete}-${keyof BaseColorScheme}`;

type Color = {
  [key: string]: BaseColorScheme | AccentColorScheme;
  red: Readonly<AccentColorScheme>;
  pink: Readonly<AccentColorScheme>;
  purple: Readonly<AccentColorScheme>;
  deepPurple: Readonly<AccentColorScheme>;
  indigo: Readonly<AccentColorScheme>;
  blue: Readonly<AccentColorScheme>;
  lightBlue: Readonly<AccentColorScheme>;
  cyan: Readonly<AccentColorScheme>;
  teal: Readonly<AccentColorScheme>;
  green: Readonly<AccentColorScheme>;
  lightGreen: Readonly<AccentColorScheme>;
  lime: Readonly<AccentColorScheme>;
  yellow: Readonly<AccentColorScheme>;
  amber: Readonly<AccentColorScheme>;
  orange: Readonly<AccentColorScheme>;
  deepOrange: Readonly<AccentColorScheme>;
  brown: Readonly<BaseColorScheme>;
  blueGrey: Readonly<BaseColorScheme>;
  grey: Readonly<BaseColorScheme>;
  //   shades: Readonly<ShadesColorScheme>;
};

export type { HEX, ColorToken, Color };
