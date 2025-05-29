export const Typography = {
  h1: {
    fontSize: 72,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 44,
    fontWeight: "bold",
  },
  h3: {
    fontSize: 36,
    fontWeight: "bold",
  },
  h4: {
    fontSize: 28,
    fontWeight: "bold",
  },
  h5: {
    fontSize: 24,
    fontWeight: "bold",
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
  },
  subNavBold: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  body: {
    fontSize: 16,
    fontWeight: "black",
  },
  caption: {
    fontSize: 14,
    fontWeight: "black",
  },
  captionBold: {
    fontSize: 14,
    fontWeight: "bold",
  },
  captionSmall: {
    fontSize: 12,
    fontWeight: "black",
  },
  disclosure: {
    fontSize: 12,
    fontWeight: "black",
  },
} as const;

export type TypographyType = keyof typeof Typography;
