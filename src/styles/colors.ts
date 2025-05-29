export enum Color {
  white = "#FFFFFF",
  black = "#000000",
  pink = "#ffb1c7",
  pinkLight = "#feb5db",
  deepPink = "#ff5ca1",
  warmOrange = "#fdb246",
  coral = "#f6797f",
  red = "#ff6b86",
  purple = "#8f7fe6",
  lightPurple = "#7680d6",
  frequencyPurple = "#3838E6",
  dust = "#bdb0af",
  gray = "#707070",
  smoke = "#878787",
  frost = "#E8E8E8",
  darkestGrey = "#131217",
  blue = "#4d81d7",
}

export type ColorName = keyof typeof Color;
