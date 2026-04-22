import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AppLogo } from "../components/AppLogo";
import { colors } from "../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  onBack?: () => void;
  onOpenCrudCidades?: () => void;
  onOpenCrudTags?: () => void;
  onOpenCrudUf?: () => void;
  onOpenCrudNoticias?: () => void;
  onOpenCrudUsuarios?: () => void;
  onOpenCrudPerfis?: () => void;
  onOpenCrudRegioes?: () => void;
  onOpenGerenciarComentarios?: () => void;
};

type DashboardButtonProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

function DashboardButton({ label, icon, onPress }: DashboardButtonProps) {
  return (
    <Pressable style={styles.dashboardButton} onPress={onPress}>
      <Ionicons name={icon} size={20} color={colors.textPrimary} />
      <Text style={styles.dashboardButtonText}>{label}</Text>
    </Pressable>
  );
}

export function SuperAdminDashboardScreen({
  onBack,
  onOpenCrudCidades,
  onOpenCrudTags,
  onOpenCrudUf,
  onOpenCrudNoticias,
  onOpenCrudUsuarios,
  onOpenCrudPerfis,
  onOpenCrudRegioes,
  onOpenGerenciarComentarios,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.topBar, { paddingTop: insets.top + 6 }]}>
        <Pressable onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
      </View>

      <LinearGradient
        colors={["#04527A", "#01689C", "#007AB8"]}
        locations={[0, 0.5, 1]}
        style={styles.content}
      >
        <View style={styles.topSection}>
          <AppLogo size="md" />
          <Text style={styles.title}>Dashboard</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.buttonsSection}
          showsVerticalScrollIndicator={false}
        >
          <DashboardButton
            label="CRUD UF"
            icon="map-outline"
            onPress={onOpenCrudUf}
          />

          <DashboardButton
            label="CRUD Cidades"
            icon="business-outline"
            onPress={onOpenCrudCidades}
          />

          <DashboardButton
            label="CRUD Regiões"
            icon="navigate-outline"
            onPress={onOpenCrudRegioes}
          />

          <DashboardButton
            label="CRUD Tags"
            icon="pricetags-outline"
            onPress={onOpenCrudTags}
          />

          <DashboardButton
            label="CRUD Notícias"
            icon="newspaper-outline"
            onPress={onOpenCrudNoticias}
          />

          <DashboardButton
            label="CRUD Usuários"
            icon="people-outline"
            onPress={onOpenCrudUsuarios}
          />

          <DashboardButton
            label="CRUD Perfis"
            icon="person-circle-outline"
            onPress={onOpenCrudPerfis}
          />

          <DashboardButton
            label="Gerenciar Comentários"
            icon="chatbubbles-outline"
            onPress={onOpenGerenciarComentarios}
          />
        </ScrollView>
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
    paddingHorizontal: 16,
    backgroundColor: colors.backgroundDark,
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
    paddingBottom: 24,
  },
  topSection: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontFamily: "Inter",
    fontWeight: "700",
    marginTop: 18,
  },
  buttonsSection: {
    alignItems: "center",
    paddingBottom: 32,
    gap: 16,
  },
  dashboardButton: {
    width: 220,
    minHeight: 68,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.28)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.65)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  dashboardButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontFamily: "Inter",
    fontWeight: "600",
    textAlign: "center",
  },
});
