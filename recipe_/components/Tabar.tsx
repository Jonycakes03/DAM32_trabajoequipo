// components/TabBar.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const TAUPE = "#5b524b";

type TabKey = "home" | "search" | "lists" | "profile";

export default function TabBar({ active }: { active: TabKey }) {
  const is = (k: TabKey) => active === k;

  return (
    <View style={styles.tabbar}>
      <Link href="/home" asChild>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name={is("home") ? "home" : "home-outline"} size={22} color="#fff" />
          <Text style={[styles.tabLabel, is("home") && styles.activeText]}>Home</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/search" asChild>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name={is("search") ? "search" : "search-outline"} size={22} color="#fff" />
          <Text style={[styles.tabLabel, is("search") && styles.activeText]}>Buscar</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/lists" asChild>
        <TouchableOpacity style={styles.tabItem}>
          <AntDesign name={is("lists") ? "heart" : "heart"} size={22} color="#fff" />
          <Text style={[styles.tabLabel, is("lists") && styles.activeText]}>Listas</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/profile" asChild>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name={is("profile") ? "person" : "person-outline"} size={22} color="#fff" />
          <Text style={[styles.tabLabel, is("profile") && styles.activeText]}>Perfil</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
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
