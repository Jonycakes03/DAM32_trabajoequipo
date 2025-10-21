import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Link } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const TAUPE = "#5b524b";

export default function ListsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus listas favoritas</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Shampoo</Text>
        <Text style={styles.cardDesc}>Descripción</Text>
        <AntDesign name="close" size={18} color="#000" style={styles.cardClose} />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Gel</Text>
        <Text style={styles.cardDesc}>Descripción</Text>
        <AntDesign name="close" size={18} color="#000" style={styles.cardClose} />
      </View>

      {/* Campo para crear lista */}
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Nombre</Text>
        <TextInput style={styles.input} placeholder="Value" />
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Crear Lista</Text>
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
    marginTop: 20,
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
