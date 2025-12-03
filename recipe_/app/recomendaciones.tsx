// ProductRecommendationsScreen.tsx
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { supabase } from "../utils/supabase";

// IDs de productos recomendados
const RECOMMENDED_IDS = [
    "00b8f6ff-581b-4817-ac78-3bfcb9371520", // Reemplazar con IDs reales
    "e99f9d9a-d0e8-41d7-847b-1ad1bb3873ee",
    "fac4c1af-5c3d-4998-af0c-fabe8e4dadb4"
];

type Product = {
    id: string;
    nombre: string;
    marca: string;
    valoracion: number;
    tag?: "similar" | "safer"; // Opcional, no viene de BD
};

type RouteParams = {
    productId?: string;
};

export const Recomendaciones: React.FC = () => {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { productId } = route.params as RouteParams || {};
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecommendations();
    }, []);

    async function fetchRecommendations() {
        setLoading(true);
        // Traer productos recomendados
        const { data, error } = await supabase
            .from("Productos")
            .select("id, nombre, marca, valoracion")
            .in("id", RECOMMENDED_IDS);

        if (error) {
            console.error("Error fetching recommendations:", error);
        } else if (data) {
            // Mapear para agregar etiqueta ficticia
            const mapped = data.map((item: any, index: number) => ({
                ...item,
                tag: index % 2 === 0 ? "safer" : "similar", // Lógica de ejemplo
            }));
            setProducts(mapped);
        }
        setLoading(false);
    }

    const handleGoToDetail = (product: Product) => {
        // Navegar a la ficha de producto (usando el path correcto de expo-router o react-navigation)
        // En este proyecto parece que usas router.push o Link, pero aquí usas useNavigation.
        // Si usas expo-router, lo ideal es router.push. Mantendré navigation.navigate si así estaba,
        // pero ajustado a tu estructura de archivos: "fichaproducto"
        // NOTA: Si usas expo-router, navigation.navigate podría no funcionar igual si no está tipado.
        // Cambiaré a router.push para consistencia con el resto de la app si es posible,
        // pero como importaste useNavigation, lo dejaré así o usaré router de expo-router.
        // Para asegurar compatibilidad con tu código anterior:
        navigation.navigate("fichaproducto", { id: product.id });
    };

    const renderItem = ({ item }: { item: Product }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handleGoToDetail(item)}
            activeOpacity={0.9}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.brand}>{item.marca}</Text>
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

            <Text style={styles.name}>{item.nombre}</Text>

            <View style={styles.footerRow}>
                <View style={styles.scorePill}>
                    <Text style={styles.scoreLabel}>Valoración</Text>
                    <Text style={styles.scoreValue}>{item.valoracion ?? "-"}</Text>
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

                {loading ? (
                    <ActivityIndicator size="large" color="#594A42" style={{ marginTop: 40 }} />
                ) : (
                    <FlatList
                        data={products}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingVertical: 16 }}
                        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20, color: '#999' }}>No se encontraron recomendaciones.</Text>}
                    />
                )}
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

export default Recomendaciones;