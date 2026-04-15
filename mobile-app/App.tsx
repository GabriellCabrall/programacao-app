import { StatusBar } from "react-native";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import { Imbue_400Regular } from "@expo-google-fonts/imbue";

import { colors } from "./src/constants/colors";
import { newsMock } from "./src/data/news";
import { NewsDetailScreen } from "./src/screens/NewsDetailScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: Inter_400Regular,
    Imbue: Imbue_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.backgroundDark}
      />
      <NewsDetailScreen item={newsMock[0]} />
    </>
  );
}
