// app/perfil/piel.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TAUPE = "#5b524b";
const CARD_BG = "#f7f5f3";

type ItemProps = {
  label: string;
  value: string;
};

const ItemRow = ({ label, value }: ItemProps) => (
  <TouchableOpacity>
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.right}>
        <Text style={styles.value}>{value}</Text>
        <Ionicons name="chevron-forward" size={18} color={TAUPE} />
      </View>
    </View>
  </TouchableOpacity>
);

export default function SkinProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header con back */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={TAUPE} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil de piel y cabello</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <ItemRow label="Tipo de piel" value="Mixta" />
          <View style={styles.divider} />
          <ItemRow label="Sexo" value="Mujer" />
          <View style={styles.divider} />
          <ItemRow label="Edad" value="21 a 30" />
          <View style={styles.divider} />
          <ItemRow label="Problema de la piel" value="Acné y sensibilidad" />
          <View style={styles.divider} />
          <ItemRow label="Meta de cuidado de piel" value="Hidratación y barrera" />
          <View style={styles.divider} />
          <ItemRow label="Ingredientes a evitar" value="Fragancia, alcohol secante" />
          <View style={styles.divider} />
          <ItemRow label="Tipo de cabello" value="Ondulado" />
          <View style={styles.divider} />
          <ItemRow label="Embarazo / lactancia" value="No" />
          <View style={styles.divider} />
          <ItemRow
            label="Mis consejos de cuidado"
            value="Ver"
          />
        </View>

        <Text style={styles.helperText}>
          Usamos este perfil para recomendarte productos y resaltar ingredientes
          que podrían irritar tu piel.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f0eeeb",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: TAUPE,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  label: {
    fontSize: 13,
    color: "#7a736c",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  value: {
    fontSize: 13,
    color: TAUPE,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#e2ddd7",
  },
  helperText: {
    fontSize: 12,
    color: "#8b837b",
    marginTop: 12,
  },
});
