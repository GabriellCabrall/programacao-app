import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppLogo } from "../components/AppLogo";
import { colors } from "../constants/colors";
import {
  atualizarUf,
  criarUf,
  deletarUf,
  listarUfs,
  type UfFormData,
} from "../db/ufService";

type UfItem = {
  id: string;
  nome: string;
  sigla: string;
};

type Props = {
  onBack?: () => void;
};

const emptyForm: UfFormData = {
  nome: "",
  sigla: "",
};

export function CrudUfScreen({ onBack }: Props) {
  const insets = useSafeAreaInsets();

  const [ufs, setUfs] = useState<UfItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [formModalVisible, setFormModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [editingUf, setEditingUf] = useState<UfItem | null>(null);
  const [selectedUf, setSelectedUf] = useState<UfItem | null>(null);

  const [formData, setFormData] = useState<UfFormData>(emptyForm);

  const modalTitle = useMemo(
    () => (editingUf ? "Editar UF" : "Adicionar UF"),
    [editingUf],
  );

  async function carregarUfs() {
    try {
      setLoading(true);
      const data = await listarUfs();
      setUfs(data as UfItem[]);
    } catch (error) {
      console.error("Erro ao listar UFs:", error);
      Alert.alert("Erro", "Não foi possível carregar as UFs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarUfs();
  }, []);

  function abrirModalAdicionar() {
    setEditingUf(null);
    setFormData(emptyForm);
    setFormModalVisible(true);
  }

  function abrirModalEditar(item: UfItem) {
    setEditingUf(item);
    setFormData({
      nome: item.nome,
      sigla: item.sigla,
    });
    setFormModalVisible(true);
  }

  function abrirModalExcluir(item: UfItem) {
    setSelectedUf(item);
    setDeleteModalVisible(true);
  }

  function fecharModalFormulario() {
    setFormModalVisible(false);
    setEditingUf(null);
    setFormData(emptyForm);
  }

  function fecharModalExclusao() {
    setDeleteModalVisible(false);
    setSelectedUf(null);
  }

  async function salvarUf() {
    try {
      if (editingUf) {
        await atualizarUf(editingUf.id, formData);
      } else {
        await criarUf(formData);
      }

      fecharModalFormulario();
      await carregarUfs();
    } catch (error) {
      console.error("Erro ao salvar UF:", error);
      Alert.alert(
        "Erro",
        error instanceof Error
          ? error.message
          : "Não foi possível salvar a UF.",
      );
    }
  }

  async function confirmarExclusao() {
    if (!selectedUf) return;

    try {
      await deletarUf(selectedUf.id);
      fecharModalExclusao();
      await carregarUfs();
    } catch (error) {
      console.error("Erro ao excluir UF:", error);
      Alert.alert("Erro", "Não foi possível excluir a UF.");
    }
  }

  function renderUfItem({ item }: { item: UfItem }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardTextArea}>
          <Text style={styles.cardTitle}>{item.sigla}</Text>
          <Text style={styles.cardSubtitle}>{item.nome}</Text>
        </View>

        <View style={styles.cardActions}>
          <Pressable
            style={styles.iconButton}
            onPress={() => abrirModalEditar(item)}
          >
            <Ionicons
              name="create-outline"
              size={22}
              color={colors.textPrimary}
            />
          </Pressable>

          <Pressable
            style={styles.iconButton}
            onPress={() => abrirModalExcluir(item)}
          >
            <Ionicons
              name="trash-outline"
              size={22}
              color={colors.textPrimary}
            />
          </Pressable>
        </View>
      </View>
    );
  }

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
          <Text style={styles.title}>CRUD UF</Text>
        </View>

        <Pressable style={styles.addButton} onPress={abrirModalAdicionar}>
          <Ionicons name="add-outline" size={20} color="#1F2D3A" />
          <Text style={styles.addButtonText}>Adicionar</Text>
        </Pressable>

        <FlatList
          data={ufs}
          keyExtractor={(item) => item.id}
          renderItem={renderUfItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                {loading ? "Carregando..." : "Nenhuma UF cadastrada."}
              </Text>
            </View>
          }
        />
      </LinearGradient>

      <Modal
        visible={formModalVisible}
        transparent
        animationType="fade"
        onRequestClose={fecharModalFormulario}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={8}
          style={styles.modalOverlay}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={formData.nome}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, nome: text }))
                }
                placeholder="Digite o nome da UF"
                placeholderTextColor="#6B7280"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Sigla</Text>
              <TextInput
                style={styles.input}
                value={formData.sigla}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, sigla: text }))
                }
                placeholder="Digite a sigla"
                placeholderTextColor="#6B7280"
                maxLength={2}
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={fecharModalFormulario}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, styles.confirmButton]}
                onPress={salvarUf}
              >
                <Text style={styles.confirmButtonText}>Salvar</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        visible={deleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={fecharModalExclusao}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Confirmar exclusão</Text>
            <Text style={styles.deleteText}>
              Deseja excluir a UF{" "}
              <Text style={styles.deleteHighlight}>
                {selectedUf?.sigla} - {selectedUf?.nome}
              </Text>
              ?
            </Text>

            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={fecharModalExclusao}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, styles.deleteButton]}
                onPress={confirmarExclusao}
              >
                <Text style={styles.confirmButtonText}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
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
  addButton: {
    alignSelf: "center",
    minWidth: 128,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8EEF3",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginBottom: 18,
    paddingHorizontal: 16,
  },
  addButtonText: {
    color: "#1F2D3A",
    fontSize: 13,
    fontFamily: "Inter",
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: 24,
    gap: 12,
  },
  card: {
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTextArea: {
    flex: 1,
    paddingRight: 12,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontFamily: "Inter",
    fontWeight: "700",
  },
  cardSubtitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: "Inter",
    marginTop: 2,
  },
  cardActions: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 30,
  },
  emptyStateText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: "Inter",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalCard: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#F4F7FA",
    padding: 20,
  },
  modalTitle: {
    color: "#1F2D3A",
    fontSize: 20,
    fontFamily: "Inter",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 18,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    color: "#1F2D3A",
    fontSize: 12,
    fontFamily: "Inter",
    marginBottom: 6,
  },
  input: {
    height: 42,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 12,
    color: "#1F2D3A",
    fontFamily: "Inter",
    fontSize: 14,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#D8DEE5",
  },
  confirmButton: {
    backgroundColor: "#2D4A5A",
  },
  deleteButton: {
    backgroundColor: "#B42318",
  },
  cancelButtonText: {
    color: "#1F2D3A",
    fontSize: 13,
    fontFamily: "Inter",
    fontWeight: "600",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "Inter",
    fontWeight: "600",
  },
  deleteText: {
    color: "#1F2D3A",
    fontSize: 14,
    fontFamily: "Inter",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 16,
  },
  deleteHighlight: {
    fontWeight: "700",
  },
});
