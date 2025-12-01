import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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
];

const BRANDS = ["Nivea", "Head & Shoulders", "Pantene", "COSRX"];

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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Filtros</Text>
                <TouchableOpacity onPress={() => {
                    setSelectedRating(null);
                    setSelectedIngredients([]);
                    setSelectedBrands([]);
                }}>
                    <Text style={styles.resetText}>Borrar</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* Valoración */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Valoración</Text>
                    <View style={styles.ratingContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity
                                key={star}
                                style={[
                                    styles.starBtn,
                                    selectedRating === star && styles.starBtnSelected,
                                ]}
                                onPress={() => setSelectedRating(star === selectedRating ? null : star)}
                            >
                                <Text
                                    style={[
                                        styles.starText,
                                        selectedRating === star && styles.starTextSelected,
                                    ]}
                                >
                                    {star} ★
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Ingredientes */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ingredientes</Text>
                    <View style={styles.chipsContainer}>
                        {INGREDIENTS.map((ing) => (
                            <TouchableOpacity
                                key={ing}
                                style={[
                                    styles.chip,
                                    selectedIngredients.includes(ing) && styles.chipSelected,
                                ]}
                                onPress={() => toggleIngredient(ing)}
                            >
                                <Text
                                    style={[
                                        styles.chipText,
                                        selectedIngredients.includes(ing) && styles.chipTextSelected,
                                    ]}
                                >
                                    {ing}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Marca */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Marca</Text>
                    <View style={styles.chipsContainer}>
                        {BRANDS.map((brand) => (
                            <TouchableOpacity
                                key={brand}
                                style={[
                                    styles.chip,
                                    selectedBrands.includes(brand) && styles.chipSelected,
                                ]}
                                onPress={() => toggleBrand(brand)}
                            >
                                <Text
                                    style={[
                                        styles.chipText,
                                        selectedBrands.includes(brand) && styles.chipTextSelected,
                                    ]}
                                >
                                    {brand}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
                    <Text style={styles.applyBtnText}>Aceptar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const TAUPE = "#5b524b";
const GREEN = "#4CAF50";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: "Montserrat_600SemiBold",
        color: "#333",
    },
    resetText: {
        fontSize: 14,
        fontFamily: "Montserrat_400Regular",
        color: "#666",
    },
    content: {
        padding: 16,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: "Montserrat_600SemiBold",
        color: "#333",
        marginBottom: 12,
    },
    ratingContainer: {
        flexDirection: "row",
        gap: 10,
    },
    starBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    starBtnSelected: {
        backgroundColor: GREEN,
        borderColor: GREEN,
    },
    starText: {
        fontSize: 14,
        color: "#333",
        fontFamily: "Montserrat_600SemiBold",
    },
    starTextSelected: {
        color: "#fff",
    },
    chipsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    chip: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#f0f0f0",
        borderWidth: 1,
        borderColor: "transparent",
    },
    chipSelected: {
        backgroundColor: "#E8F5E9",
        borderColor: GREEN,
    },
    chipText: {
        fontSize: 13,
        color: "#555",
        fontFamily: "Montserrat_400Regular",
    },
    chipTextSelected: {
        color: GREEN,
        fontFamily: "Montserrat_600SemiBold",
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    applyBtn: {
        backgroundColor: TAUPE,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    applyBtnText: {
        color: "#fff",
        fontSize: 16,
        fontFamily: "Montserrat_600SemiBold",
    },
});
