import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert, ActivityIndicator } from "react-native";
import { Link, router } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { supabase } from "../utils/supabase";

const TAUPE = "#5b524b";

type Lista = {
  id: string;
  nombre: string;
  created_at: string;
};

export default function ListsScreen() {
  const [lists, setLists] = useState<Lista[]>([]);
  const [newListName, setNewListName] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchLists();
  }, []);

  async function fetchLists() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("Listas")
      .select("*")
      .eq("usuario_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setLists(data || []);
    }
    setLoading(false);
  }

  async function createList() {
    if (!newListName.trim()) return;
    setCreating(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      Alert.alert("Error", "Debes iniciar sesión");
      setCreating(false);
      return;
    }

    const { data, error } = await supabase
      .from("Listas")
      .insert([{ nombre: newListName, usuario_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error("Error creating list:", error);
      Alert.alert("Error al crear lista", error.message + "\nCode: " + error.code);
    } else if (data) {
      console.log("List created:", data);
      setLists([data, ...lists]);
      setNewListName("");
    }
    setCreating(false);
  }

  async function deleteList(id: string) {
    const { error } = await supabase.from("Listas").delete().eq("id", id);
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setLists(lists.filter((l) => l.id !== id));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus listas favoritas</Text>

      {loading ? (
        <ActivityIndicator size="large" color={TAUPE} />
      ) : (
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <Link href={{ pathname: "/listas_2", params: { id: item.id, nombre: item.nombre } }} asChild>
              <TouchableOpacity style={styles.card}>
                <Text style={styles.cardTitle}>{item.nombre}</Text>
                <Text style={styles.cardDesc}>Creada el {new Date(item.created_at).toLocaleDateString()}</Text>
                <TouchableOpacity
                  style={styles.cardClose}
                  onPress={(e) => {
                    e.stopPropagation(); // Prevent navigation when clicking delete
                    Alert.alert("Eliminar lista", "¿Estás seguro?", [
                      { text: "Cancelar", style: "cancel" },
                      { text: "Eliminar", style: "destructive", onPress: () => deleteList(item.id) },
                    ]);
                  }}
                >
                  <AntDesign name="close" size={18} color="#000" />
                </TouchableOpacity>
              </TouchableOpacity>
            </Link>
          )}
          ListEmptyComponent={<Text style={{ textAlign: "center", color: "#999", marginTop: 20 }}>No tienes listas aún.</Text>}
        />
      )}

      {/* Campo para crear lista */}
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nueva lista..."
          value={newListName}
          onChangeText={setNewListName}
        />
        <TouchableOpacity style={styles.createButton} onPress={createList} disabled={creating}>
          {creating ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.createButtonText}>Crear Lista</Text>
          )}
        </TouchableOpacity>
      </View>

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
            <Ionicons name="search-outline" size={22} color="#fff" />
            <Text style={styles.tabLabel}>Buscar</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/listas" asChild>
          <TouchableOpacity style={styles.tabItem}>
            {/* Corazón relleno porque estamos en esta pantalla */}
            <AntDesign name="heart" size={22} color="#fff" />
            <Text style={[styles.tabLabel, { fontWeight: "700" }]}>Listas</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 40 },
  title: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    color: "#6B6B6B",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    position: "relative",
  },
  cardTitle: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
    color: "#333",
  },
  cardDesc: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    color: "#777",
  },
  cardClose: {
    position: "absolute",
    right: 12,
    top: 12,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 80, // Add space for tabbar
    gap: 8,
  },
  inputLabel: {
    fontFamily: "Montserrat_500Medium",
    color: "#6B6B6B",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 36,
  },
  createButton: {
    backgroundColor: TAUPE,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  createButtonText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 14,
    color: "#fff",
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
  tabLabel: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 12,
    color: "#fff",
  },
});
