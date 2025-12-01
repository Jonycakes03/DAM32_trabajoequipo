// ProductRecommendationsScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

type Product = {
  id: string;
  name: string;
  brand: string;
  safetyScore: number; // 0–100
  tag: "similar" | "safer";
};

type RouteParams = {
  productId?: string;
};

const MOCK_RECOMMENDATIONS: Product[] = [
  {
    id: "1",
    name: "Hydrating Cleanser",
    brand: "Cerave",
    safetyScore: 97,
    tag: "safer",
  },
  {
    id: "2",
    name: "Gentle Foaming Cleanser",
    brand: "Marca X",
    safetyScore: 92,
    tag: "similar",
  },
  {
    id: "3",
    name: "Low pH Cleanser",
    brand: "Marca Y",
    safetyScore: 95,
    tag: "safer",
  },
];

export const ProductRecommendationsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { productId } = route.params as RouteParams || {};

  const handleGoToDetail = (product: Product) => {
    // ajusta el nombre de la ruta según tu navigator
    navigation.navigate("ProductDetail", { productId: product.id });
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleGoToDetail(item)}
      activeOpacity={0.9}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.brand}>{item.brand}</Text>
        <View
          style={[
            styles.badge,
            item.tag === "safer" ? styles.badgeSafer : styles.badgeSimilar,
          ]}
        >
          <Text style={styles.badgeText}>
            {item.tag === "safer" ? "Alternativa más segura" : "Producto similar"}
          </Text>
        </View>
      </View>

      <Text style={styles.name}>{item.name}</Text>

      <View style={styles.footerRow}>
        <View style={styles.scorePill}>
          <Text style={styles.scoreLabel}>Seguridad</Text>
          <Text style={styles.scoreValue}>{item.safetyScore}/100</Text>
        </View>
        <Text style={styles.linkText}>Ver detalle ›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Recomendaciones</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Basado en tu perfil de piel y en el producto actual
          {productId ? ` (#${productId})` : ""}.
        </Text>

        <FlatList
          data={MOCK_RECOMMENDATIONS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 16 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backText: {
    color: "#594A42",
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#777777",
  },
  card: {
    backgroundColor: "#F7F4F1",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    fontSize: 13,
    color: "#7A6A61",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D2A26",
    marginTop: 4,
    marginBottom: 10,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeSafer: {
    backgroundColor: "#D9F4DD",
  },
  badgeSimilar: {
    backgroundColor: "#E3E9FF",
  },
  badgeText: {
    fontSize: 11,
    color: "#2F4F32",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scorePill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  scoreLabel: {
    fontSize: 12,
    color: "#86766C",
    marginRight: 6,
  },
  scoreValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2F7A34",
  },
  linkText: {
    fontSize: 13,
    color: "#007AFF",
    fontWeight: "500",
  },
});

export default ProductRecommendationsScreen;
