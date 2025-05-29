import { Color, ColorName } from "@/src/styles/colors";
import { Typography, TypographyType } from "@/src/types/typography";
import { Text as RNText, StyleSheet, TextStyle, ViewStyle } from "react-native";

type Props = {
  type?: TypographyType;
  color?: ColorName;
} & RNText["props"];

export const Text = ({
  style,
  type = "body",
  color = "black",
  ...props
}: Props) => {
  return (
    <RNText style={[colorStyles[color], Typography[type], style]} {...props} />
  );
};

const colorStyles = StyleSheet.create({
  ...Object.keys(Color).reduce(
    (acc, colorName) =>
      ({
        ...acc,

        [colorName as ColorName]: {
          color: Color[colorName as ColorName],
        },
      }) as const,
    {} as Record<ColorName, TextStyle>,
  ),
});

export default Text;
