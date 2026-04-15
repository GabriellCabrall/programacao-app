import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AppLogo } from "../components/AppLogo";
import { colors } from "../constants/colors";
import { NewsItem } from "../data/news";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  item: NewsItem;
  onBack?: () => void;
  onSave?: () => void;
};

export function EditNewsScreen({ item, onBack, onSave }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <View style={[styles.topBar, { paddingTop: insets.top + 6 }]}>
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

      <View style={styles.content}>
        <TextInput style={styles.titleInput} multiline value={item.title} />

        <TextInput style={styles.summaryInput} multiline value={item.summary} />

        <Image source={{ uri: item.image }} style={styles.image} />

        <TextInput
          style={styles.bodyInput}
          multiline
          textAlignVertical="top"
          value={`Conteúdo da notícia "${item.title}". Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`}
        />

        <Pressable style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundBlue,
  },
  topBar: {
    backgroundColor: colors.backgroundDark,
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
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 14,
  },
  titleInput: {
    color: colors.textPrimary,
    fontSize: 22,
    lineHeight: 30,
    fontFamily: "Inter",
    fontStyle: "italic",
    fontWeight: "700",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  summaryInput: {
    color: colors.textPrimary,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Inter",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 14,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#0B8FE3",
    marginBottom: 18,
  },
  bodyInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 15,
    lineHeight: 30,
    fontFamily: "Inter",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 18,
  },
  saveButton: {
    alignSelf: "flex-end",
    minWidth: 104,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2D4A5A",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "500",
  },
});
