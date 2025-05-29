import Header from "@/src/components/molecules/Header/Header";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "../src/store";

export default function RootLayout() {
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
          name="detail/[breedId]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
}
