import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppLogo } from "../components/AppLogo";
import { colors } from "../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  onBack?: () => void;
  onSelectAutor?: () => void;
  onSelectLeitor?: () => void;
  onSelectEditor?: () => void;
  onSelectAdmin?: () => void;
};

type ProfileButtonProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

function ProfileButton({ label, icon, onPress }: ProfileButtonProps) {
  return (
    <Pressable style={styles.profileButton} onPress={onPress}>
      <Ionicons name={icon} size={20} color={colors.textPrimary} />
      <Text style={styles.profileButtonText}>{label}</Text>
    </Pressable>
  );
}

export function ProfileSelectScreen({
  onBack,
  onSelectAutor,
  onSelectLeitor,
  onSelectEditor,
  onSelectAdmin,
}: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <View style={[styles.topBar, { paddingTop: insets.top + 6 }]}>
        <Pressable onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.topSection}>
          <AppLogo size="md" />
        </View>

        <View style={styles.buttonsSection}>
          <ProfileButton
            label="Autor"
            icon="create-outline"
            onPress={onSelectAutor}
          />

          <ProfileButton
            label="Leitor"
            icon="people-outline"
            onPress={onSelectLeitor}
          />

          <ProfileButton
            label="Editor"
            icon="pencil-outline"
            onPress={onSelectEditor}
          />

          <ProfileButton
            label="SuperAdmin"
            icon="shield-outline"
            onPress={onSelectAdmin}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  topBar: {
    paddingHorizontal: 16,
  },
  backIcon: {
    color: colors.textPrimary,
    fontSize: 26,
    fontFamily: "Inter",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
  },
  topSection: {
    alignItems: "center",
    marginTop: 8,
  },
  buttonsSection: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 24,
  },
  profileButton: {
    width: 176,
    height: 68,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.28)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.65)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  profileButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
  },
});
