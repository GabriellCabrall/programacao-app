import { StatusBar } from "react-native";
import { HomeScreen } from "./src/screens/HomeScreen";
import { colors } from "./src/constants/colors";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import { Imbue_400Regular } from "@expo-google-fonts/imbue";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: Inter_400Regular,
    Imbue: Imbue_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.backgroundDark} />
      <HomeScreen />
    </>
  );
}