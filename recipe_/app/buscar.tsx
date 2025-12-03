import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Link, router } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY_KEY = "search_history";

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const history = await AsyncStorage.getItem(HISTORY_KEY);
      if (history) setRecentSearches(JSON.parse(history));
    } catch (e) {
      console.error("Failed to load history", e);
    }
  };

  const saveSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      // Add new search to start, remove duplicates, keep max 10
      const newHistory = [
        searchQuery,
        ...recentSearches.filter((s) => s !== searchQuery),
      ].slice(0, 10);

      setRecentSearches(newHistory);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));

      // Navigate to results page
      router.push({ pathname: "/resultados", params: { query: searchQuery } });
      setSearchQuery("");
    } catch (e) {
      console.error("Failed to save history", e);
    }
  };

  const onHistoryItemPress = (item: string) => {
    router.push({ pathname: "/resultados", params: { query: item } });
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem(HISTORY_KEY);
      setRecentSearches([]);
    } catch (e) {
      console.error("Failed to clear history", e);
    }
  };

  const removeSearchItem = async (item: string) => {
    try {
      const newHistory = recentSearches.filter((s) => s !== item);
      setRecentSearches(newHistory);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (e) {
      console.error("Failed to remove item", e);
    }
  };

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
          data={[]}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              <Text style={styles.pageTitle}>Buscar</Text>
              <Text style={styles.pageSubtitle}>
                Encuentra productos por nombre o escaneando su código de barras.
              </Text>

              {/* BUSCADOR (mantiene tu lógica: setSearchQuery + onSubmitEditing saveSearch) */}
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
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onSubmitEditing={saveSearch}
                  returnKeyType="search"
                />
              </View>

              {/* CARD ESCANEAR (MISMA RUTA ORIGINAL: /escanear) */}
              <Link href="/escanear" asChild>
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

              {/* ENCABEZADO DE RECIENTES (mantiene tu acción "Borrar todo") */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Búsquedas recientes</Text>
                {recentSearches.length > 0 && (
                  <TouchableOpacity onPress={clearHistory}>
                    <Text style={styles.seeAll}>Borrar todo</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* LISTA DE HISTORIAL (misma lógica) */}
              <View style={{ marginTop: 2 }}>
                {recentSearches.length === 0 ? (
                  <Text style={styles.emptyText}>No hay búsquedas recientes</Text>
                ) : (
                  recentSearches.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.historyItem}
                      onPress={() => onHistoryItemPress(item)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.historyLeft}>
                        <Ionicons
                          name="time-outline"
                          size={18}
                          color={TEXT_MUTED}
                        />
                        <Text style={styles.historyText}>{item}</Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => removeSearchItem(item)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Ionicons name="close" size={18} color={TEXT_MUTED} />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            </View>
          }
          renderItem={null}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </View>

      {/* TABBAR INFERIOR (igual que tu original) */}
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
            <Text style={[styles.tabLabel, { fontWeight: "700" }]}>Buscar</Text>
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
            <Ionicons name="person-outline" size={22} color="#fff" />
            <Text style={styles.tabLabel}>Perfil</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

/* ---------- Colores (del 2° diseño) ---------- */
const BACKGROUND = "#FFFFFF";
const HEADER_BG = "#F5F1ED";
const CARD_BG = "#F5F1ED";
const ACCENT = "#594A42";
const TEXT_MAIN = "#3B302A";
const TEXT_MUTED = "#8A7C73";
const TAUPE = "#5B524B";

/* ---------- Styles (UI del 2° diseño) ---------- */
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

  /* HISTORIAL (adaptado al look del 2° diseño) */
  emptyText: {
    color: TEXT_MUTED,
    fontSize: 13,
    paddingVertical: 10,
  },
  historyItem: {
    backgroundColor: "#F3F0ED",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  historyLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  historyText: {
    fontSize: 14,
    color: TEXT_MAIN,
    fontWeight: "500",
  },

  /* TABBAR (del 2° diseño) */
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
