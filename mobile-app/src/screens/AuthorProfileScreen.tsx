import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  onBack?: () => void;
  onOpenMyNews?: () => void;
};

export function AuthorProfileScreen({ onBack, onOpenMyNews }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      {/* Topo */}
      <View style={[styles.topBar, { paddingTop: insets.top + 6 }]}>
        <Pressable onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        {/* FOTO */}
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/300",
            }}
            style={styles.avatar}
          />
        </View>

        {/* FORM */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome:</Text>
            <View style={styles.input}>
              <Text style={styles.inputText}>Luan Santana</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail:</Text>
            <View style={styles.input}>
              <Text style={styles.inputText}>luansantana@gmail.com</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha:</Text>
            <View style={styles.input}>
              <Text style={styles.inputText}>••••••••••••••••</Text>
            </View>
          </View>
        </View>

        {/* BOTÃO */}
        <View style={styles.bottomSection}>
          <Pressable style={styles.primaryButton} onPress={onOpenMyNews}>
            <Text style={styles.primaryButtonText}>Minhas Notícias</Text>
          </Pressable>
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
    paddingTop: 12,
  },

  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },

  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },

  form: {
    width: "100%",
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    color: colors.textPrimary,
    fontSize: 13,
    fontFamily: "Inter",
    marginBottom: 6,
  },

  input: {
    width: "100%",
    height: 46,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.28)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.65)",
    justifyContent: "center",
    paddingHorizontal: 14,
  },

  inputText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: "Inter",
  },

  bottomSection: {
    marginTop: 30,
    alignItems: "center",
  },

  primaryButton: {
    minWidth: 160,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8EEF3",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#1F2D3A",
    fontSize: 13,
    fontFamily: "Inter",
    fontWeight: "600",
  },
});
