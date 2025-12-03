import React, { useState, ReactNode } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons, AntDesign } from "@expo/vector-icons";

const INGREDIENTS = [
    "Acido hialuronico",
    "Glicerina",
    "Urea",
    "Manteca de karité",
    "Vitamina C",
    "Vitamina E",
    "Niacinamida",
    "Oxido de zinc",
    "Agua",
    "Tea Tree Oil"
];

const BRANDS = ["Nivea", "Head & Shoulders", "Pantene", "COSRX"];

/* ---------- UI Helpers (solo diseño) ---------- */
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
            activeOpacity={0.85}
            style={[
                styles.chip,
                selected && { backgroundColor: "#E7F8EE", borderColor: "#C7EED9" },
            ]}
        >
            <Text style={[styles.chipText, selected && { color: MINT, fontWeight: "700" }]}>
                {label}
            </Text>
            {selected && (
                <AntDesign name="check" size={14} color={MINT} style={{ marginLeft: 6 }} />
            )}
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

/* ---------- Screen ---------- */
export default function FiltersScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const [selectedRating, setSelectedRating] = useState<number | null>(
        params.rating ? Number(params.rating) : null
    );
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>(
        params.ingredients ? (params.ingredients as string).split(",") : []
    );
    const [selectedBrands, setSelectedBrands] = useState<string[]>(
        params.brand ? (params.brand as string).split(",") : []
    );

    const toggleIngredient = (ing: string) => {
        if (selectedIngredients.includes(ing)) {
            setSelectedIngredients(selectedIngredients.filter((i) => i !== ing));
        } else {
            setSelectedIngredients([...selectedIngredients, ing]);
        }
    };

    const toggleBrand = (brand: string) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter((b) => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    const reset = () => {
        setSelectedRating(null);
        setSelectedIngredients([]);
        setSelectedBrands([]);
    };

    const applyFilters = () => {
        router.push({
            pathname: "/resultados",
            params: {
                query: params.query, // Keep the original search query
                rating: selectedRating,
                ingredients: selectedIngredients.join(","),
                brand: selectedBrands.join(","),
            },
        });
    };

    const ratingLabel = selectedRating ? `${selectedRating}★` : "—";

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header (estilo del segundo) */}
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
                    {/* Valoración */}
                    <Section title="Valoración" right={<Text style={styles.badge}>{ratingLabel}</Text>}>
                        <View style={styles.rowWrap}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Chip
                                    key={star}
                                    label={`${star} ★`}
                                    selected={selectedRating === star}
                                    onPress={() => setSelectedRating(star === selectedRating ? null : star)}
                                />
                            ))}
                        </View>
                        <Text style={styles.helperText}>Elige una valoración mínima para filtrar resultados.</Text>
                    </Section>

                    {/* Ingredientes */}
                    <Section
                        title="Ingredientes"
                        right={
                            <Text style={styles.badge}>
                                {selectedIngredients.length > 0 ? selectedIngredients.length : "—"}
                            </Text>
                        }
                    >
                        <View style={styles.rowWrap}>
                            {INGREDIENTS.map((ing) => (
                                <Chip
                                    key={ing}
                                    label={ing}
                                    selected={selectedIngredients.includes(ing)}
                                    onPress={() => toggleIngredient(ing)}
                                />
                            ))}
                        </View>
                        <Text style={styles.helperText}>Selecciona ingredientes para incluir en el filtro.</Text>
                    </Section>

                    {/* Marca */}
                    <Section
                        title="Marca"
                        right={
                            <Text style={styles.badge}>
                                {selectedBrands.length > 0 ? selectedBrands.length : "—"}
                            </Text>
                        }
                    >
                        <View style={styles.rowWrap}>
                            {BRANDS.map((brand) => (
                                <Chip
                                    key={brand}
                                    label={brand}
                                    selected={selectedBrands.includes(brand)}
                                    onPress={() => toggleBrand(brand)}
                                />
                            ))}
                        </View>
                        <Text style={styles.helperText}>Filtra por una o varias marcas.</Text>
                    </Section>
                </ScrollView>

                {/* Footer fijo (estilo del segundo) */}
                <View style={styles.footer}>
                    <TouchableOpacity onPress={reset} style={[styles.footerBtn, styles.footerGhost]}>
                        <Text style={[styles.footerBtnText, { color: TAUPE }]}>Restablecer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={applyFilters} style={[styles.footerBtn, styles.footerSolid]}>
                        <Text style={styles.footerBtnText}>Aplicar filtros</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

/* ---------- Styles (del segundo diseño) ---------- */
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#fff" },
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

    helperText: {
        marginTop: 8,
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
    footerSolid: { backgroundColor: TAUPE },
    footerBtnText: {
        color: "#fff",
        fontFamily: "Montserrat_700Bold",
        fontSize: 14,
    },
});
