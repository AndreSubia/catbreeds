import { Color } from "@/src/styles/colors";
import { CatBreed } from "@/src/types/cats";
import Text from "@components/atoms/Text/Text";
import { useRouter } from "expo-router";
import { memo } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface BreedCardProps {
  breed: CatBreed;
}

function BreedCard({ breed }: BreedCardProps) {
  const router = useRouter();
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text type="subNavBold">{breed.name}</Text>
        <TouchableOpacity onPress={() => router.push(`/details/${breed.id}`)}>
          <Text color="frequencyPurple" type="subNavBold">
            See more...
          </Text>
        </TouchableOpacity>
      </View>
      <Image
        source={
          breed?.image_url
            ? { uri: breed.image_url }
            : require("../../../../assets/images/no_image.jpg")
        }
        style={{ height: 350, width: "100%", backgroundColor: Color.frost }}
        resizeMode="contain"
        defaultSource={require("../../../../assets/images/no_image.jpg")}
      />
      <View style={styles.cardHeader}>
        <Text type="subNavBold">{breed.origin}</Text>
        <Text type="subNavBold">Intelligence: {breed.intelligence}</Text>
      </View>
    </View>
  );
}

export default memo(BreedCard);

const styles = StyleSheet.create({
  card: {
    padding: 16,
    gap: 20,
    backgroundColor: Color.white,
    borderWidth: 1,
    borderColor: Color.smoke,
    marginBottom: 16,
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,

    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
