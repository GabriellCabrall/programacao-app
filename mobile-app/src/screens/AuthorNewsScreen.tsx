import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppHeader } from "../components/appHeader";
import { NewsCard } from "../components/NewsCard";
import { colors } from "../constants/colors";
import { newsMock } from "../data/news";

type Props = {
  onBack?: () => void;
  onOpenEditNews?: (id: string) => void;
  onOpenNewNews?: () => void;
};

export function AuthorNewsScreen({
  onBack,
  onOpenEditNews,
  onOpenNewNews,
}: Props) {
  return (
    <View style={styles.container}>
      <AppHeader showBack onLeftPress={onBack} />

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
          <Text style={styles.sectionTitle}>Minhas Notícias</Text>

          {newsMock.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              onPress={() => onOpenEditNews?.(item.id)}
            />
          ))}

          <Pressable onPress={onOpenNewNews}>
            <Text style={styles.moreText}>Nova</Text>
          </Pressable>
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
});
