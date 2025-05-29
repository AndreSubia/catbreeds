import { Color } from "@/src/styles/colors";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Text from "../../atoms/Text/Text";

type HeaderProps = {
  title: string;
  showBack?: boolean;
  useSafeAreaTop?: boolean;
};

const Header = ({
  title,
  showBack = true,
  useSafeAreaTop = true,
}: HeaderProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: useSafeAreaTop ? insets.top : 0 },
      ]}
    >
      {showBack ? (
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <AntDesign name="left" size={24} color={Color.black} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text type="t2" style={styles.title}>
        {title}
      </Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    backgroundColor: Color.white,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
  },
  placeholder: {
    width: 40,
    height: 40,
  },
});

export default Header;
