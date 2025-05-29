import { Color } from "@/src/styles/colors";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Skeleton } from "../../atoms/Skeleton/Skeleton";

export const SkeletonCard: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Skeleton style={styles.title} />
        <Skeleton style={styles.subtitle} />
      </View>
      <Skeleton style={styles.image} />
      <View style={styles.content}>
        <Skeleton style={styles.title} />
        <Skeleton style={styles.subtitle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    shadowColor: Color.black,
    borderWidth: 1,
    borderColor: Color.smoke,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 16,
    gap: 20,
    marginBottom: 16,
  },
  image: {
    height: 350,
    width: "100%",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    height: 16,
    width: 100,
  },
  subtitle: {
    height: 16,
    width: 100,
  },
});
