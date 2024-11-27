import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  useFonts({
    "inter-regular": require("./../assets/fonts/Inter_24pt-Regular.ttf"),
    "inter-medium": require("./../assets/fonts/Inter_24pt-Medium.ttf"),
    "inter-extrabold": require("./../assets/fonts/Inter_24pt-ExtraBold.ttf"),
    "inter-bold": require("./../assets/fonts/Inter_24pt-Bold.ttf"),
    "lilitaOne": require("./../assets/fonts/LilitaOne-Regular.ttf"),
    "inter-semibold": require("./../assets/fonts/Inter_24pt-SemiBold.ttf"),
  });
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)Admin"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
