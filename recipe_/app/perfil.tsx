// app/perfil/index.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const TAUPE = "#5b524b";
const CARD_BG = "#f7f5f3";

const Row = ({
  icon,
  label,
  href,
}: {
  icon: any;
  label: string;
  href?: string;
}) => {
  const content = (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={18} color={TAUPE} style={{ marginRight: 8 }} />
        <Text style={styles.rowText}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={TAUPE} />
    </View>
  );

  if (href) {
    return (
      <Link href={href} asChild>
        <TouchableOpacity>{content}</TouchableOpacity>
      </Link>
    );
  }

  return <View>{content}</View>;
};

export default function PerfilScreen() {
  return (
    <View style={styles.container}>
      {/* Header ClearLabel */}
      <View style={styles.header}>
        <Text style={styles.brand}>CLEARLABEL</Text>
        <Ionicons name="mail-outline" size={20} color={TAUPE} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Título */}
        <Text style={styles.title}>Perfil</Text>

        {/* Banner simple (opcional) */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Personaliza tu experiencia</Text>
          <Text style={styles.bannerText}>
            Define tu tipo de piel y obtén análisis más precisos.
          </Text>
        </View>

        {/* Grupo 1 */}
        <View style={styles.card}>
          <Row icon="leaf-outline" label="Tu piel y cabello" href="/perfil/piel" />
          <View style={styles.divider} />
          <Row
            icon="sparkles-outline"
            label="Rutina de cuidado de piel"
            href="/perfil/rutina"
          />
          <View style={styles.divider} />
          <Row icon="star-outline" label="Mis reseñas" href="/perfil/resenas" />
        </View>

        {/* Grupo 2 */}
        <View style={styles.card}>
          <Row
            icon="person-outline"
            label="Administrar cuenta"
            href="/perfil/cuenta"
          />
          <View style={styles.divider} />
          <Row
            icon="notifications-outline"
            label="Notificaciones"
            href="/perfil/notificaciones"
          />
        </View>

        {/* Grupo 3 */}
        <View style={styles.card}>
          <Row
            icon="shield-checkmark-outline"
            label="Política de privacidad"
            href="/perfil/privacidad"
          />
        </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0eeeb",
  },
  brand: {
    fontSize: 16,
    letterSpacing: 1,
    color: TAUPE,
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: TAUPE,
    marginBottom: 16,
  },
  banner: {
    backgroundColor: "#fbeee3",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: TAUPE,
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 12,
    color: "#6a625c",
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowText: {
    fontSize: 14,
    color: TAUPE,
  },
  divider: {
    height: 1,
    backgroundColor: "#e2ddd7",
  },
});
