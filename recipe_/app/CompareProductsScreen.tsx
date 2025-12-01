// CompareProductsScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

type RouteParams = {
  leftProductId?: string;
  rightProductId?: string;
};

const mockLeft = {
  name: "Hydrating Cleanser",
  brand: "Cerave",
  safety: 97,
  fragrance: "Sin fragancia",
  spf: "No",
  skinType: "Todo tipo",
  crueltyFree: "Sí",
};

const mockRight = {
  name: "Foaming Cleanser",
  brand: "Marca X",
  safety: 84,
  fragrance: "Con fragancia",
  spf: "No",
  skinType: "Mixta / grasa",
  crueltyFree: "No",
};

export const CompareProductsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { leftProductId, rightProductId } = route.params as RouteParams || {};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Comparar productos</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container}>
        <Text style={styles.subtitle}>
          Compara ingredientes, seguridad y características clave para decidir
          qué producto se adapta mejor a tu piel.
        </Text>

        {/* Cabecera con nombres */}
        <View style={styles.productsHeader}>
          <View style={styles.column}>
            <Text style={styles.brand}>{mockLeft.brand}</Text>
            <Text style={styles.name}>{mockLeft.name}</Text>
          </View>
          <View style={styles.vsBox}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.brand}>{mockRight.brand}</Text>
            <Text style={styles.name}>{mockRight.name}</Text>
          </View>
        </View>

        {/* Tabla de comparativa */}
        <View style={styles.table}>
          <Row label="Seguridad" left={`${mockLeft.safety}/100`} right={`${mockRight.safety}/100`} />
          <Row label="Fragancia" left={mockLeft.fragrance} right={mockRight.fragrance} />
          <Row label="SPF" left={mockLeft.spf} right={mockRight.spf} />
          <Row label="Tipo de piel recomendado" left={mockLeft.skinType} right={mockRight.skinType} />
          <Row label="Cruelty-Free" left={mockLeft.crueltyFree} right={mockRight.crueltyFree} />
        </View>

        <Text style={styles.hint}>
          Tip: puedes resaltar el producto más seguro o más compatible con tu
          perfil de piel.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

type RowProps = {
  label: string;
  left: string;
  right: string;
};

const Row: React.FC<RowProps> = ({ label, left, right }) => (
  <View style={styles.row}>
    <Text style={styles.rowLabel}>{label}</Text>
    <View style={styles.rowValues}>
      <Text style={[styles.value, styles.leftValue]}>{left}</Text>
      <Text style={[styles.value, styles.rightValue]}>{right}</Text>
    </View>
  </View>
);

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
    fontSize: 14,
    color: "#777777",
    marginBottom: 16,
  },
  productsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  column: {
    flex: 1,
  },
  brand: {
    fontSize: 13,
    color: "#7A6A61",
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2D2A26",
  },
  vsBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#D5C9BE",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
  },
  vsText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#594A42",
  },
  table: {
    borderRadius: 18,
    backgroundColor: "#F7F4F1",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#E1D6CF",
    paddingVertical: 10,
  },
  rowLabel: {
    fontSize: 13,
    color: "#866F61",
    marginBottom: 4,
  },
  rowValues: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  value: {
    fontSize: 14,
    color: "#333333",
    flex: 1,
  },
  leftValue: {
    marginRight: 8,
  },
  rightValue: {
    marginLeft: 8,
    textAlign: "right",
  },
  hint: {
    marginTop: 12,
    fontSize: 12,
    color: "#999999",
  },
});

export default CompareProductsScreen;
