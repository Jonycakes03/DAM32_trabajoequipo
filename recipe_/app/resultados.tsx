import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const TAUPE = "#5b524b";
const GREEN = "#4CAF50";
const CHIP = "#D8EBD6";
const CHIP_TEXT = "#4A6B46";
const CARD = "#FFFFFF";
const CARD_BORDER = "#E6E6E6";
const HEADER_BG = "#EFEFEF";

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
        image: undefined, // put a URI or require() here if you have assets
      })),
    []
  );

  return (
    <View style={styles.container}>
      {/* thin top gray bar (like your mockups) */}
      <View style={styles.headerStrip} />

      {/* Top Row: Title, Chips and Filter button */}
      <View style={styles.top}>
        <Text style={styles.title}>Resultados</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <FilterChip label="No parabenos" />
          <FilterChip label="No parabenos" />
          <Link href="/filters" asChild>
            <TouchableOpacity style={styles.filterBtn}>
              <Text style={styles.filterBtnText}>Filtro</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      {/* Grid */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 12 }}
        contentContainerStyle={{ paddingBottom: 110, paddingTop: 8, gap: 12 }}
        renderItem={({ item, index }) => (
          <ProductCard
            product={item}
            highlight={index === 0} // left-top card with blue outline like the mock
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Tabbar */}
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
        <Link href="/pefil" asChild>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="person-outline" size={22} color="#fff" />
            <Text style={styles.tabLabel}>Perfil</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

function FilterChip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipText}>{label}</Text>
      <Text style={styles.chipX}>  ×</Text>
    </View>
  );
}

function ProductCard({ product, highlight }: { product: Product; highlight?: boolean }) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.card, highlight && styles.cardHighlight]}>
      {/* Image area */}
      <View style={[styles.imageBox, highlight && styles.imageHighlight]}>
        {product.image ? (
          <Image
            source={{ uri: product.image }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        ) : null}
      </View>

      {/* Safety badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Seguridad: {product.safety}</Text>
      </View>

      {/* Brand + name */}
      <View style={{ paddingHorizontal: 10, paddingTop: 8, paddingBottom: 12 }}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text numberOfLines={2} style={styles.productName}>
          {product.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerStrip: { height: 16, backgroundColor: HEADER_BG },
  top: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 6,
    gap: 8,
  },
  title: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: "#1A1A1A",
    marginBottom: 8,
  },

  chip: {
    backgroundColor: CHIP,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  chipText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 12,
    color: CHIP_TEXT,
  },
  chipX: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 12,
    color: CHIP_TEXT,
  },

  filterBtn: {
    backgroundColor: CHIP,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  filterBtnText: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 12,
    color: CHIP_TEXT,
  },

  card: {
    flex: 1,
    backgroundColor: CARD,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardHighlight: {
    shadowOpacity: 0.14,
    elevation: 5,
  },

  imageBox: {
    height: 140,
    backgroundColor: "#F6F6F6",
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
    left: 10,
    top: 120,
    backgroundColor: GREEN,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontFamily: "Montserrat_700Bold",
  },

  brand: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 12,
    color: "#777",
    marginBottom: 2,
  },
  productName: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
    color: "#1F1F1F",
    lineHeight: 18,
  },

  /* Tab bar */
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
