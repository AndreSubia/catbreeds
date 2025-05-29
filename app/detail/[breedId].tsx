import DetailScreen from "@/src/screens/detail/DetailScreen";
import { useLocalSearchParams } from "expo-router";

export default function BreedId() {
  const { breedId } = useLocalSearchParams<{ breedId: string }>();
  return <DetailScreen breedId={breedId} />;
}
