import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
} from "react-native";
import { useRef } from "react";
import { colors } from "../constants/colors";
import { NewsItem } from "../data/news";
import { AppHeader } from "../components/appHeader";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  item: NewsItem;
  onBack?: () => void;
};

export function NewsDetailScreen({ item, onBack }: Props) {
  const inputRef = useRef<TextInput>(null);

  function handleFocusInput() {
    inputRef.current?.focus();
  }

  return (
    <View style={styles.container}>
      <AppHeader showBack onLeftPress={onBack} />

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

        <Pressable style={styles.commentButton} onPress={handleFocusInput}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={28}
            color={colors.textPrimary}
          />
        </Pressable>

        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comentários</Text>

          <View style={styles.commentItem}>
            <Text style={styles.commentAuthor}>João</Text>
            <Text style={styles.commentText}>
              Muito interessante essa notícia!
            </Text>
          </View>

          <View style={styles.commentItem}>
            <Text style={styles.commentAuthor}>Ana</Text>
            <Text style={styles.commentText}>
              Não concordo com esse ponto apresentado.
            </Text>
          </View>

          <TextInput
            ref={inputRef}
            placeholder="Escreva um comentário..."
            placeholderTextColor={colors.textSecondary}
            style={styles.commentInput}
          />
        </View>
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
  commentsSection: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },

  commentsTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "600",
    marginBottom: 12,
  },

  commentItem: {
    marginBottom: 12,
  },

  commentAuthor: {
    color: colors.textPrimary,
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "600",
  },

  commentText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontFamily: "Inter",
    marginTop: 2,
  },

  commentInput: {
    width: "100%",
    height: 40,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    color: colors.textPrimary,
    fontFamily: "Inter",
    marginTop: 10,
  },
});
