import { Stack } from "expo-router";

export default function DetailLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[breedId]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
