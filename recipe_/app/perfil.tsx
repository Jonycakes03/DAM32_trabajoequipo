import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const TAUPE = "#5b524b";
const AVATAR = "#B7A9AB";

export default function ProfileScreen() {
  const onSignOut = () => {
    console.log("Cerrar sesión");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerSpacer} />

      {/* Perfil */}
      <View style={styles.headerRow}>
        <View style={styles.avatar} />
        <Text style={styles.name}>Johnatan Suarez</Text>
      </View>

      {/* Opciones */}
      <View style={styles.menu}>
        <MenuItem label="Ajustes" href="/settings" />
        <MenuItem label="Historial" href="/history" />
        <MenuItem label="Reestablecer contraseña" href="/reset-password" />
        <MenuItem label="Preferencias" href="/preferences" />
        <MenuItem label="Reseñas" href="/reviews" />
        <TouchableOpacity onPress={onSignOut} style={styles.menuRow}>
          <Text style={styles.menuText}>Cerrar sesión</Text>
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
            {/* Corazón solo con contorno */}
            <AntDesign name="heart" size={22} color="#fff" />
            <Text style={styles.tabLabel}>Listas</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/perfil" asChild>
          <TouchableOpacity style={styles.tabItem}>
            {/* Ícono relleno ya que estamos en perfil */}
            <Ionicons name="person" size={22} color="#fff" />
            <Text style={[styles.tabLabel, { fontWeight: "700" }]}>Perfil</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

function MenuItem({ label, href }: { label: string; href: any }) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.menuRow}>
        <Text style={styles.menuText}>{label}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerSpacer: { height: 16, backgroundColor: "#EFEFEF" },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 18,
    paddingVertical: 20,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: AVATAR,
  },
  name: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 18,
    color: "#6B6B6B",
  },

  menu: { paddingHorizontal: 24, gap: 18, marginTop: 10 },
  menuRow: { paddingVertical: 6 },
  menuText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 16,
    color: "#6B6B6B",
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
