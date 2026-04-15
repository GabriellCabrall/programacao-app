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
import { AuthorProfileScreen } from "./src/screens/AuthorProfileScreen";
import { AuthorNewsScreen } from "./src/screens/AuthorNewsScreen";
import { EditNewsScreen } from "./src/screens/EditNewsScreen";
import { NewNewsScreen } from "./src/screens/NewNewsScreen";

type Screen =
  | "home"
  | "detail"
  | "login"
  | "cadastro"
  | "perfil"
  | "forgotPassword"
  | "authorProfile"
  | "authorNews"
  | "editNews"
  | "newNews";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: Inter_400Regular,
    Imbue: Imbue_400Regular,
  });

  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  function goToHome() {
    setMenuVisible(false);
    setCurrentScreen("home");
  }

  function goToLogin() {
    setMenuVisible(false);
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

  function goToAuthorProfile() {
    setCurrentScreen("authorProfile");
  }

  function goToAuthorNews() {
    setCurrentScreen("authorNews");
  }

  function goToEditNews(id: string) {
    const foundNews = newsMock.find((item) => item.id === id);

    if (!foundNews) return;

    setSelectedNews(foundNews);
    setCurrentScreen("editNews");
  }

  function goToNewNews() {
    setCurrentScreen("newNews");
  }

  function openMenu() {
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
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

  function handleBackFromEditNews() {
    setCurrentScreen("authorNews");
  }

  function handleSaveNews() {
    console.log("salvar notícia");
    setCurrentScreen("authorNews");
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.backgroundDark}
      />

      {currentScreen === "home" && (
        <HomeScreen
          onOpenNews={handleOpenNews}
          onOpenMenu={openMenu}
          menuVisible={menuVisible}
          onCloseMenu={closeMenu}
          onOpenLogin={goToLogin}
        />
      )}

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
          onSelectAutor={goToAuthorProfile}
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

      {currentScreen === "authorProfile" && (
        <AuthorProfileScreen
          onBack={goToPerfil}
          onOpenMyNews={goToAuthorNews}
        />
      )}

      {currentScreen === "authorNews" && (
        <AuthorNewsScreen
          onBack={goToAuthorProfile}
          onOpenEditNews={goToEditNews}
          onOpenNewNews={goToNewNews}
        />
      )}

      {currentScreen === "editNews" && selectedNews && (
        <EditNewsScreen
          item={selectedNews}
          onBack={handleBackFromEditNews}
          onSave={handleSaveNews}
        />
      )}

      {currentScreen === "newNews" && (
        <NewNewsScreen onBack={goToAuthorNews} onPublish={handleSaveNews} />
      )}
    </>
  );
}
