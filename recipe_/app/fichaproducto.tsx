// app/product/[id].tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const TAUPE = "#5B524B";
const BACKGROUND = "#FFFFFF";
const HEADER_BG = "#F5F1ED";
const CARD_BG = "#FFFFFF";
const TEXT_MAIN = "#3B302A";
const TEXT_MUTED = "#8A7C73";

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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER CON LOGO */}
        <View style={styles.headerBar}>
          <View style={styles.headerSide}>
            <View style={styles.brandBox}>
              <Text style={styles.brandCheck}>✓</Text>
            </View>
          </View>

          <Text style={styles.headerTitle}>CLEARLABEL</Text>

          <View style={styles.headerSide} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* TITULO DE SECCIÓN */}
          <Text style={styles.pageTitle}>Detalle de producto</Text>
          <Text style={styles.pageSubtitle}>
            Revisa la seguridad, ingredientes y detalles clave de este producto.
          </Text>

          {/* PLACEHOLDER DE IMAGEN */}
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Sin imagen</Text>
          </View>

          {/* CARD PRINCIPAL: NOMBRE + VALORACIÓN */}
          <View style={styles.card}>
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.sub}>Marca: {product.brand}</Text>

            <Text style={styles.smallMuted}>
              {product.avgRating} ({product.reviewsCount} reseñas)
            </Text>

            <View style={styles.scoreRow}>
              <Text style={styles.scoreLeft}>Valoración general</Text>
              <Text style={styles.scoreRight}>{product.score}/10</Text>
            </View>
          </View>

          {/* CARD FAVORITOS */}
          <View style={styles.favoriteCard}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <Text style={styles.favoriteTitle}>Añadir a favoritos</Text>
              <Text style={styles.favoriteSubtitle}>
                Guarda este producto en tus listas para revisarlo después.
              </Text>
            </View>

            <TouchableOpacity style={styles.favoriteButton}>
              <AntDesign name="heart" size={16} color="#fff" />
              <Text style={styles.favoriteButtonText}>Añadir</Text>
            </TouchableOpacity>
          </View>

          {/* TABS (INGREDIENTES / RESEÑAS / ALERTAS) */}
          <View style={styles.tabButtons}>
            <OutlineBtn label="Ingredientes" />
            <OutlineBtn label="Reseñas" />
            <OutlineBtn label="Alertas" />
          </View>

          {/* INFORMACIÓN GENERAL */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Información</Text>
            <InfoRow label="Tipo de piel" value={product.info.skinType} />
            <InfoRow label="Fragancia" value={product.info.fragrance} />
            <InfoRow label="SPF" value={product.info.spf} />
            <InfoRow label="Cruelty-Free" value={product.info.crueltyFree} />
          </View>

          {/* INGREDIENTES PRINCIPALES */}
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
      </View>

      {/* TABBAR INFERIOR (Mismo estilo que Home / Buscar) */}
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
    </SafeAreaView>
  );
}

/* ---------- COMPONENTES PEQUEÑOS ---------- */
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

/* ---------- ESTILOS ---------- */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
    paddingBottom: 80,
  },

  /* HEADER CON LOGO */
  headerBar: {
    height: 64,
    backgroundColor: HEADER_BG,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerSide: {
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    letterSpacing: 5,
    color: TEXT_MAIN,
    fontWeight: "600",
  },
  brandBox: {
    width: 30,
    height: 24,
    borderWidth: 2,
    borderColor: TEXT_MAIN,
    alignItems: "center",
    justifyContent: "center",
  },
  brandCheck: {
    fontSize: 14,
    color: TEXT_MAIN,
    lineHeight: 14,
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
  },
  placeholderText: {
    fontSize: 12,
    color: TEXT_MUTED,
  },

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

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: TEXT_MAIN,
    marginBottom: 4,
  },
  sub: {
    fontSize: 13,
    color: TEXT_MUTED,
    marginBottom: 6,
  },
  smallMuted: {
    fontSize: 11,
    color: "#A3A3A3",
    marginBottom: 10,
  },

  scoreRow: {
    backgroundColor: "#F6F4F1",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scoreLeft: {
    fontSize: 13,
    color: "#6E6E6E",
  },
  scoreRight: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4F4F4F",
  },

  /* FAVORITOS */
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
  favoriteTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: TEXT_MAIN,
    marginBottom: 4,
  },
  favoriteSubtitle: {
    fontSize: 12,
    color: TEXT_MUTED,
  },
  favoriteButton: {
    backgroundColor: TAUPE,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  favoriteButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  /* TABS */
  tabButtons: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  outlineBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E4DED7",
    borderRadius: 999,
    paddingVertical: 9,
    alignItems: "center",
    backgroundColor: "#FBF8F5",
  },
  outlineBtnText: {
    fontSize: 13,
    color: "#6E6159",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: TEXT_MAIN,
    marginBottom: 8,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 13,
    color: "#6E6E6E",
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#5B5B5B",
  },

  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  linkText: {
    fontSize: 12,
    color: "#9A8F86",
  },

  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  ingredientName: {
    fontSize: 13,
    color: "#444444",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  badgeSafe: {
    backgroundColor: "#6BB36B",
  },
  badgeModerate: {
    backgroundColor: "#D6A154",
  },

  /* TABBAR INFERIOR */
  tabbar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 10,
    backgroundColor: TAUPE,
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
  },
  tabItem: {
    alignItems: "center",
    gap: 2,
    width: 70,
  },
  tabLabel: {
    fontSize: 12,
    color: "#FFFFFF",
  },
});
