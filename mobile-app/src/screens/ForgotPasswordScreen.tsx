import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AppLogo } from "../components/AppLogo";
import { colors } from "../constants/colors";

type Props = {
  onBack?: () => void;
  onSend?: () => void;
};

export function ForgotPasswordScreen({ onBack, onSend }: Props) {
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
          <Text style={styles.title}>Recuperar senha</Text>

          <Text style={styles.description}>
            Informe seu e-mail para receber instruções de recuperação de senha.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              placeholder=""
              placeholderTextColor={colors.textSecondary}
              style={styles.input}
            />
          </View>
        </View>

        <View style={styles.bottomSection}>
          <Pressable onPress={onSend} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Enviar</Text>
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
    paddingTop: 10,
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
    marginBottom: 48,
  },
  bottomSection: {
    alignItems: "center",
    paddingBottom: 20,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontFamily: "Inter",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: "Inter",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 18,
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
  },
  primaryButtonText: {
    color: "#1F2D3A",
    fontSize: 12,
    fontFamily: "Inter",
    fontWeight: "600",
  },
});
