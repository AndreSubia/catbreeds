import Text from "@/src/components/atoms/Text/Text";
import SearchBar from "@/src/components/molecules/SearchBar/SearchBar";
import SkeletonCard from "@/src/components/molecules/SkeletonCard/SkeletonCard";
import BreedCard from "@/src/components/organisms/BreedCard/BreedCard";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { useAppSelector } from "@/src/hooks/useAppSelector";
import { useDebounce } from "@/src/hooks/useDebounce";
import { fetchCatBreeds, resetCatBreeds } from "@/src/store/cats/slice";
import { Color } from "@/src/styles/colors";
import { CatBreed } from "@/src/types/cats";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Alert, FlatList, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const LIMIT = 10;
const DEBOUNCE_DELAY = 500;

const LandingScreen: FC = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const { data, loading, error, hasNextPage } = useAppSelector(
    (state) => state.catBreeds,
  );

  const debouncedQuery = useDebounce(
    useCallback(() => {
      dispatch(fetchCatBreeds({ page, limit: LIMIT, searchName: searchText }));
    }, [page, searchText, dispatch]),
    DEBOUNCE_DELAY,
  );

  const handleOnClear = useCallback(() => {
    dispatch(resetCatBreeds());
    setSearchText("");
    setPage(0);
  }, [dispatch]);

  const renderBreedCard = useCallback(({ item }: { item: CatBreed }) => {
    if (!item) return <SkeletonCard />;
    return <BreedCard breed={item} />;
  }, []);

  const renderFooter = useCallback(
    () =>
      loading && hasNextPage ? (
        <View style={styles.footerContainer}>
          <SkeletonCard />
        </View>
      ) : null,
    [loading, hasNextPage],
  );

  const loadNextPage = useCallback(
    () => hasNextPage && setPage((prev) => prev + 1),
    [hasNextPage],
  );

  useEffect(() => {
    debouncedQuery();
  }, [debouncedQuery]);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [{ text: "OK" }]);
    }
  }, [error]);

  const renderContent = () => {
    if (data.length === 0 && loading) {
      return (
        <ScrollView
          contentContainerStyle={styles.loadingScrollView}
          showsVerticalScrollIndicator={false}
        >
          <SkeletonCard />
          <SkeletonCard />
        </ScrollView>
      );
    }

    if (data.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text type="t2">No data found</Text>
        </View>
      );
    }

    return (
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
        ListHeaderComponentStyle={styles.headerStyle}
        ListFooterComponent={renderFooter}
      />
    );
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <SearchBar
        value={searchText}
        onChange={setSearchText}
        onClear={handleOnClear}
        placeholder="Search cat breeds"
      />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    backgroundColor: Color.white,
  },
  footerContainer: {
    paddingBottom: 16,
  },
  loadingScrollView: {
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerStyle: {
    marginBottom: 8,
  },
});

export default LandingScreen;
