// app/product/[id].tsx  (o donde prefieras)
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const TAUPE = "#5b524b";

const product = {
  name: "Limpiador Facial",
  brand: "Cerave",
  avgRating: 4.2,
  reviewsCount: 324,
  score: 8.5, // de 10
  info: {
    skinType: "Todo tipo",
    fragrance: "Fragrance-Free",
    spf: "No",
    crueltyFree: "Sí",
  },
  mainIngredients: [
    { name: "Hyaluronic Acid", status: "Seguro" },
    { name: "Glycerin", status: "Seguro" },
    { name: "Cetyl Alcohol", status: "Moderado" },
  ],
};

export default function ProductScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.header}>Producto</Text>
        <View style={styles.separator} />

        {/* Placeholder de imagen */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>Sin imagen</Text>
        </View>

        {/* Card principal con nombre/marca y rating */}
        <View style={styles.card}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.sub}>Marca: {product.brand}</Text>

          <Text style={styles.smallMuted}>
            {product.avgRating} ({product.reviewsCount} reseñas)
          </Text>

          <View style={styles.scoreRow}>
            <Text style={styles.scoreLeft}>Valoración</Text>
            <Text style={styles.scoreRight}>{product.score}/10</Text>
          </View>
        </View>

        {/* Botones tipo tabs */}
        <View style={styles.tabButtons}>
          <OutlineBtn label="Ingredientes" />
          <OutlineBtn label="Reseñas" />
          <OutlineBtn label="Alertas" />
        </View>

        {/* Información */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Información</Text>
          <InfoRow label="Tipo de piel" value={product.info.skinType} />
          <InfoRow label="Fragancia" value={product.info.fragrance} />
          <InfoRow label="SPF" value={product.info.spf} />
          <InfoRow label="Cruelty-Free" value={product.info.crueltyFree} />
        </View>

        {/* Ingredientes principales */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.sectionTitle}>Ingredientes principales</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          {product.mainIngredients.map((ing, idx) => (
            <View key={idx} style={styles.ingredientRow}>
              <Text style={styles.ingredientName}>{ing.name}</Text>
              <Badge status={ing.status} />
            </View>
          ))}
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Tabbar (Search activo) */}
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

/* ---------- Componentes UI pequeños ---------- */
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function OutlineBtn({ label }: { label: string }) {
  return (
    <TouchableOpacity style={styles.outlineBtn}>
      <Text style={styles.outlineBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

function Badge({ status }: { status: "Seguro" | "Moderado" | string }) {
  const isSafe = status.toLowerCase() === "seguro";
  const isModerate = status.toLowerCase() === "moderado";
  return (
    <View
      style={[
        styles.badge,
        isSafe && styles.badgeSafe,
        isModerate && styles.badgeModerate,
      ]}
    >
      <Text style={styles.badgeText}>{status}</Text>
    </View>
  );
}

/* ---------- Estilos ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 16, paddingBottom: 0 },

  header: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 18,
    color: "#6B6B6B",
    textAlign: "center",
    marginTop: 4,
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

  scoreRow: {
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreLeft: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 13,
    color: "#6E6E6E",
  },
  scoreRight: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 14,
    color: "#555",
  },

  tabButtons: {
    flexDirection: "row",
    gap: 10,
    marginHorizontal: 4,
    marginBottom: 12,
  },
  outlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  outlineBtnText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 13,
    color: "#6E6E6E",
  },

  sectionTitle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 15,
    color: "#333",
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  infoLabel: {
    fontFamily: "Montserrat_500Medium",
    color: "#6E6E6E",
    fontSize: 13,
  },
  infoValue: {
    fontFamily: "Montserrat_600SemiBold",
    color: "#5B5B5B",
    fontSize: 13,
  },

  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  linkText: {
    fontFamily: "Montserrat_500Medium",
    color: "#9A8F86",
    fontSize: 12,
  },

  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  ingredientName: {
    fontFamily: "Montserrat_500Medium",
    color: "#444",
    fontSize: 13,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 11,
    color: "#fff",
  },
  badgeSafe: { backgroundColor: "#6BB36B" },
  badgeModerate: { backgroundColor: "#D6A154" },

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
