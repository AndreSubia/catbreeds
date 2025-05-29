import { Color } from "@/src/styles/colors";
import { FC, useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View, ViewStyle } from "react-native";

type SkeletonProps = {
  style?: ViewStyle;
};

const Skeleton: FC<SkeletonProps> = ({ style }) => {
  const animatedValue = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const sparkAnimation = Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0.5,
        duration: 600,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(sparkAnimation).start();

    return () => {
      sparkAnimation.stop();
    };
  }, [animatedValue]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          opacity: animatedValue,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: Color.frost,
  },
});

export default Skeleton;
