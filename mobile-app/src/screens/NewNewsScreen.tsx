import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppLogo } from "../components/AppLogo";
import { colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  onBack?: () => void;
  onPublish?: () => void;
};

export function NewNewsScreen({ onBack, onPublish }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>

        <AppLogo size="md" />

        <View style={styles.rightArea}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100?img=12" }}
            style={styles.avatar}
          />
        </View>
      </View>

      <LinearGradient
        colors={["#04527A", "#01689C", "#007AB8"]}
        locations={[0, 0.5, 1]}
        style={styles.content}
      >
        <TextInput
          style={styles.titleInput}
          multiline
          placeholder="Título da notícia"
          placeholderTextColor={colors.textPrimary}
        />

        <TextInput
          style={styles.subtitleInput}
          multiline
          placeholder="Subtítulo"
          placeholderTextColor={colors.textPrimary}
        />

        <Pressable style={styles.imagePlaceholder}>
          <Ionicons name="image-outline" size={44} color="#2B2F33" />
        </Pressable>

        <TextInput
          style={styles.descriptionInput}
          multiline
          textAlignVertical="top"
          placeholder="Descrição"
          placeholderTextColor={colors.textPrimary}
        />

        <Pressable style={styles.publishButton} onPress={onPublish}>
          <Text style={styles.publishButtonText}>Publicar</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  topBar: {
    backgroundColor: colors.backgroundDark,
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  backIcon: {
    color: colors.textPrimary,
    fontSize: 26,
    fontFamily: "Inter",
  },
  rightArea: {
    width: 34,
    alignItems: "flex-end",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 12,
  },
  titleInput: {
    color: colors.textPrimary,
    fontSize: 22,
    lineHeight: 30,
    fontFamily: "Inter",
    fontStyle: "italic",
    fontWeight: "700",
    textDecorationLine: "underline",
    marginBottom: 18,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  subtitleInput: {
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: "Inter",
    marginBottom: 18,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  imagePlaceholder: {
    width: "100%",
    height: 210,
    borderRadius: 32,
    backgroundColor: "rgba(219,236,248,0.65)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  descriptionInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 15,
    lineHeight: 28,
    fontFamily: "Inter",
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginBottom: 18,
  },
  publishButton: {
    alignSelf: "flex-end",
    minWidth: 96,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#2D4A5A",
    alignItems: "center",
    justifyContent: "center",
  },
  publishButtonText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
  },
});
