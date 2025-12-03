// app/product/[id].tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  Alert,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Link, useLocalSearchParams, router } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { supabase } from "../utils/supabase";

const TAUPE = "#5B524B";
const BACKGROUND = "#FFFFFF";
const HEADER_BG = "#F5F1ED";
const CARD_BG = "#FFFFFF";
const TEXT_MAIN = "#3B302A";
const TEXT_MUTED = "#8A7C73";

type Producto = {
  id: string;
  nombre: string;
  marca: string;
  imagen: string;
  valoracion?: number;
  ingredientes: string;
  informacion: string;
};

type Lista = {
  id: string;
  nombre: string;
};

type Resena = {
  id: string;
  calificacion: number;
  nota: string;
  usuario_id: string;
  created_at: string;
  usuario?: {
    nombre: string;
  };
};

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Producto | null>(null);
  const [lists, setLists] = useState<Lista[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [reviews, setReviews] = useState<Resena[]>([]);
  const [newReviewNote, setNewReviewNote] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchProduct();
    fetchReviews();
  }, [id]);

  async function fetchProduct() {
    setLoading(true);
    const { data } = await supabase
      .from("Productos")
      .select("id, nombre, marca, imagen, valoracion, ingredientes, informacion")
      .eq("id", id)
      .single();

    if (data) setProduct(data as Producto);
    setLoading(false);
  }

  async function fetchReviews() {
    const { data } = await supabase
      .from("Resenas")
      .select("*, usuario:Usuarios(nombre)")
      .eq("producto", id)
      .order("created_at", { ascending: false });

    if (data) setReviews(data as Resena[]);
  }

  async function fetchLists() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      Alert.alert("Error", "Inicia sesión para guardar en listas");
      return;
    }

    const { data } = await supabase
      .from("Listas")
      .select("id, nombre")
      .eq("usuario_id", user.id);

    if (data) {
      setLists(data);
      setModalVisible(true);
    }
  }

  async function addToList(listaId: string) {
    const { error } = await supabase
      .from("ListaProductos")
      .insert([{ lista_id: listaId, producto_id: id }]);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Éxito", "Producto agregado a la lista");
      setModalVisible(false);
    }
  }

  async function submitReview() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      Alert.alert("Error", "Inicia sesión para dejar una reseña");
      return;
    }

    const { error } = await supabase.from("Resenas").insert([
      {
        producto: id,
        calificacion: newReviewRating,
        nota: newReviewNote,
        usuario_id: user.id,
      },
    ]);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Éxito", "Reseña agregada");
      setNewReviewNote("");
      fetchReviews();
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER CON LOGO (UI del segundo) */}
        <View style={styles.headerBar}>
          <View style={styles.headerSide}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={22} color={TEXT_MAIN} />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTitle}>CLEARLABEL</Text>

          <View style={styles.headerSide} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* TITULOS (UI del segundo) */}
          <Text style={styles.pageTitle}>Detalle de producto</Text>
          <Text style={styles.pageSubtitle}>
            Revisa la seguridad, ingredientes y reseñas de este producto.
          </Text>

          {loading ? (
            <ActivityIndicator size="large" color={TAUPE} style={{ marginTop: 40 }} />
          ) : product ? (
            <>
              {/* IMAGEN */}
              <View style={styles.imagePlaceholder}>
                {product.imagen ? (
                  <Image
                    source={{ uri: product.imagen }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={styles.placeholderText}>Sin imagen</Text>
                )}
              </View>

              {/* CARD PRINCIPAL */}
              <View style={styles.card}>
                <Text style={styles.title}>{product.nombre}</Text>
                <Text style={styles.sub}>Marca: {product.marca}</Text>

                {/* Valoración de la BD */}
                {product.valoracion !== undefined && (
                  <Text style={styles.smallMuted}>Valoración: {product.valoracion}</Text>
                )}

                {/* Calificación promedio calculada */}
                {(() => {
                  const avg =
                    reviews.length > 0
                      ? reviews.reduce((acc, r) => acc + r.calificacion, 0) / reviews.length
                      : 0;
                  const avgFormatted = avg > 0 ? avg.toFixed(1) : "-";

                  return (
                    <View style={styles.scoreRow}>
                      <Text style={styles.scoreLeft}>Calificación promedio</Text>
                      <Text style={styles.scoreRight}>
                        {avgFormatted}/5
                      </Text>
                    </View>
                  );
                })()}
              </View>

              {/* CARD “AÑADIR A LISTAS” (UI del segundo) */}
              <View style={styles.favoriteCard}>
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text style={styles.favoriteTitle}>Añadir a listas</Text>
                  <Text style={styles.favoriteSubtitle}>
                    Guarda este producto en tus listas para revisarlo después.
                  </Text>
                </View>

                <TouchableOpacity style={styles.favoriteButton} onPress={fetchLists}>
                  <AntDesign name="plus" size={16} color="#fff" />
                  <Text style={styles.favoriteButtonText}>Añadir</Text>
                </TouchableOpacity>
              </View>

              {/* INGREDIENTES */}
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Ingredientes</Text>
                <Text style={styles.bodyText}>{product.ingredientes}</Text>
              </View>

              {/* INFORMACIÓN */}
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Información</Text>
                <Text style={styles.bodyText}>{product.informacion}</Text>
              </View>

              {/* RESEÑAS */}
              <View style={styles.card}>
                <Text style={styles.sectionTitle}>Reseñas</Text>

                {reviews.length === 0 ? (
                  <Text style={styles.emptyText}>No hay reseñas aún.</Text>
                ) : (
                  reviews.map((r) => (
                    <View key={r.id} style={styles.reviewCard}>
                      <View style={styles.reviewTop}>
                        <View style={styles.ratingBadge}>
                          <Text style={styles.ratingText}>★ {r.calificacion}</Text>
                        </View>
                        <Text style={styles.reviewDate}>
                          {new Date(r.created_at).toLocaleDateString()}
                        </Text>
                      </View>
                      <Text style={styles.reviewAuthor}>
                        {r.usuario?.nombre || "Usuario"}
                      </Text>
                      <Text style={styles.reviewNote}>{r.nota}</Text>
                    </View>
                  ))
                )}

                {/* AGREGAR RESEÑA */}
                <View style={styles.addReviewBox}>
                  <Text style={styles.addReviewTitle}>Agregar reseña</Text>

                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <TouchableOpacity key={star} onPress={() => setNewReviewRating(star)}>
                        <Text
                          style={[
                            styles.star,
                            { color: star <= newReviewRating ? "#D6A154" : "#CFC6BF" },
                          ]}
                        >
                          ★
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <TextInput
                    style={styles.reviewInput}
                    placeholder="Escribe tu opinión..."
                    placeholderTextColor={TEXT_MUTED}
                    value={newReviewNote}
                    onChangeText={setNewReviewNote}
                    multiline
                  />

                  <TouchableOpacity style={styles.submitReviewBtn} onPress={submitReview}>
                    <Text style={styles.submitReviewText}>Enviar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <Text style={{ textAlign: "center", marginTop: 40, color: TEXT_MUTED }}>
              Producto no encontrado
            </Text>
          )}

          <View style={{ height: 110 }} />
        </ScrollView>
      </View>

      {/* MODAL LISTAS (misma funcionalidad, UI más clean) */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona una lista</Text>

            <FlatList
              data={lists}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => addToList(item.id)}>
                  <Text style={styles.modalItemText}>{item.nombre}</Text>
                  <Ionicons name="chevron-forward" size={18} color={TEXT_MUTED} />
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* TABBAR (igual que original) */}
      <View style={styles.tabbar}>
        <Link href="/home" asChild>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="home-outline" size={22} color="#fff" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/buscar" asChild>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="search" size={22} color="#fff" />
            <Text style={[styles.tabLabel, styles.activeText]}>Buscar</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/listas" asChild>
          <TouchableOpacity style={styles.tabItem}>
            <AntDesign name="heart" size={22} color="#fff" />
            <Text style={styles.tabLabel}>Listas</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/perfil" asChild>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="person-outline" size={22} color="#fff" />
            <Text style={styles.tabLabel}>Perfil</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView >
  );
}

