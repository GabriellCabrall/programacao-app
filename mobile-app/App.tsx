import { useCallback } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import { Imbue_400Regular } from "@expo-google-fonts/imbue";

import { colors } from "./src/constants/colors";
import { AppLogo } from "./src/components/AppLogo";

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
      <SafeAreaView style={styles.safeArea} onLayout={onLayoutRootView}>
        <View style={styles.container}>
          <AppLogo size="lg" />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
  },
});