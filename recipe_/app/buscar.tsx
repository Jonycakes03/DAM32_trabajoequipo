import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { Link } from "expo-router";
import { Feather, Ionicons, AntDesign } from "@expo/vector-icons";

export default function SearchScreen() {
  const data = useMemo(
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
    <View style={styles.container}>
      {/* Header gris fino (opcional) */}
      <View style={styles.headerSpacer} />

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            {/* Search */}
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar"
              placeholderTextColor="#A6BCA6"
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
              <TouchableOpacity>
                <Text style={styles.seeAll}>Ver todos</Text>
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.resultCard}>
            <View style={styles.resultLeft}>
              <View style={styles.thumb} />
              <View style={{ gap: 2 }}>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultAgo}>{item.scannedAgo}</Text>
              </View>
            </View>
            <Text style={styles.resultRating}>
              {String(item.rating).replace(".", ",")}
            </Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
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
    </View>
  );
}

const TAUPE = "#5b524b";
const LIGHT_CARD = "#DCDCDC";
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

  // Result card
  resultCard: {
    marginTop: 10,
    backgroundColor: LIGHT_CARD,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  thumb: {
    width: 38,
    height: 38,
    borderRadius: 6,
    backgroundColor: "#8A94A6",
  },
  resultName: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
    color: "#1A1A1A",
  },
  resultAgo: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 12,
    color: "#444",
  },
  resultRating: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
    color: "#4A4A4A",
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
});
