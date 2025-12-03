// ProductReviewsScreen.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

type RouteParams = {
    productId?: string;
};

type Review = {
    id: string;
    userName: string;
    rating: number; // 1–5
    skinType: string;
    createdAt: string;
    comment: string;
};

const MOCK_REVIEWS: Review[] = [
    {
        id: "1",
        userName: "Ana",
        rating: 5,
        skinType: "Mixta",
        createdAt: "Hace 2 días",
        comment: "Me ayudó muchísimo con la barrera dañada, cero irritación.",
    },
    {
        id: "2",
        userName: "Luis",
        rating: 4,
        skinType: "Grasa",
        createdAt: "Hace 1 semana",
        comment:
            "Limpia bien, pero en climas muy húmedos siento que necesito algo más ligero.",
    },
    {
        id: "3",
        userName: "María",
        rating: 3,
        skinType: "Sensible",
        createdAt: "Hace 3 semanas",
        comment:
            "No me irritó, pero tampoco vi cambios grandes. Huele neutro, lo cual me gusta.",
    },
];

export const ProductReviewsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { productId } = route.params as RouteParams || {};
    const [filterSkinType, setFilterSkinType] = useState<string | null>(null);

    const filteredReviews = filterSkinType
        ? MOCK_REVIEWS.filter((r) => r.skinType === filterSkinType)
        : MOCK_REVIEWS;

    const handleFilter = (type: string | null) => {
        setFilterSkinType(type);
    };

    const renderReview = ({ item }: { item: Review }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.dateText}>{item.createdAt}</Text>
            </View>

            <View style={styles.row}>
                <View style={styles.ratingPill}>
                    <Text style={styles.ratingText}>{item.rating.toFixed(1)} ★</Text>
                </View>
                <Text style={styles.skinType}>{item.skinType}</Text>
            </View>

            <Text style={styles.comment}>{item.comment}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>Atrás</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Reseñas del producto</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.container}>
                <Text style={styles.subtitle}>
                    Opiniones de personas con distintos tipos de piel
                    {productId ? ` (Producto #${productId})` : ""}.
                </Text>

                {/* Filtros tipo de piel */}
                <View style={styles.filtersRow}>
                    <FilterChip
                        label="Todas"
                        active={filterSkinType === null}
                        onPress={() => handleFilter(null)}
                    />
                    <FilterChip
                        label="Seca"
                        active={filterSkinType === "Seca"}
                        onPress={() => handleFilter("Seca")}
                    />
                    <FilterChip
                        label="Mixta"
                        active={filterSkinType === "Mixta"}
                        onPress={() => handleFilter("Mixta")}
                    />
                    <FilterChip
                        label="Grasa"
                        active={filterSkinType === "Grasa"}
                        onPress={() => handleFilter("Grasa")}
                    />
                    <FilterChip
                        label="Sensible"
                        active={filterSkinType === "Sensible"}
                        onPress={() => handleFilter("Sensible")}
                    />
                </View>

                <FlatList
                    data={filteredReviews}
                    keyExtractor={(item) => item.id}
                    renderItem={renderReview}
                    contentContainerStyle={{ paddingVertical: 12 }}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                />
            </View>
        </SafeAreaView>
    );
};

type FilterChipProps = {
    label: string;
    active: boolean;
    onPress: () => void;
};

const FilterChip: React.FC<FilterChipProps> = ({ label, active, onPress }) => (
    <TouchableOpacity
        style={[styles.chip, active && styles.chipActive]}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <Text style={[styles.chipText, active && styles.chipTextActive]}>
            {label}
        </Text>
    </TouchableOpacity>
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
        marginBottom: 10,
    },
    filtersRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 8,
    },
    chip: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#D3C3B9",
        marginRight: 8,
        marginBottom: 6,
    },
    chipActive: {
        backgroundColor: "#594A42",
        borderColor: "#594A42",
    },
    chipText: {
        fontSize: 13,
        color: "#7A6A61",
    },
    chipTextActive: {
        color: "#FFFFFF",
    },
    card: {
        backgroundColor: "#F9F6F3",
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    userName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#3A3028",
    },
    dateText: {
        fontSize: 12,
        color: "#A1958C",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    ratingPill: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12,
        backgroundColor: "#E5F5DA",
        marginRight: 8,
    },
    ratingText: {
        fontSize: 12,
        color: "#2F7A34",
        fontWeight: "600",
    },
    skinType: {
        fontSize: 12,
        color: "#7A6A61",
    },
    comment: {
        fontSize: 14,
        color: "#433732",
    },
});

export default ProductReviewsScreen;