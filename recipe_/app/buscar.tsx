import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Link, router } from "expo-router";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'search_history';

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
      if (history) {
        setRecentSearches(JSON.parse(history));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  };

  const saveSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      // Add new search to start, remove duplicates, keep max 10
      const newHistory = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 10);
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
      const newHistory = recentSearches.filter(s => s !== item);
      setRecentSearches(newHistory);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (e) {
      console.error("Failed to remove item", e);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header gris fino (opcional) */}
      <View style={styles.headerSpacer} />

      <FlatList
        data={[]} // No inline results
        keyExtractor={(item) => item}
        ListHeaderComponent={
          <>
            {/* Search */}
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar"
              placeholderTextColor="#A6BCA6"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={saveSearch}
              returnKeyType="search"
            />

            {/* Scan card */}
            <Link href="/escanear" asChild>
              <TouchableOpacity style={styles.scanCard}>
                <Feather name="camera" size={26} />
                <Text style={styles.scanTitle}>Escanea producto</Text>
                <Text style={styles.scanText}>
                  Apunta tu camara al codigo de{"\n"}barras de algun producto
                </Text>
              </TouchableOpacity>
            </Link>

            {/* Título sección */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Busquedas recientes</Text>
              {recentSearches.length > 0 && (
                <TouchableOpacity onPress={clearHistory}>
                  <Text style={styles.seeAll}>Borrar todo</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Recent Searches List */}
            <View style={{ marginTop: 10 }}>
              {recentSearches.length === 0 ? (
                <Text style={{ color: '#999', marginLeft: 10, marginBottom: 10 }}>No hay búsquedas recientes</Text>
              ) : (
                recentSearches.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.historyItem} onPress={() => onHistoryItemPress(item)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                      <Ionicons name="time-outline" size={20} color="#666" />
                      <Text style={styles.historyText}>{item}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeSearchItem(item)}>
                      <Ionicons name="close" size={18} color="#999" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </>
        }
        renderItem={null}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Tab */}
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

const TAUPE = "#5b524b";
const BORDER_GREEN = "#CDEACD";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  headerSpacer: {
    height: 28,
    backgroundColor: "#E5E5E5",
    width: "100%",
  },

  // Search
  searchInput: {
    marginTop: 12,
    borderWidth: 2,
    borderColor: BORDER_GREEN,
    backgroundColor: "#F6FFF6",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: "Montserrat_400Regular",
    marginHorizontal: 4,
  },

  // Scan card
  scanCard: {
    marginTop: 14,
    backgroundColor: "#D9D9D9",
    borderRadius: 14,
    paddingVertical: 26,
    alignItems: "center",
    gap: 10,
    marginHorizontal: 4,
  },
  scanTitle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: "#111",
  },
  scanText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 12.5,
    textAlign: "center",
    color: "#222",
    lineHeight: 18,
  },

  // Section header
  sectionHeader: {
    marginTop: 18,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: "#111",
  },
  seeAll: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 13,
    color: "#3E3E3E",
  },

  // Tabbar
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
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    color: "#333",
  },
});
