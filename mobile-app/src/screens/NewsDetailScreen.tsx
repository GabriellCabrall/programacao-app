import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AppLogo } from "../components/AppLogo";
import { colors } from "../constants/colors";
import { NewsItem } from "../data/news";

type Props = {
  item: NewsItem;
  onBack?: () => void;
};

export function NewsDetailScreen({ item, onBack }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.leftButton}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>

        <AppLogo size="md" />

        <View style={styles.rightArea}>
          <Text style={styles.profileIcon}>👤</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionLabel}>Detalhes da Notícia</Text>

        <Text style={styles.title}>{item.title}</Text>

        <Image source={{ uri: item.image }} style={styles.image} />

        <Text style={styles.body}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>

        <Text style={styles.subTitle}>Detalhes da Embarcação</Text>

        <Text style={styles.body}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Text>

        <Pressable style={styles.commentButton}>
          <Text style={styles.commentIcon}>🗨</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
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
  leftButton: {
    width: 32,
    paddingTop: 4,
  },
  backIcon: {
    color: colors.textPrimary,
    fontSize: 26,
    fontFamily: "Inter",
  },
  rightArea: {
    width: 32,
    alignItems: "flex-end",
    paddingTop: 4,
  },
  profileIcon: {
    fontSize: 18,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 28,
  },
  sectionLabel: {
    color: colors.textPrimary,
    textAlign: "center",
    fontSize: 12,
    marginBottom: 14,
    fontFamily: "Inter",
  },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    lineHeight: 28,
    fontFamily: "Inter",
    fontStyle: "italic",
    fontWeight: "700",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 210,
    borderRadius: 10,
    marginBottom: 18,
  },
  body: {
    color: colors.textPrimary,
    fontSize: 13,
    lineHeight: 22,
    fontFamily: "Inter",
    textAlign: "left",
    marginBottom: 14,
  },
  subTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Inter",
    fontWeight: "700",
    marginBottom: 8,
  },
  commentButton: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  commentIcon: {
    color: colors.textPrimary,
    fontSize: 24,
  },
});
