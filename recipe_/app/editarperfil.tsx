// app/favoritos.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

/* --------- Tipado --------- */
type ProductoFavorito = {
  id: string;
  nombre: string;
  marca: string;
  categoria: string;
  nivelSeguridad: "Alta" | "Media" | "Baja";
  ingredientesClave: string[];
};

/* --------- Data ejemplo (luego la conectas a tu backend) --------- */
const DATA_INICIAL: ProductoFavorito[] = [
  {
    id: "1",
    nombre: "Centella Soothing Ampoule",
    marca: "Skin1004",
    categoria: "Serum",
    nivelSeguridad: "Alta",
    ingredientesClave: ["Centella", "Madecassoside"],
  },
  {
    id: "2",
    nombre: "Sunblock SPF50",
    marca: "Marca Y",
    categoria: "Protector solar",
    nivelSeguridad: "Media",
    ingredientesClave: ["Fragancia", "Octocrylene"],
  },
];

/* --------- Helpers de color/texto --------- */
function getColorNivel(nivel: ProductoFavorito["nivelSeguridad"]) {
  if (nivel === "Alta") return "#2E8B57"; // verde
  if (nivel === "Media") return "#E6A700"; // ámbar
  return "#D63333"; // rojo
}

function getTextoNivel(nivel: ProductoFavorito["nivelSeguridad"]) {
  if (nivel === "Alta") return "Muy seguro";
  if (nivel === "Media") return "Riesgo medio";
  return "Riesgo alto";
}

/* --------- Colores globales CLEARLABEL --------- */
const TAUPE = "#5B524B";
const BG = "#FFFFFF";
const CARD_BG = "#FFFFFF";
const HEADER_BG = "#F5F1ED";

export default function FavoritosScreen() {
  const router = useRouter();
  const [favoritos, setFavoritos] = useState<ProductoFavorito[]>(DATA_INICIAL);

  const quitarFavorito = (id: string) => {
    setFavoritos((prev) => prev.filter((p) => p.id !== id));
  };

  const renderItem = ({ item }: { item: ProductoFavorito }) => (
    <View style={styles.card}>
      {/* Marca + categoría + badge de seguridad */}
      <View style={styles.cardHeaderRow}>
        <View>
          <Text style={styles.marca}>{item.marca}</Text>
          <Text style={styles.categoria}>{item.categoria}</Text>
        </View>

        <View
          style={[
            styles.badge,
            { backgroundColor: getColorNivel(item.nivelSeguridad) + "22" },
          ]}
        >
          <View
            style={[
              styles.dot,
              { backgroundColor: getColorNivel(item.nivelSeguridad) },
            ]}
          />
          <Text
            style={[
              styles.badgeText,
              { color: getColorNivel(item.nivelSeguridad) },
            ]}
          >
            {getTextoNivel(item.nivelSeguridad)}
          </Text>
        </View>
      </View>

      {/* Nombre del producto */}
      <Text style={styles.nombre}>{item.nombre}</Text>

      {/* Ingredientes clave */}
      <Text style={styles.label}>Ingredientes clave</Text>
      <Text style={styles.ing}>{item.ingredientesClave.join(" · ")}</Text>

      {/* Botones */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, styles.btnOutline]}
          onPress={() => quitarFavorito(item.id)}
        >
          <Text style={styles.btnOutlineText}>Quitar ⭐</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.btnTaupe]}
          onPress={() => router.push("/fichaproducto")}
        >
          <Text style={styles.btnTaupeText}>Ver detalle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const isEmpty = favoritos.length === 0;

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

        {/* TÍTULO Y DESCRIPCIÓN */}
        <View style={styles.top}>
          <Text style={styles.pageTitle}>Editar perfiles</Text>
          <Text style={styles.pageSubtitle}>
            Ajusta tus productos estrella para que ClearLabel afine mejor las
            recomendaciones.
          </Text>
        </View>

        {/* CONTENIDO */}
        {isEmpty ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No tienes favoritos aún</Text>
            <Text style={styles.emptyText}>
              Guarda productos para verlos rápidamente aquí.
            </Text>
          </View>
        ) : (
          <FlatList
            data={favoritos}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

/* --------- Estilos --------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  container: {
    flex: 1,
    backgroundColor: BG,
  },

  /* Header CLEARLABEL */
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

  /* Título sección */
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
  },

  /* Lista */
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: CARD_BG,
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  marca: {
    fontSize: 13,
    fontWeight: "600",
    color: "#444",
  },
  categoria: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  badge: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },

  nombre: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 4,
    color: "#333",
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
    color: "#666",
  },
  ing: {
    fontSize: 13,
    color: "#444",
    marginTop: 2,
    marginBottom: 10,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  btn: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center",
  },
  btnTaupe: {
    backgroundColor: TAUPE,
  },
  btnTaupeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    backgroundColor: "#FFFFFF",
  },
  btnOutlineText: {
    color: "#444",
    fontWeight: "600",
    fontSize: 13,
  },

  /* Empty state */
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#333",
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
