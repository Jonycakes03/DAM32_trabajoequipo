import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ListsScreen() {
  const [name, setName] = useState("Value");
  const [items, setItems] = useState([
    { id: "1", title: "Head & Shoulders", desc: "Descripción" },
    { id: "2", title: "Herbal Essences", desc: "Descripción" },
    { id: "3", title: "Old Spice", desc: "Descripción" },
  ]);

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const addItem = () => {
    if (!name.trim()) return;
    setItems(prev => [{ id: Date.now().toString(), title: name.trim(), desc: "Descripción" }, ...prev]);
    setName("");
  };

  return (
    <View style={styles.container}>
      {}
      <View style={styles.metaRow}>
        <Text style={styles.metaBrand}>CLEARLABEL</Text>
        <Ionicons name="mail-outline" size={18} color="#111" />
      </View>

      {}
      <View style={styles.headerRow}>
        <Link href="/home" asChild>
          <TouchableOpacity style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="#111" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>Shampoo</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {}
        {items.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#111" />
            </TouchableOpacity>
          </View>
        ))}

        {}
        <View style={{ marginTop: 8 }}>
          <Text style={styles.inputLabel}>Nombre</Text>
          <View style={styles.addRow}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Nombre"
              style={styles.input}
              placeholderTextColor="#7a7a7a"
            />
            <TouchableOpacity style={styles.addBtn} onPress={addItem}>
              <Text style={styles.addText}>Agregar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {}
      <View style={styles.tabbar}>
        <Link href="/home" asChild>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="home-outline" size={22} color="#fff" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/search" asChild>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="search-outline" size={22} color="#fff" />
            <Text style={styles.tabLabel}>Buscar</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/lists" asChild>
          <TouchableOpacity style={styles.tabItem}>
            {/* Corazón RELLENO para indicar tab activo */}
            <Ionicons name="heart" size={22} color="#fff" />
            <Text style={styles.tabLabel}>Listas</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/profile" asChild>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="person-outline" size={22} color="#fff" />
            <Text style={styles.tabLabel}>Perfil</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const TAUPE = "#5b524b";
const LIGHT_CARD = "#F0EFEF";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  metaRow: {
    paddingHorizontal: 16,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaBrand: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 10,
    letterSpacing: 1,
    color: "#111",
  },

 
  headerRow: {
    marginTop: 6,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 18,
    color: "#222",
  },
  cardDesc: {
    marginTop: 4,
    fontFamily: "Montserrat_400Regular",
    fontSize: 13,
    color: "#6a6a6a",
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFEFEF",
  },


  inputLabel: {
    marginTop: 18,
    marginBottom: 8,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
    color: "#333",
  },
  addRow: { flexDirection: "row", gap: 10, alignItems: "center" },
  input: {
    flex: 1,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D7D7D7",
    paddingHorizontal: 12,
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    color: "#111",
    backgroundColor: "#fff",
  },
  addBtn: {
    paddingHorizontal: 18,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#6B655E",
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    fontFamily: "Montserrat_600SemiBold",
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
