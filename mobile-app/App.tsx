import { StatusBar } from "react-native";
import { useState } from "react";
import { useFonts, Inter_400Regular } from "@expo-google-fonts/inter";
import { Imbue_400Regular } from "@expo-google-fonts/imbue";

import { colors } from "./src/constants/colors";
import { newsMock, NewsItem } from "./src/data/news";
import { HomeScreen } from "./src/screens/HomeScreen";
import { NewsDetailScreen } from "./src/screens/NewsDetailScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { CadastroScreen } from "./src/screens/CadastroScreen";
import { ProfileSelectScreen } from "./src/screens/ProfileSelectScreen";
import { ForgotPasswordScreen } from "./src/screens/ForgotPasswordScreen";

type Screen =
  | "home"
  | "detail"
  | "login"
  | "cadastro"
  | "perfil"
  | "forgotPassword";

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

  function goToHome() {
    setCurrentScreen("home");
  }

  function goToLogin() {
    setCurrentScreen("login");
  }

  function goToCadastro() {
    setCurrentScreen("cadastro");
  }

  function goToPerfil() {
    setCurrentScreen("perfil");
  }

  function goToForgotPassword() {
    setCurrentScreen("forgotPassword");
  }

  function handleOpenNews(id: string) {
    const foundNews = newsMock.find((item) => item.id === id);

    if (!foundNews) return;

    setSelectedNews(foundNews);
    setCurrentScreen("detail");
  }

  function handleBackFromDetail() {
    setSelectedNews(null);
    setCurrentScreen("home");
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.backgroundDark}
      />

      {currentScreen === "home" && <HomeScreen onOpenNews={handleOpenNews} />}

      {currentScreen === "detail" && selectedNews && (
        <NewsDetailScreen item={selectedNews} onBack={handleBackFromDetail} />
      )}

      {currentScreen === "login" && (
        <LoginScreen
          onBack={goToHome}
          onEnter={goToPerfil}
          onOpenCadastro={goToCadastro}
          onOpenForgotPassword={goToForgotPassword}
        />
      )}

      {currentScreen === "cadastro" && (
        <CadastroScreen
          onBack={goToLogin}
          onCadastrar={goToPerfil}
          onOpenLogin={goToLogin}
        />
      )}

      {currentScreen === "perfil" && (
        <ProfileSelectScreen
          onBack={goToLogin}
          onSelectAutor={() => console.log("Autor")}
          onSelectLeitor={() => console.log("Leitor")}
          onSelectEditor={() => console.log("Editor")}
          onSelectAdmin={() => console.log("SuperAdmin")}
        />
      )}

      {currentScreen === "forgotPassword" && (
        <ForgotPasswordScreen
          onBack={goToLogin}
          onSend={() => console.log("enviar recuperação")}
        />
      )}
    </>
  );
}
