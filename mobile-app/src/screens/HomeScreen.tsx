import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppLogo } from "../components/AppLogo";
import { NewsCard } from "../components/NewsCard";
import { colors } from "../constants/colors";
import { newsMock } from "../data/news";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  onOpenNews?: (id: string) => void;
};

export function HomeScreen({ onOpenNews }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftIcon}>
          <Text style={styles.iconText}>☰</Text>
        </View>

        <AppLogo size="md" />

        <View style={styles.rightIcons}>
          <Text style={styles.iconText}>◔</Text>
          <Text style={styles.iconText}>👤</Text>
        </View>
      </View>

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
          <Text style={styles.sectionTitle}>Confira as notícias do momento.</Text>

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
    paddingBottom: 24,
  },
  heroImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  newsSection: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 24,
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