/* ---------- Componentitos UI (solo presentación) ---------- */
function OutlineBtn({ label }: { label: string }) {
  return (
    <TouchableOpacity style={styles.outlineBtn} activeOpacity={0.85}>
      <Text style={styles.outlineBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

/* ---------- Estilos (del segundo diseño) ---------- */
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BACKGROUND },
  container: { flex: 1, backgroundColor: BACKGROUND, paddingBottom: 80 },

  /* HEADER */
  headerBar: {
    height: 64,
    backgroundColor: HEADER_BG,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerSide: { width: 44, alignItems: "flex-start", justifyContent: "center" },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    letterSpacing: 5,
    color: TEXT_MAIN,
    fontWeight: "600",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 120,
  },

  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: TEXT_MAIN,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 13,
    color: TEXT_MUTED,
    marginBottom: 16,
  },

  imagePlaceholder: {
    height: 180,
    borderRadius: 18,
    backgroundColor: "#F3F0ED",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  placeholderText: { fontSize: 12, color: TEXT_MUTED },

  card: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  title: { fontSize: 17, fontWeight: "700", color: TEXT_MAIN, marginBottom: 4 },
  sub: { fontSize: 13, color: TEXT_MUTED, marginBottom: 6 },
  smallMuted: { fontSize: 11, color: "#A3A3A3", marginBottom: 10 },

  scoreRow: {
    backgroundColor: "#F6F4F1",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scoreLeft: { fontSize: 13, color: "#6E6E6E" },
  scoreRight: { fontSize: 15, fontWeight: "700", color: "#4F4F4F" },

  /* “FAVORITOS” */
  favoriteCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  favoriteTitle: { fontSize: 14, fontWeight: "600", color: TEXT_MAIN, marginBottom: 4 },
  favoriteSubtitle: { fontSize: 12, color: TEXT_MUTED },
  favoriteButton: {
    backgroundColor: TAUPE,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  favoriteButtonText: { fontSize: 12, fontWeight: "600", color: "#FFFFFF" },

  /* Tabs visuals */
  tabButtons: { flexDirection: "row", gap: 10, marginBottom: 14 },
  outlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E4DED7",
    borderRadius: 999,
    paddingVertical: 9,
    alignItems: "center",
    backgroundColor: "#FBF8F5",
  },
  outlineBtnText: { fontSize: 13, color: "#6E6159" },

  sectionTitle: { fontSize: 15, fontWeight: "600", color: TEXT_MAIN, marginBottom: 8 },
  bodyText: { marginTop: 2, fontSize: 13, color: "#444", lineHeight: 18 },

  /* Reviews */
  emptyText: { color: TEXT_MUTED, marginVertical: 10, fontSize: 13 },
  reviewCard: {
    backgroundColor: "#F3F0ED",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  reviewTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  ratingBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#E2F3E0",
    alignSelf: "flex-start",
  },
  ratingText: { fontSize: 13, fontWeight: "600", color: "#3A7C3C" },
  reviewDate: { fontSize: 11, color: "#999" },
  reviewAuthor: { fontSize: 13, fontWeight: "600", color: TEXT_MAIN, marginBottom: 2 },
  reviewNote: { color: "#444", fontSize: 13, lineHeight: 18 },

  addReviewBox: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#E8E1DB" },
  addReviewTitle: { fontSize: 14, fontWeight: "600", color: TEXT_MAIN, marginBottom: 8 },
  starsRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
  star: { fontSize: 22 },
  reviewInput: {
    borderWidth: 1,
    borderColor: "#E0D6CF",
    backgroundColor: "#FBF8F5",
    borderRadius: 14,
    padding: 12,
    height: 90,
    textAlignVertical: "top",
    marginBottom: 10,
    fontSize: 13,
    color: TEXT_MAIN,
  },
  submitReviewBtn: {
    backgroundColor: TAUPE,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  submitReviewText: { color: "#fff", fontWeight: "600" },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  modalContent: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    maxHeight: "70%",
  },
  modalTitle: { fontSize: 16, fontWeight: "700", color: TEXT_MAIN, marginBottom: 14, textAlign: "center" },
  modalItem: {
    backgroundColor: "#F3F0ED",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalItemText: { fontSize: 14, color: TEXT_MAIN, fontWeight: "600" },
  modalClose: { marginTop: 14, alignItems: "center" },
  modalCloseText: { color: TAUPE, fontSize: 14, fontWeight: "600", textDecorationLine: "underline" },

  /* Tabbar (tu original) */
  tabbar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 10,
    backgroundColor: TAUPE,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
  },
  tabItem: { alignItems: "center", gap: 2, width: 70 },
  tabLabel: { fontFamily: "Montserrat_400Regular", fontSize: 12, color: "#fff" },
  activeText: { fontWeight: "700" },
});
