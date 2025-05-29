import { StyleSheet } from "react-native";

export const Typography = StyleSheet.create({
  h1: {
    fontSize: 72,
    fontWeight: "bold",
    fontFamily: "SpaceMono-Regular",
  },
  h2: {
    fontSize: 44,
    fontWeight: "bold",
    fontFamily: "SpaceMono-Regular",
  },
  h3: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "SpaceMono-Regular",
  },
  h4: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "SpaceMono-Regular",
  },
  h5: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "SpaceMono-Regular",
  },
  t1: {
    fontSize: 22,
    fontWeight: "bold",
  },
  t2: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subNav: {
    fontSize: 16,
    fontWeight: "black",
    fontFamily: "SpaceMono-Regular",
  },
  subNavBold: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontFamily: "SpaceMono-Regular",
  },
  body: {
    fontSize: 16,
    fontWeight: "black",
    fontFamily: "SpaceMono-Regular",
  },
  caption: {
    fontSize: 14,
    fontWeight: "black",
    fontFamily: "SpaceMono-Regular",
  },
  captionBold: {
    fontSize: 14,
    fontWeight: "bold",
  },
  captionSmall: {
    fontSize: 12,
    fontWeight: "black",
    fontFamily: "SpaceMono-Regular",
  },
  disclosure: {
    fontSize: 12,
    fontWeight: "black",
    fontFamily: "SpaceMono-Regular",
  },
});

export type TypographyType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "t1"
  | "t2"
  | "subNav"
  | "subNavBold"
  | "button"
  | "body"
  | "caption"
  | "disclosure"
  | "captionBold"
  | "captionSmall";
