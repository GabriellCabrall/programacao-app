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
  listarCidades,
  listarUfsSimples,
  criarCidade,
  atualizarCidade,
  deletarCidade,
} from "../db/cidadeService";

type Props = {
  onBack?: () => void;
};

export function CrudCidadeScreen({ onBack }: Props) {
  const insets = useSafeAreaInsets();

  const [cidades, setCidades] = useState<any[]>([]);
  const [ufs, setUfs] = useState<any[]>([]);

  const [formModalVisible, setFormModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [editing, setEditing] = useState<any | null>(null);
  const [selected, setSelected] = useState<any | null>(null);

  const [nome, setNome] = useState("");
  const [ufId, setUfId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    const cidadesData = await listarCidades();
    const ufsData = await listarUfsSimples();

    setCidades(cidadesData);
    setUfs(ufsData);
  }

  function abrirAdicionar() {
    setEditing(null);
    setNome("");
    setUfId("");
    setDropdownOpen(false);
    setFormModalVisible(true);
  }

  function abrirEditar(item: any) {
    setEditing(item);
    setNome(item.nome);
    setUfId(item.ufId);
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
    setUfId("");
    setDropdownOpen(false);
  }

  function fecharExclusao() {
    setDeleteModalVisible(false);
    setSelected(null);
  }

  async function salvar() {
    try {
      if (editing) {
        await atualizarCidade(editing.id, { nome, ufId });
      } else {
        await criarCidade({ nome, ufId });
      }

      fecharFormulario();
      await carregar();
    } catch (e: any) {
      Alert.alert("Erro", e.message ?? "Não foi possível salvar a cidade.");
    }
  }

  async function excluir() {
    if (!selected) return;
    await deletarCidade(selected.id);
    setDeleteModalVisible(false);
    carregar();
  }

  const selectedUfLabel =
    ufs.find((uf) => uf.id === ufId)?.sigla +
      " - " +
      ufs.find((uf) => uf.id === ufId)?.nome || "";

  return (
    <View style={styles.container}>
      <View style={[styles.topBar, { paddingTop: insets.top + 6 }]}>
        <Pressable onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
      </View>

      <LinearGradient
        colors={["#04527A", "#01689C", "#007AB8"]}
        style={styles.content}
      >
        <AppLogo size="md" />
        <Text style={styles.title}>CRUD Cidade</Text>

        <Pressable style={styles.addButton} onPress={abrirAdicionar}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </Pressable>

        <FlatList
          data={cidades}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>
                {item.nome} - {item.ufSigla}
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
        />
      </LinearGradient>

      {/* MODAL FORM */}
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
              {editing ? "Editar Cidade" : "Adicionar Cidade"}
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite o nome da cidade"
                placeholderTextColor="#6B7280"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>UF</Text>

              <Pressable
                style={styles.selectField}
                onPress={() => setDropdownOpen((prev) => !prev)}
              >
                <Text
                  style={[
                    styles.selectFieldText,
                    !selectedUfLabel && styles.selectPlaceholderText,
                  ]}
                >
                  {selectedUfLabel || "Selecione uma UF"}
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
                    {ufs.map((uf) => {
                      const isSelected = ufId === uf.id;

                      return (
                        <Pressable
                          key={uf.id}
                          style={[
                            styles.dropdownOption,
                            isSelected && styles.dropdownOptionSelected,
                          ]}
                          onPress={() => {
                            setUfId(uf.id);
                            setDropdownOpen(false);
                          }}
                        >
                          <Text
                            style={[
                              styles.dropdownOptionText,
                              isSelected && styles.dropdownOptionTextSelected,
                            ]}
                          >
                            {uf.sigla} - {uf.nome}
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

      {/* MODAL DELETE */}
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
              Deseja excluir a cidade{" "}
              <Text style={styles.deleteHighlight}>
                {selected?.nome}
                {selected?.ufSigla ? ` - ${selected.ufSigla}` : ""}
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
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    color: "#1F2D3A",
    fontSize: 12,
    fontFamily: "Inter",
    marginBottom: 6,
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
  ufOption: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  ufSelected: {
    backgroundColor: "#DCEFFD",
    borderColor: "#0584C7",
  },
  saveButton: {
    alignSelf: "center",
    minWidth: 100,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#2D4A5A",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    paddingHorizontal: 18,
  },
});
