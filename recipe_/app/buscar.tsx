// buscar.tsx o SearchScreen.tsx
import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Link } from "expo-router";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";

/* ---------- Tipado ---------- */
type SearchItem = {
  id: string;
  name: string;
  scannedAgo: string;
  rating: number;
};

export default function SearchScreen() {
  // ✅ useMemo correcto, sin cosas raras encima
  const data = useMemo<SearchItem[]>(
    () =>
      Array.from({ length: 3 }).map((_, i) => ({
        id: String(i + 1),
        name: "CeraVe Moisturizer",
        scannedAgo: "Scanned 2 hours ago",
        rating: 4.5,
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
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              <Text style={styles.pageTitle}>Buscar</Text>
              <Text style={styles.pageSubtitle}>
                Encuentra productos por nombre o escaneando su código de barras.
              </Text>

              {/* BUSCADOR */}
              <View style={styles.searchWrapper}>
                <Feather
                  name="search"
                  size={18}
                  color={TEXT_MUTED}
                  style={{ marginRight: 6 }}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar producto, marca..."
                  placeholderTextColor={TEXT_MUTED}
                />
              </View>

              {/* CARD ESCANEAR */}
              <Link href="/scan" asChild>
                <TouchableOpacity style={styles.scanCard}>
                  <View style={styles.scanIconWrapper}>
                    <Feather name="camera" size={24} color={ACCENT} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.scanTitle}>Escanear producto</Text>
                    <Text style={styles.scanText}>
                      Apunta tu cámara al código de barras para analizar un
                      producto al instante.
                    </Text>
                  </View>
                </TouchableOpacity>
              </Link>

              {/* ENCABEZADO DE RECIENTES */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Búsquedas recientes</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>Ver todas</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.resultCard}>
              <View style={styles.resultLeft}>
                <View style={styles.thumb} />
                <View>
                  <Text style={styles.resultName}>{item.name}</Text>
                  <Text style={styles.resultAgo}>{item.scannedAgo}</Text>
                </View>
              </View>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>
                  {String(item.rating).replace(".", ",")}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
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

/* ---------- Colores ---------- */
const BACKGROUND = "#FFFFFF";
const HEADER_BG = "#F5F1ED";
const CARD_BG = "#F5F1ED";
const ACCENT = "#594A42";
const TEXT_MAIN = "#3B302A";
const TEXT_MUTED = "#8A7C73";
const TAUPE = "#5B524B";

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  container: {
    flex: 1,
    paddingBottom: 80,
    backgroundColor: BACKGROUND,
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

  /* CONTENIDO LISTA */
  listContent: {
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
    marginBottom: 14,
  },

  /* BUSCADOR */
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#E0D6CF",
    backgroundColor: "#FBF8F5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: TEXT_MAIN,
  },

  /* CARD ESCANEAR */
  scanCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: CARD_BG,
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 18,
  },
  scanIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
  },
  scanTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: TEXT_MAIN,
    marginBottom: 4,
  },
  scanText: {
    fontSize: 12.5,
    color: TEXT_MUTED,
    lineHeight: 18,
  },

  /* CABECERA RECIENTES */
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: TEXT_MAIN,
  },
  seeAll: {
    fontSize: 13,
    color: ACCENT,
  },

  /* RESULTADOS */
  resultCard: {
    backgroundColor: "#F3F0ED",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resultLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  thumb: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#C0C4CF",
  },
  resultName: {
    fontSize: 14,
    fontWeight: "600",
    color: TEXT_MAIN,
  },
  resultAgo: {
    fontSize: 12,
    color: TEXT_MUTED,
  },
  ratingBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "#E2F3E0",
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3A7C3C",
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
