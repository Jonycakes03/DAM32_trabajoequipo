import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../utils/supabase";

const TAUPE = "#5b524b";
const CARD_BG = "#f7f5f3";
const AVATAR = "#B7A9AB";

const Row = ({
  icon,
  label,
  href,
  rightText,
  onPress,
  loading,
}: {
  icon: any;
  label: string;
  href?: any;
  rightText?: string;
  onPress?: () => void;
  loading?: boolean;
}) => {
  const content = (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <Ionicons
          name={icon}
          size={18}
          color={TAUPE}
          style={{ marginRight: 8 }}
        />
        <Text style={styles.rowText}>{label}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="small" color={TAUPE} />
      ) : rightText ? (
        <Text style={styles.rowRightText}>{rightText}</Text>
      ) : (
        <Ionicons name="chevron-forward" size={18} color={TAUPE} />
      )}
    </View>
  );

  if (href) {
    return (
      <Link href={href} asChild>
        <TouchableOpacity>{content}</TouchableOpacity>
      </Link>
    );
  }

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
  }

  return <View>{content}</View>;
};

export default function ProfileScreen() {
  const [name, setName] = useState("Usuario");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    console.log("Fetching profile...");
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("User:", user?.id);

    if (user) {
      const { data, error } = await supabase
        .from("Usuarios")
        .select("nombre")
        .eq("id", user.id)
        .single();

      console.log("Profile Data:", data);
      console.log("Profile Error:", error);

      if (data) {
        setName(data.nombre || "Usuario (Sin nombre)");
      } else {
        console.log("No profile found for user");
      }
    } else {
      console.log("No user logged in");
    }
    setLoading(false);
  }

  const onSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      router.replace("/login");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header ClearLabel (UI del 2do) */}
      <View style={styles.header}>
        <Text style={styles.brand}>CLEARLABEL</Text>
        <Ionicons name="mail-outline" size={20} color={TAUPE} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Título */}
        <Text style={styles.title}>Perfil</Text>

        {/* Banner (UI del 2do) */}
        <View style={styles.banner}>
          <View style={styles.bannerTop}>
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
              {loading ? (
                <ActivityIndicator size="small" color={TAUPE} />
              ) : (
                <Text style={styles.bannerName}>{name}</Text>
              )}
              <Text style={styles.bannerText}>
                Administra tus preferencias y tu cuenta en ClearLabel.
              </Text>
            </View>
          </View>
        </View>

        {/* Card: opciones (mismas rutas del original) */}
        <View style={styles.card}>
          <Row icon="settings-outline" label="Ajustes" href="/settings" />
          <View style={styles.divider} />
          <Row
            icon="lock-closed-outline"
            label="Reestablecer contraseña"
            href="/reset-password"
          />
          <View style={styles.divider} />
          <Row icon="star-outline" label="Mis Reseñas" href="/mis_resenas" />
        </View>

        {/* Card: cerrar sesión (misma acción del original) */}
        <View style={styles.card}>
          <Row
            icon="log-out-outline"
            label="Cerrar sesión"
            onPress={onSignOut}
          />
        </View>

        {/* espacio para que no tape la tabbar */}
        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Tabbar (igual que tu original) */}
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
            <Ionicons name="heart-outline" size={22} color="#fff" />
            <Text style={styles.tabLabel}>Listas</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/perfil" asChild>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="person" size={22} color="#fff" />
            <Text style={[styles.tabLabel, { fontWeight: "700" }]}>Perfil</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },

  /* Header del 2do */
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0eeeb",
  },
  brand: {
    fontSize: 16,
    letterSpacing: 1,
    color: TAUPE,
    fontWeight: "600",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: TAUPE,
    marginBottom: 16,
  },

  /* Banner inspirado en el 2do */
  banner: {
    backgroundColor: "#fbeee3",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  bannerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: AVATAR,
  },
  bannerName: {
    fontSize: 14,
    fontWeight: "700",
    color: TAUPE,
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 12,
    color: "#6a625c",
    lineHeight: 16,
  },

  /* Cards + rows del 2do */
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowText: {
    fontSize: 14,
    color: TAUPE,
  },
  rowRightText: {
    fontSize: 12,
    color: "#6a625c",
  },
  divider: {
    height: 1,
    backgroundColor: "#e2ddd7",
  },

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
  tabLabel: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 12,
    color: "#fff",
  },
});
