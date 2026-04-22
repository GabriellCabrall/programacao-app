import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
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
  atualizarRegiao,
  criarRegiao,
  deletarRegiao,
  listarCidadesSimples,
  listarRegioes,
} from "../db/regiaoService";

type Props = {
  onBack?: () => void;
};

export function CrudRegiaoScreen({ onBack }: Props) {
  const insets = useSafeAreaInsets();

  const [regioes, setRegioes] = useState<any[]>([]);
  const [cidades, setCidades] = useState<any[]>([]);

  const [formModalVisible, setFormModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [editing, setEditing] = useState<any | null>(null);
  const [selected, setSelected] = useState<any | null>(null);

  const [nome, setNome] = useState("");
  const [cidadeId, setCidadeId] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    try {
      const regioesData = await listarRegioes();
      const cidadesData = await listarCidadesSimples();

      setRegioes(regioesData);
      setCidades(cidadesData);
    } catch (error) {
      console.error("Erro ao carregar regiões:", error);
      Alert.alert("Erro", "Não foi possível carregar as regiões.");
    }
  }

  function abrirAdicionar() {
    setEditing(null);
    setNome("");
    setCidadeId("");
    setDropdownOpen(false);
    setFormModalVisible(true);
  }

  function abrirEditar(item: any) {
    setEditing(item);
    setNome(item.nome);
    setCidadeId(item.cidadeId);
    setDropdownOpen(false);
    setFormModalVisible(true);
  }

  function abrirExcluir(item: any) {
    setSelected(item);
    setDeleteModalVisible(true);
  }

  function fecharFormulario() {
    setFormModalVisible(false);
    setEditing(null);
    setNome("");
    setCidadeId("");
    setDropdownOpen(false);
  }

  function fecharExclusao() {
    setDeleteModalVisible(false);
    setSelected(null);
  }

  async function salvar() {
    try {
      if (editing) {
        await atualizarRegiao(editing.id, { nome, cidadeId });
      } else {
        await criarRegiao({ nome, cidadeId });
      }

      fecharFormulario();
      await carregar();
    } catch (e: any) {
      Alert.alert("Erro", e.message ?? "Não foi possível salvar a região.");
    }
  }

  async function excluir() {
    if (!selected) return;

    try {
      await deletarRegiao(selected.id);
      fecharExclusao();
      await carregar();
    } catch (error) {
      console.error("Erro ao excluir região:", error);
      Alert.alert("Erro", "Não foi possível excluir a região.");
    }
  }

  const selectedCidade = cidades.find((cidade) => cidade.id === cidadeId);
  const selectedCidadeLabel = selectedCidade ? selectedCidade.nome : "";

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
        <AppLogo size="md" />
        <Text style={styles.title}>CRUD Regiões</Text>

        <Pressable style={styles.addButton} onPress={abrirAdicionar}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </Pressable>

        <FlatList
          data={regioes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>
                {item.nome} - {item.cidadeNome}
                {item.ufSigla ? ` - ${item.ufSigla}` : ""}
              </Text>

              <View style={styles.actions}>
                <Pressable onPress={() => abrirEditar(item)}>
                  <Ionicons name="create-outline" size={20} color="#fff" />
                </Pressable>

                <Pressable onPress={() => abrirExcluir(item)}>
                  <Ionicons name="trash-outline" size={20} color="#fff" />
                </Pressable>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </LinearGradient>

      <Modal
        visible={formModalVisible}
        transparent
        animationType="fade"
        onRequestClose={fecharFormulario}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={8}
          style={styles.modalOverlay}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {editing ? "Editar Região" : "Adicionar Região"}
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome da região"
                placeholderTextColor="#6B7280"
                value={nome}
                onChangeText={setNome}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cidade</Text>

              <Pressable
                style={styles.selectField}
                onPress={() => setDropdownOpen((prev) => !prev)}
              >
                <Text
                  style={[
                    styles.selectFieldText,
                    !selectedCidadeLabel && styles.selectPlaceholderText,
                  ]}
                >
                  {selectedCidadeLabel || "Selecione uma cidade"}
                </Text>

                <Ionicons
                  name={
                    dropdownOpen ? "chevron-up-outline" : "chevron-down-outline"
                  }
                  size={18}
                  color="#1F2D3A"
                />
              </Pressable>

              {dropdownOpen && (
                <View style={styles.dropdownContainer}>
                  <ScrollView
                    style={styles.dropdownScroll}
                    nestedScrollEnabled
                    showsVerticalScrollIndicator
                  >
                    {cidades.map((cidade) => {
                      const isSelected = cidadeId === cidade.id;

                      return (
                        <Pressable
                          key={cidade.id}
                          style={[
                            styles.dropdownOption,
                            isSelected && styles.dropdownOptionSelected,
                          ]}
                          onPress={() => {
                            setCidadeId(cidade.id);
                            setDropdownOpen(false);
                          }}
                        >
                          <Text
                            style={[
                              styles.dropdownOptionText,
                              isSelected && styles.dropdownOptionTextSelected,
                            ]}
                          >
                            {cidade.nome}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </ScrollView>
                </View>
              )}
            </View>

            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={fecharFormulario}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, styles.confirmButton]}
                onPress={salvar}
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
        onRequestClose={fecharExclusao}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Confirmar exclusão</Text>

            <Text style={styles.deleteText}>
              Deseja excluir a região{" "}
              <Text style={styles.deleteHighlight}>
                {selected?.nome}
                {selected?.cidadeNome ? ` - ${selected.cidadeNome}` : ""}
              </Text>
              ?
            </Text>

            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={fecharExclusao}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, styles.deleteButton]}
                onPress={excluir}
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
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontFamily: "Inter",
    fontWeight: "700",
    textAlign: "center",
    marginTop: 18,
    marginBottom: 18,
  },
  addButton: {
    alignSelf: "center",
    minWidth: 128,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8EEF3",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
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
    width: "100%",
    paddingBottom: 24,
  },
  card: {
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "600",
    flex: 1,
    paddingRight: 12,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
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
  selectField: {
    height: 42,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectFieldText: {
    color: "#1F2D3A",
    fontFamily: "Inter",
    fontSize: 14,
    flex: 1,
    paddingRight: 8,
  },
  selectPlaceholderText: {
    color: "#6B7280",
  },
  dropdownContainer: {
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    overflow: "hidden",
  },
  dropdownScroll: {
    maxHeight: 180,
  },
  dropdownOption: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  dropdownOptionSelected: {
    backgroundColor: "#DCEFFD",
  },
  dropdownOptionText: {
    color: "#1F2D3A",
    fontFamily: "Inter",
    fontSize: 14,
  },
  dropdownOptionTextSelected: {
    fontWeight: "600",
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
