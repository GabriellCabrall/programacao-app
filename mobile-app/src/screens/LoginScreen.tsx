import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AppHeader } from "../components/appHeader";
import { AppLogo } from "../components/AppLogo";
import { colors } from "../constants/colors";

type Props = {
  onBack?: () => void;
  onEnter?: () => void;
  onOpenCadastro?: () => void;
  onOpenForgotPassword?: () => void;
};

export function LoginScreen({
  onBack,
  onEnter,
  onOpenCadastro,
  onOpenForgotPassword,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.topSection}>
          <AppLogo size="md" />
        </View>

        <View style={styles.middleSection}>
          <Text style={styles.title}>Login</Text>

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
        </View>

        <View style={styles.bottomSection}>
          <Pressable onPress={onOpenForgotPassword}>
            <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
          </Pressable>

          <View style={styles.footerTextRow}>
            <Text style={styles.footerText}>Não possui conta? </Text>
            <Pressable onPress={onOpenCadastro}>
              <Text style={styles.footerLink}>Cadastre-se</Text>
            </Pressable>
          </View>

          <Pressable onPress={onEnter} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Entrar</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 24,
    fontFamily: "Inter",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 28,
  },
  topSection: {
    alignItems: "center",
    marginTop: 8,
  },
  middleSection: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 32,
  },
  bottomSection: {
    alignItems: "center",
    paddingBottom: 20,
  },
  form: {
    flex: 1,
    width: "100%",
    // justifyContent: "space-between",
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
  forgotPassword: {
    color: colors.accent,
    fontSize: 11,
    fontFamily: "Inter",
    textAlign: "center",
    marginBottom: 14,
  },
  primaryButton: {
    minWidth: 88,
    paddingHorizontal: 18,
    height: 34,
    borderRadius: 18,
    backgroundColor: "#E8EEF3",
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 18,
  },
  footerArea: {
    alignItems: "center",
    marginTop: 24,
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
  topBar: {
    paddingTop: 10,
    paddingHorizontal: 16,
  },

  backIcon: {
    color: colors.textPrimary,
    fontSize: 26,
    fontFamily: "Inter",
  },
});
