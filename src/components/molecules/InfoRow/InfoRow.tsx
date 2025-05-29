import Text from "@/src/components/atoms/Text/Text";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type InfoRowProps = {
  title: string;
  content?: string | number;
  children?: ReactNode;
};

const InfoRow = ({ title, content, children }: InfoRowProps) => {
  if (!content && !children) return null;
  return (
    <View style={styles.container}>
      <Text type="t2">
        {title}: <Text>{content}</Text>
      </Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default InfoRow;
