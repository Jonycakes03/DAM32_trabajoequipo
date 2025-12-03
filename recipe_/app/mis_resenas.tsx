import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../utils/supabase";

const TAUPE = "#5b524b";

type Resena = {
    id: string;
    calificacion: number;
    nota: string;
    created_at: string;
    producto: {
        nombre: string;
        marca: string;
    };
};

export default function UserReviewsScreen() {
    const [reviews, setReviews] = useState<Resena[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    async function fetchReviews() {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from("Resenas")
            .select("id, calificacion, nota, created_at, producto:Productos(nombre, marca)")
            .eq("usuario_id", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            Alert.alert("Error", error.message);
        } else {
            // @ts-ignore
            setReviews(data || []);
        }
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            {/* Encabezado */}
            <View style={styles.headerRow}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <Ionicons name="chevron-back" size={22} color="#111" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mis Reseñas</Text>
                <View style={{ width: 22 }} />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={TAUPE} style={{ marginTop: 20 }} />
            ) : (
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    {reviews.length === 0 ? (
                        <Text style={styles.emptyText}>No has escrito reseñas aún.</Text>
                    ) : (
                        reviews.map((item) => (
                            <View key={item.id} style={styles.card}>
                                <View style={styles.cardHeader}>
                                    <View>
                                        <Text style={styles.productName}>{item.producto?.nombre || "Producto desconocido"}</Text>
                                        <Text style={styles.productBrand}>{item.producto?.marca}</Text>
                                    </View>
                                    <Text style={styles.date}>{new Date(item.created_at).toLocaleDateString()}</Text>
                                </View>
                                <View style={styles.ratingRow}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Text key={star} style={{ fontSize: 16, color: star <= item.calificacion ? "#FFD700" : "#ccc" }}>★</Text>
                                    ))}
                                </View>
                                <Text style={styles.note}>{item.nota}</Text>
                            </View>
                        ))
                    )}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    headerRow: {
        marginTop: 10,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 10,
    },
    backBtn: {
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontFamily: "Montserrat_700Bold",
        fontSize: 18,
        color: "#333",
    },

    content: { padding: 16, paddingBottom: 40 },
    emptyText: { textAlign: "center", color: "#999", marginTop: 40, fontFamily: "Montserrat_400Regular" },

    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        borderWidth: 1,
        borderColor: "#f0f0f0",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8,
    },
    productName: {
        fontFamily: "Montserrat_600SemiBold",
        fontSize: 16,
        color: "#333",
    },
    productBrand: {
        fontFamily: "Montserrat_500Medium",
        fontSize: 12,
        color: "#777",
    },
    date: {
        fontFamily: "Montserrat_400Regular",
        fontSize: 10,
        color: "#999",
    },
    ratingRow: {
        flexDirection: "row",
        marginBottom: 8,
    },
    note: {
        fontFamily: "Montserrat_400Regular",
        fontSize: 14,
        color: "#555",
        lineHeight: 20,
    },
});
