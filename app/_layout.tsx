import Header from "@/src/components/molecules/Header/Header";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "../src/store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  return (
    <Provider store={store}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Catbreeds",
            headerShown: true,
            header: () => <Header showBack={false} title="Catbreeds" />,
            headerShadowVisible: false,
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 18,
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="detail"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
}
