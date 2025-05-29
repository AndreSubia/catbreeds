import Chip from "@/src/components/atoms/Chip/Chip";
import Text from "@/src/components/atoms/Text/Text";
import Header from "@/src/components/molecules/Header/Header";
import InfoRow from "@/src/components/molecules/InfoRow/InfoRow";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { Color } from "@/src/styles/colors";
import * as WebBrowser from "expo-web-browser";
import { FC, useCallback } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type DetailScreenProps = {
  breedId: string;
};

const DetailScreen: FC<DetailScreenProps> = ({ breedId }) => {
  const breed = useAppSelector((state) => state.selectedCatBreed.data);
  const breedName = breed?.name ?? "";

  const handleOpenWikipedia = useCallback(() => {
    if (breed?.wikipedia_url) {
      WebBrowser.openBrowserAsync(breed.wikipedia_url);
    }
  }, [breed?.wikipedia_url]);

  const renderStars = useCallback((count: number = 0) => {
    return Array.from({ length: count }).map((_, i) => (
      <Text key={i} type="caption">
        ⭐
      </Text>
    ));
  }, []);

  const renderChips = useCallback((text: string = "", color: string) => {
    return text
      .trim()
      .split(", ")
      .map((t, i) => <Chip key={i} text={t} backgroundColor={color} />);
  }, []);

  return (
    <SafeAreaView key={breedId} style={styles.screen}>
      <Header title={breedName} useSafeAreaTop={false} />
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={
              breed?.image_url
                ? { uri: breed.image_url }
                : require("@/assets/images/no_image.jpg")
            }
            style={styles.image}
            defaultSource={require("@/assets/images/no_image.jpg")}
          />
        </View>
        <View style={styles.detailsContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <InfoRow title="Description" content={breed?.description} />
            <InfoRow title="Origin" content={breed?.origin} />
            <InfoRow
              title="Weight"
              content={
                breed?.weight.metric ? `${breed.weight.metric} Kg` : undefined
              }
            />

            <InfoRow title="Intelligence" content={breed?.intelligence}>
              {renderStars(breed?.intelligence)}
            </InfoRow>
            <InfoRow title="Adaptability" content={breed?.adaptability}>
              {renderStars(breed?.adaptability)}
            </InfoRow>
            <InfoRow title="Energy Level" content={breed?.energy_level}>
              {renderStars(breed?.energy_level)}
            </InfoRow>

            <InfoRow title="Alt Names">
              {breed?.alt_names &&
                renderChips(breed.alt_names, Color.lightPurple)}
            </InfoRow>
            <InfoRow title="Temperament">
              {breed?.temperament &&
                renderChips(breed.temperament, Color.coral)}
            </InfoRow>
            <InfoRow
              title="Life Span"
              content={
                breed?.life_span ? `${breed?.life_span} years` : undefined
              }
            />
            <InfoRow title="Wikipedia">
              {breed?.wikipedia_url && (
                <TouchableOpacity onPress={handleOpenWikipedia}>
                  <Text type="subNavBold" color="frequencyPurple">
                    {breed.name}
                  </Text>
                </TouchableOpacity>
              )}
            </InfoRow>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Color.white,
  },
  content: {
    flex: 1,
    gap: 12,
  },
  imageContainer: {
    flex: 0.5,
    paddingHorizontal: 16,
    backgroundColor: Color.white,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 0.5,
  },
  scrollContent: {
    gap: 10,
    paddingHorizontal: 16,
  },
});

export default DetailScreen;
