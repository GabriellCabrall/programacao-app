import { StatusBar } from "react-native";
import { useState } from "react";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import { Imbue_400Regular } from "@expo-google-fonts/imbue";

import { colors } from "./src/constants/colors";
import { newsMock, NewsItem } from "./src/data/news";
import { HomeScreen } from "./src/screens/HomeScreen";
import { NewsDetailScreen } from "./src/screens/NewsDetailScreen";

type Screen = "home" | "detail";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: Inter_400Regular,
    Imbue: Imbue_400Regular,
  });

  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  if (!fontsLoaded) {
    return null;
  }

  function handleOpenNews(id: string) {
    const news = newsMock.find((item) => item.id === id);

    if (!news) return;

    setSelectedNews(news);
    setCurrentScreen("detail");
  }

  function handleBackHome() {
    setCurrentScreen("home");
    setSelectedNews(null);
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.backgroundDark}
      />

      {currentScreen === "home" && <HomeScreen onOpenNews={handleOpenNews} />}

      {currentScreen === "detail" && selectedNews && (
        <NewsDetailScreen item={selectedNews} onBack={handleBackHome} />
      )}
    </>
  );
}
