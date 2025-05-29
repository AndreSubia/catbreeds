import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { store } from "../src/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar barStyle={"dark-content"} />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Catbreeds",
            headerShown: true,
            headerShadowVisible: false,
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 18,
            },
          }}
        />
        <Stack.Screen
          name="details/[breedId]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
}
