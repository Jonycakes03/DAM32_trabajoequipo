// app/resultados.tsx (o como se llame tu ruta)
import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";

/* PALETA CLEARLABEL */
const TAUPE = "#5B524B";
const BACKGROUND = "#FFFFFF";
const HEADER_BG = "#F5F1ED";
const CHIP = "#D8EBD6";
const CHIP_TEXT = "#4A6B46";
const CARD = "#FFFFFF";
const CARD_BORDER = "#E6E6E6";
const GREEN = "#4CAF50";

type Product = {
  id: string;
  brand: string;
  name: string;
  safety: string; // e.g. "97/100"
  image?: string;
};

export default function ResultsScreen() {
  const products: Product[] = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        id: String(i + 1),
        brand: "Cerave",
        name: "Hydrating Cleanser",
        safety: "97/100",
        image: undefined,
      })),
    []
  );

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

        {/* CONTENIDO */}
        <View style={styles.top}>
          <Text style={styles.pageTitle}>Resultados</Text>
          <Text style={styles.pageSubtitle}>
            Estos son los productos que cumplen con tus filtros seleccionados.
          </Text>

          <View style={styles.filtersRow}>
            <FilterChip label="No parabenos" />
            <FilterChip label="No parabenos" />
            <Link href="/filters" asChild>
              <TouchableOpacity style={styles.filterBtn}>
                <Text style={styles.filterBtnText}>Filtro</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* GRID */}
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <ProductCard product={item} highlight={index === 0} />
          )}
        />
      </View>

      {/* TABBAR INFERIOR */}
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

/* --------- COMPONENTES PEQUEÑOS --------- */

function FilterChip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
      <Text style={styles.chipX}>×</Text>
    </View>
  );
}

function ProductCard({
  product,
  highlight,
}: {
  product: Product;
  highlight?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.card, highlight && styles.cardHighlight]}
    >
      {/* Imagen / placeholder */}
      <View style={[styles.imageBox, highlight && styles.imageHighlight]}>
        {product.image ? (
          <Image
            source={{ uri: product.image }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        ) : null}
      </View>

      {/* Badge de seguridad */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Seguridad: {product.safety}</Text>
      </View>

      {/* Marca + nombre */}
      <View style={styles.cardText}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text numberOfLines={2} style={styles.productName}>
          {product.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

/* --------- ESTILOS --------- */

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

  /* HEADER CLEARLABEL */
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
    color: "#3B302A",
    fontWeight: "600",
  },
  brandBox: {
    width: 30,
    height: 24,
    borderWidth: 2,
    borderColor: "#3B302A",
    alignItems: "center",
    justifyContent: "center",
  },
  brandCheck: {
    fontSize: 14,
    color: "#3B302A",
    lineHeight: 14,
  },

  /* CONTENIDO SUPERIOR */
  top: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3B302A",
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 13,
    color: "#8A7C73",
    marginBottom: 10,
  },
  filtersRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },

  chip: {
    backgroundColor: CHIP,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  chipText: {
    fontSize: 12,
    color: CHIP_TEXT,
    fontWeight: "600",
  },
  chipX: {
    fontSize: 12,
    color: CHIP_TEXT,
    fontWeight: "600",
  },

  filterBtn: {
    backgroundColor: CHIP,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
  },
  filterBtnText: {
    fontSize: 12,
    color: CHIP_TEXT,
    fontWeight: "600",
  },

  /* GRID */
  columnWrapper: {
    gap: 12,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 120,
    rowGap: 12,
  },

  card: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardHighlight: {
    shadowOpacity: 0.12,
    elevation: 5,
  },

  imageBox: {
    height: 140,
    backgroundColor: "#F6F4F1",
    borderBottomWidth: 1,
    borderBottomColor: CARD_BORDER,
  },
  imageHighlight: {
    borderWidth: 2,
    borderColor: "#3B82F6",
    margin: 6,
    borderRadius: 10,
    height: 128,
  },

  badge: {
    position: "absolute",
    left: 12,
    top: 118,
    backgroundColor: GREEN,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },

  cardText: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
  },
  brand: {
    fontSize: 12,
    color: "#777777",
    fontWeight: "600",
    marginBottom: 2,
  },
  productName: {
    fontSize: 14,
    color: "#1F1F1F",
    fontWeight: "600",
    lineHeight: 18,
  },

  /* TABBAR */
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
