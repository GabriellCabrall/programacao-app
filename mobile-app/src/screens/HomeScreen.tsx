import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppLogo } from "../components/AppLogo";
import { NewsCard } from "../components/NewsCard";
import { colors } from "../constants/colors";
import { newsMock } from "../data/news";
import { LinearGradient } from "expo-linear-gradient";
import { AppHeader } from "../components/appHeader";

type Props = {
  onOpenNews?: (id: string) => void;
  onOpenMenu?: () => void;
  menuVisible?: boolean;
  onCloseMenu?: () => void;
  onOpenLogin?: () => void;
};

export function HomeScreen({
  onOpenNews,
  onOpenMenu,
  menuVisible = false,
  onCloseMenu,
  onOpenLogin,
}: Props) {
  return (
    <View style={styles.container}>
      <AppHeader showMenu onLeftPress={onOpenMenu} />

      {menuVisible && (
        <>
          <Pressable style={styles.overlay} onPress={onCloseMenu} />

          <View style={styles.sideMenu}>
            <Text style={styles.sideMenuTitle}>Menu</Text>

            <Pressable style={styles.sideMenuItem} onPress={onOpenLogin}>
              <Text style={styles.sideMenuItemText}>Fazer login</Text>
            </Pressable>
          </View>
        </>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80",
          }}
          style={styles.heroImage}
        />

        <LinearGradient
          colors={["#04527A", "#01689C", "#007AB8"]}
          locations={[0, 0.5, 1]}
          style={styles.newsSection}
        >
          <Text style={styles.sectionTitle}>
            Confira as notícias do momento.
          </Text>

          {newsMock.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              onPress={() => onOpenNews?.(item.id)}
            />
          ))}

          <TouchableOpacity>
            <Text style={styles.moreText}>Ver mais</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundBlue,
  },
  header: {
    backgroundColor: colors.backgroundDark,
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  leftIcon: {
    width: 32,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 6,
  },
  rightIcons: {
    width: 44,
    alignItems: "center",
    gap: 4,
    paddingTop: 2,
  },
  iconText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontFamily: "Inter",
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  newsSection: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Inter",
  },
  moreText: {
    color: colors.textPrimary,
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 12,
    fontSize: 12,
    fontFamily: "Inter",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
    zIndex: 5,
  },
  sideMenu: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 220,
    backgroundColor: colors.backgroundDark,
    paddingTop: 90,
    paddingHorizontal: 18,
    zIndex: 10,
  },
  sideMenuTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontFamily: "Inter",
    fontWeight: "700",
    marginBottom: 20,
  },
  sideMenuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  sideMenuItemText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: "Inter",
  },
});
