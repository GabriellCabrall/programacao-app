import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
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
    setFormModalVisible(true);
  }

  function abrirEditar(item: any) {
    setEditing(item);
    setNome(item.nome);
    setUfId(item.ufId);
    setFormModalVisible(true);
  }

  function abrirExcluir(item: any) {
    setSelected(item);
    setDeleteModalVisible(true);
  }

  async function salvar() {
    try {
      if (editing) {
        await atualizarCidade(editing.id, { nome, ufId });
      } else {
        await criarCidade({ nome, ufId });
      }

      setFormModalVisible(false);
      carregar();
    } catch (e: any) {
      Alert.alert("Erro", e.message);
    }
  }

  async function excluir() {
    if (!selected) return;
    await deletarCidade(selected.id);
    setDeleteModalVisible(false);
    carregar();
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
      <Modal visible={formModalVisible} transparent animationType="fade">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={8}
          style={styles.modalOverlay}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {editing ? "Editar" : "Adicionar"} Cidade
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
            />

            {/* seletor simples */}
            {ufs.map((uf) => (
              <Pressable
                key={uf.id}
                style={[styles.ufOption, ufId === uf.id && styles.ufSelected]}
                onPress={() => setUfId(uf.id)}
              >
                <Text>
                  {uf.sigla} - {uf.nome}
                </Text>
              </Pressable>
            ))}

            <Pressable style={styles.saveButton} onPress={salvar}>
              <Text>Salvar</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* MODAL DELETE */}
      <Modal visible={deleteModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text>Excluir cidade?</Text>

            <Pressable onPress={excluir}>
              <Text>Confirmar</Text>
            </Pressable>
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
    marginBottom: 12,
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
