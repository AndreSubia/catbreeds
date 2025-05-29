import { SearchBar } from "@/src/components/molecules/SearchBar/SearchBar";
import { SkeletonCard } from "@/src/components/molecules/SkeletonCard/SkeletonCard";
import BreedCard from "@/src/components/organisms/BreedCard/BreedCard";
import { Color } from "@/src/styles/colors";
import { CatBreed } from "@/src/types/cats";
import { useEffect, useState } from "react";
import {
  FlatList,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TextInputChangeEventData,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch } from "../src/hooks/useAppDispatch";
import { useAppSelector } from "../src/hooks/useAppSelector";
import { fetchCatBreeds } from "../src/store/cats/slice";

const LIMIT = 10;

export default function Landing() {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const { data, loading, error, hasNextPage } = useAppSelector(
    (state) => state.catBreeds,
  );

  const handleOnChange = (
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const text = event.nativeEvent.text;
    setSearchText(text);
  };

  const handleOnClear = () => {
    setSearchText("");
  };

  useEffect(() => {
    dispatch(fetchCatBreeds({ page, limit: LIMIT }));
  }, [page, dispatch]);

  const loadNextPage = () => hasNextPage && setPage((prev) => prev + 1);

  if (loading && data.length === 0)
    return (
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        <SearchBar />
        <ScrollView
          contentContainerStyle={{ paddingTop: 8 }}
          showsVerticalScrollIndicator={false}
        >
          <SkeletonCard />
          <SkeletonCard />
        </ScrollView>
      </View>
    );
  if (error) return <Text>Error: {error}</Text>;

  const renderBreedCard = ({ item }: { item: CatBreed }) => {
    if (!item) return null;
    return <BreedCard breed={item} />;
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ paddingVertical: 20, borderTopWidth: 1 }}>
        <SkeletonCard />
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        maxToRenderPerBatch={5}
        windowSize={5}
        onEndReachedThreshold={0.5}
        onEndReached={loadNextPage}
        renderItem={renderBreedCard}
        stickyHeaderHiddenOnScroll={true}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <SearchBar
            value={searchText}
            onChange={handleOnChange}
            onClear={handleOnClear}
          />
        }
        ListHeaderComponentStyle={{ marginBottom: 8 }}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: Color.white,
  },
});
