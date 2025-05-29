import { ColorName } from "@/src/styles/colors";
import { Text } from "@components/atoms/Text/Text";
import React from "react";
import { StyleSheet, View } from "react-native";

type ChipProps = {
  text: string;
  textColor?: ColorName;
  backgroundColor?: string;
};

const Chip = ({
  text,
  textColor = "white",
  backgroundColor = "black",
}: ChipProps) => {
  return (
    <View
      style={[
        styles.chipContainer,
        {
          backgroundColor,
        },
      ]}
    >
      <Text color={textColor} type="captionBold">
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    marginBottom: 8,
  },
});

export default Chip;
