import React, { useState, ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const TAUPE = "#5b524b";
const MINT = "#30C06A";
const BORDER = "#E6E6E6";
const TXT_LIGHT = "#6B6B6B";

type ChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

function Chip({ label, selected, onPress }: ChipProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.chip,
        selected && { backgroundColor: "#E7F8EE", borderColor: "#C7EED9" },
      ]}
    >
      <Text style={[styles.chipText, selected && { color: MINT, fontWeight: "700" }]}>
        {label}
      </Text>
      {selected && <AntDesign name="check" size={14} color={MINT} style={{ marginLeft: 6 }} />}
    </TouchableOpacity>
  );
}

type SectionProps = {
  title: string;
  children: ReactNode;
  right?: ReactNode;
};

function Section({ title, children, right }: SectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {right}
      </View>
      {children}
    </View>
  );
}

export default function FilterScreen() {
  const router = useRouter();

  const [orden, setOrden] = useState<"relevancia" | "seguridad" | "precio_asc" | "precio_desc">(
    "relevancia"
  );
  const [seguridadMin, setSeguridadMin] = useState<string>("80");
  const [precioMin, setPrecioMin] = useState<string>("");
  const [precioMax, setPrecioMax] = useState<string>("");

  const [evitar, setEvitar] = useState({
    parabenos: false,
    fragancia: false,
    alcohol: false,
    sulfatos: false,
    aceites: false,
  });

  const [piel, setPiel] = useState({
    seca: false,
    mixta: false,
    grasa: false,
    sensible: false,
  });

  const [sello, setSello] = useState({
    vegano: false,
    crueltyFree: false,
  });

  function toggle<T extends Record<string, boolean>>(
    key: keyof T,
    setter: React.Dispatch<React.SetStateAction<T>>
  ) {
    setter((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function reset() {
    setOrden("relevancia");
    setSeguridadMin("80");
    setPrecioMin("");
    setPrecioMax("");
    setEvitar({ parabenos: false, fragancia: false, alcohol: false, sulfatos: false, aceites: false });
    setPiel({ seca: false, mixta: false, grasa: false, sensible: false });
    setSello({ vegano: false, crueltyFree: false });
  }

  function apply() {
    const params = {
      orden,
      seguridadMin,
      precioMin,
      precioMax,
      evitar: Object.keys(evitar).filter((k) => evitar[k as keyof typeof evitar]).join(","),
      piel: Object.keys(piel).filter((k) => piel[k as keyof typeof piel]).join(","),
      sello: Object.keys(sello).filter((k) => sello[k as keyof typeof sello]).join(","),
    };
    router.push({ pathname: "/resultados", params });
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <Ionicons name="chevron-back" size={22} color={TAUPE} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filtros</Text>
        <TouchableOpacity onPress={reset} style={styles.headerBtn}>
          <Text style={{ color: MINT, fontWeight: "700" }}>Borrar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Ordenar por */}
        <Section title="Ordenar por">
          <View style={styles.rowWrap}>
            {[
              { key: "relevancia", label: "Relevancia" },
              { key: "seguridad", label: "Seguridad" },
              { key: "precio_asc", label: "Precio ↑" },
              { key: "precio_desc", label: "Precio ↓" },
            ].map((opt) => (
              <Chip
                key={opt.key}
                label={opt.label}
                selected={orden === opt.key}
                onPress={() => setOrden(opt.key as typeof orden)}
              />
            ))}
          </View>
        </Section>

        {/* Seguridad mínima */}
        <Section title="Seguridad mínima" right={<Text style={styles.badge}>{seguridadMin}/100</Text>}>
          <View style={styles.inlineInputs}>
            <Text style={styles.inputLabel}>Mínimo</Text>
            <TextInput
              style={[styles.input, { width: 90 }]}
              keyboardType="numeric"
              value={seguridadMin}
              onChangeText={(t: string) => {
                const v = t.replace(/[^0-9]/g, "");
                const bounded = Math.max(0, Math.min(100, Number(v || 0))).toString();
                setSeguridadMin(bounded);
              }}
              placeholder="0-100"
            />
          </View>
          <Text style={styles.helperText}>
            Solo mostrar productos con puntaje de seguridad igual o superior.
          </Text>
        </Section>

        {/* Evitar ingredientes */}
        <Section title="Evitar ingredientes">
          <View style={styles.rowWrap}>
            {[
              ["parabenos", "No parabenos"],
              ["fragancia", "Sin fragancia"],
              ["alcohol", "Sin alcohol"],
              ["sulfatos", "Sin sulfatos"],
              ["aceites", "Sin aceites esenciales"],
            ].map(([key, label]) => (
              <Chip
                key={key}
                label={label}
                selected={evitar[key as keyof typeof evitar]}
                onPress={() => toggle(key as keyof typeof evitar, setEvitar)}
              />
            ))}
          </View>
        </Section>

        {/* Tipo de piel */}
        <Section title="Tipo de piel">
          <View style={styles.rowWrap}>
            {[
              ["seca", "Seca"],
              ["mixta", "Mixta"],
              ["grasa", "Grasa"],
              ["sensible", "Sensible"],
            ].map(([key, label]) => (
              <Chip
                key={key}
                label={label}
                selected={piel[key as keyof typeof piel]}
                onPress={() => toggle(key as keyof typeof piel, setPiel)}
              />
            ))}
          </View>
        </Section>

        {/* Sellos */}
        <Section title="Sellos">
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Vegano</Text>
            <Switch
              value={sello.vegano}
              onValueChange={() => toggle("vegano", setSello)}
              trackColor={{ true: "#CDEEDC", false: "#DADADA" }}
              thumbColor={sello.vegano ? MINT : "#f4f3f4"}
            />
          </View>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Cruelty-free</Text>
            <Switch
              value={sello.crueltyFree}
              onValueChange={() => toggle("crueltyFree", setSello)}
              trackColor={{ true: "#CDEEDC", false: "#DADADA" }}
              thumbColor={sello.crueltyFree ? MINT : "#f4f3f4"}
            />
          </View>
        </Section>

        {/* Precio */}
        <Section title="Precio (MXN)">
          <View style={styles.inlineInputs}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Mín</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={precioMin}
                onChangeText={(t: string) => setPrecioMin(t.replace(/[^0-9]/g, ""))}
                placeholder="0"
              />
            </View>
            <View style={{ width: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Máx</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={precioMax}
                onChangeText={(t: string) => setPrecioMax(t.replace(/[^0-9]/g, ""))}
                placeholder="—"
              />
            </View>
          </View>
          <Text style={styles.helperText}>Déjalo en blanco si no quieres límite.</Text>
        </Section>
      </ScrollView>

      {/* Footer fijo */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={reset} style={[styles.footerBtn, styles.footerGhost]}>
          <Text style={[styles.footerBtnText, { color: TAUPE }]}>Restablecer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={apply} style={[styles.footerBtn, styles.footerSolid]}>
          <Text style={styles.footerBtnText}>Aplicar filtros</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 56,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },
  headerBtn: { padding: 8, minWidth: 60, alignItems: "center" },
  headerTitle: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
    color: TAUPE,
  },

  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  sectionTitle: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },

  rowWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 6 },

  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 6,
    marginBottom: 8,
  },
  chipText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: 12,
    color: TXT_LIGHT,
  },

  badge: {
    backgroundColor: "#F7F7F7",
    color: "#333",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 12,
  },

  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  switchLabel: {
    fontFamily: "Montserrat_500Medium",
    color: "#333",
    fontSize: 14,
  },

  inlineInputs: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  inputLabel: {
    fontFamily: "Montserrat_500Medium",
    color: TXT_LIGHT,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
    fontFamily: "Montserrat_500Medium",
    color: "#333",
    backgroundColor: "#fff",
  },
  helperText: {
    marginTop: 6,
    color: TXT_LIGHT,
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#EFEFEF",
    flexDirection: "row",
    gap: 10,
  },
  footerBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  footerGhost: {
    borderWidth: 1,
    borderColor: TAUPE,
    backgroundColor: "#fff",
  },
  footerSolid: {
    backgroundColor: TAUPE,
  },
  footerBtnText: {
    color: "#fff",
    fontFamily: "Montserrat_700Bold",
    fontSize: 14,
  },
});
