// app/product/[id].tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, FlatList, Alert, TextInput, ActivityIndicator } from "react-native";
import { Link, useLocalSearchParams, router } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { supabase } from "../utils/supabase";

const TAUPE = "#5b524b";

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
  usuario_id: string; // In real app, join with Usuarios to get name
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
    const { data, error } = await supabase
      .from("Productos")
      .select("id, nombre, marca, imagen, valoracion, ingredientes, informacion")
      .eq("id", id)
      .single();

    if (data) setProduct(data as Producto);
    setLoading(false);
  }

  async function fetchReviews() {
    const { data, error } = await supabase
      .from("Resenas")
      .select("*")
      .eq("producto", id);

    if (data) setReviews(data as Resena[]);
  }

  async function fetchLists() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      Alert.alert("Error", "Inicia sesión para guardar en listas");
      return;
    }

    const { data, error } = await supabase
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
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      Alert.alert("Error", "Inicia sesión para dejar una reseña");
      return;
    }

    const { error } = await supabase
      .from("Resenas")
      .insert([
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
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Producto</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {loading ? (
          <ActivityIndicator size="large" color={TAUPE} style={{ marginTop: 50 }} />
        ) : product ? (
          <>
            {/* Image */}
            <View style={styles.imagePlaceholder}>
              {product?.imagen ? (
                <Image source={{ uri: product.imagen }} style={{ width: "100%", height: "100%", borderRadius: 12 }} resizeMode="cover" />
              ) : (
                <Text style={styles.placeholderText}>Sin imagen</Text>
              )}
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>{product.nombre}</Text>
              <Text style={styles.sub}>Marca: {product.marca}</Text>
              {product.valoracion !== undefined && (
                <Text style={styles.smallMuted}>Valoración: {product.valoracion}</Text>
              )}

              <TouchableOpacity style={styles.addToListBtn} onPress={fetchLists}>
                <AntDesign name="plus" size={16} color="#fff" />
                <Text style={styles.addToListText}>Agregar a Lista</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Ingredientes</Text>
              <Text style={{ marginTop: 8 }}>{product.ingredientes}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Información</Text>
              <Text style={{ marginTop: 8 }}>{product.informacion}</Text>
            </View>

            {/* Reviews Section */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Reseñas</Text>
              {reviews.length === 0 ? (
                <Text style={{ color: "#999", marginVertical: 10 }}>No hay reseñas aún.</Text>
              ) : (
                reviews.map((r) => (
                  <View key={r.id} style={styles.reviewItem}>
                    <Text style={styles.reviewRating}>★ {r.calificacion}</Text>
                    <Text style={styles.reviewNote}>{r.nota}</Text>
                  </View>
                ))
              )}

              <View style={styles.addReviewBox}>
                <Text style={styles.addReviewTitle}>Agregar Reseña</Text>
                <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setNewReviewRating(star)}>
                      <Text style={{ fontSize: 24, color: star <= newReviewRating ? "#FFD700" : "#ccc" }}>★</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TextInput
                  style={styles.reviewInput}
                  placeholder="Escribe tu opinión..."
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
          <Text style={{ textAlign: "center", marginTop: 40 }}>Producto no encontrado</Text>
        )}

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Modal for Lists */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona una lista</Text>
            <FlatList
              data={lists}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => addToList(item.id)}>
                  <Text style={styles.modalItemText}>{item.nombre}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Tabbar */}
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
    </View>
  );
}

/* ---------- Estilos ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 16, paddingBottom: 0 },

  headerRow: {
    marginTop: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  backBtn: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    color: "#555",
    textAlign: "center",
  },

  separator: {
    height: 1,
    backgroundColor: "#EAEAEA",
    marginTop: 8,
    marginBottom: 12,
  },

  imagePlaceholder: {
    height: 160,
    borderRadius: 12,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    marginBottom: 12,
  },
  placeholderText: {
    fontFamily: "Montserrat_400Regular",
    color: "#B0B0B0",
    fontSize: 12,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 4,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  title: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 2,
  },
  sub: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 13,
    color: "#7C7C7C",
    marginBottom: 8,
  },
  smallMuted: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 11,
    color: "#9E9E9E",
    marginBottom: 10,
  },

  addToListBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: TAUPE,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    marginTop: 6,
  },
  addToListText: {
    color: "#fff",
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
  },

  sectionTitle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 15,
    color: "#333",
    marginBottom: 10,
  },

  // Reviews
  reviewItem: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  reviewRating: {
    color: "#FFD700",
    fontWeight: "bold",
    marginBottom: 4,
  },
  reviewNote: {
    color: "#444",
    fontSize: 13,
  },
  addReviewBox: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  addReviewTitle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
    marginBottom: 8,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    height: 80,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  submitReviewBtn: {
    backgroundColor: "#333",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  submitReviewText: {
    color: "#fff",
    fontWeight: "600",
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    maxHeight: "60%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalItemText: {
    fontSize: 16,
  },
  modalClose: {
    marginTop: 16,
    alignItems: "center",
  },
  modalCloseText: {
    color: "red",
    fontSize: 16,
  },

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
