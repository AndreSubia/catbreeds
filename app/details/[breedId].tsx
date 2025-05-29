import { Color } from "@/src/styles/colors";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BreedId() {
  return (
    <SafeAreaView style={styles.screen}>
      <Text>[breedId]</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.white,
  },
});
