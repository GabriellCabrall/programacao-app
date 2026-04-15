import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AppLogo } from "../components/AppLogo";
import { colors } from "../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  onBack?: () => void;
  onCadastrar?: () => void;
  onOpenLogin?: () => void;
};

export function CadastroScreen({ onBack, onCadastrar, onOpenLogin }: Props) {
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

        <View style={styles.middleSection}>
          <Text style={styles.title}>Cadastro</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              placeholder=""
              placeholderTextColor={colors.textSecondary}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              placeholder=""
              placeholderTextColor={colors.textSecondary}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              secureTextEntry
              placeholder=""
              placeholderTextColor={colors.textSecondary}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirmar senha</Text>
            <TextInput
              secureTextEntry
              placeholder=""
              placeholderTextColor={colors.textSecondary}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.bottomSection}>
          <Pressable onPress={onCadastrar} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Cadastrar</Text>
          </Pressable>

          <View style={styles.footerTextRow}>
            <Text style={styles.footerText}>Já possui uma conta? </Text>
            <Pressable onPress={onOpenLogin}>
              <Text style={styles.footerLink}>Login</Text>
            </Pressable>
          </View>
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
  middleSection: {
    flex: 1,
    justifyContent: "center",
  },
  bottomSection: {
    alignItems: "center",
    paddingBottom: 20,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontFamily: "Inter",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 28,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 12,
    fontFamily: "Inter",
    marginBottom: 6,
  },
  input: {
    width: "100%",
    height: 42,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.20)",
    paddingHorizontal: 12,
    color: colors.textPrimary,
    fontFamily: "Inter",
    fontSize: 14,
  },
  primaryButton: {
    minWidth: 100,
    paddingHorizontal: 18,
    height: 34,
    borderRadius: 18,
    backgroundColor: "#E8EEF3",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    color: "#1F2D3A",
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "600",
  },
  footerTextRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 11,
    fontFamily: "Inter",
  },
  footerLink: {
    color: colors.accent,
    fontSize: 11,
    fontFamily: "Inter",
  },
});
