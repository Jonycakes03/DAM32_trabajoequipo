import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../utils/supabase";

const TAUPE = "#5B524B";
const BACKGROUND = "#FFFFFF";
const TEXT_MAIN = "#3B302A";
const TEXT_MUTED = "#8A7C73";
const DANGER = "#D9534F";

export default function SettingsScreen() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        setLoading(true);
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (user) {
            const { data } = await supabase
                .from("Usuarios")
                .select("nombre")
                .eq("id", user.id)
                .single();

            if (data) {
                setName(data.nombre || "");
            }
        }
        setLoading(false);
    }

    async function handleUpdateName() {
        if (!name.trim()) {
            Alert.alert("Error", "El nombre no puede estar vacío");
            return;
        }

        setUpdating(true);
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (user) {
            const { error } = await supabase
                .from("Usuarios")
                .update({ nombre: name })
                .eq("id", user.id);

            if (error) {
                Alert.alert("Error", "No se pudo actualizar el nombre");
            } else {
                Alert.alert("Éxito", "Nombre actualizado correctamente");
            }
        }
        setUpdating(false);
    }

    function confirmDeleteReviews() {
        Alert.alert(
            "Borrar reseñas",
            "¿Estás seguro de que quieres borrar todas tus reseñas? Esta acción no se puede deshacer.",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Borrar", style: "destructive", onPress: handleDeleteReviews },
            ]
        );
    }

    async function handleDeleteReviews() {
        setUpdating(true);
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (user) {
            const { error } = await supabase
                .from("Resenas")
                .delete()
                .eq("usuario_id", user.id);

            if (error) {
                Alert.alert("Error", error.message);
            } else {
                Alert.alert("Éxito", "Tus reseñas han sido eliminadas");
            }
        }
        setUpdating(false);
    }

    function confirmDeleteAccount() {
        Alert.alert(
            "Borrar cuenta",
            "¿Estás seguro de que quieres borrar tu cuenta? Se eliminarán tus datos y reseñas. Esta acción es irreversible.",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Borrar Cuenta", style: "destructive", onPress: handleDeleteAccount },
            ]
        );
    }

    async function handleDeleteAccount() {
        setUpdating(true);
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        // 1. Delete reviews (manual cascade if needed)
        await supabase.from("Resenas").delete().eq("usuario_id", user.id);

        // 2. Delete lists (manual cascade if needed)
        await supabase.from("Listas").delete().eq("usuario_id", user.id);

        // 3. Delete profile
        const { error: profileError } = await supabase
            .from("Usuarios")
            .delete()
            .eq("id", user.id);

        if (profileError) {
            Alert.alert("Error", "No se pudo eliminar el perfil: " + profileError.message);
            setUpdating(false);
            return;
        }

        // 4. Sign out
        await supabase.auth.signOut();

        Alert.alert("Cuenta eliminada", "Tu cuenta ha sido eliminada correctamente.");
        router.replace("/login");
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color={TEXT_MAIN} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ajustes</Text>
                <View style={{ width: 40 }} />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={TAUPE} style={{ marginTop: 40 }} />
            ) : (
                <ScrollView contentContainerStyle={styles.content}>
                    {/* Section: Profile */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Perfil</Text>
                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Tu nombre"
                            placeholderTextColor={TEXT_MUTED}
                        />
                        <TouchableOpacity
                            style={[styles.btn, styles.btnPrimary]}
                            onPress={handleUpdateName}
                            disabled={updating}
                        >
                            {updating ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.btnTextPrimary}>Actualizar Nombre</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Section: Data Management */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Datos</Text>
                        <Text style={styles.description}>
                            Administra tus datos generados en la aplicación.
                        </Text>

                        <TouchableOpacity
                            style={[styles.btn, styles.btnOutline]}
                            onPress={confirmDeleteReviews}
                            disabled={updating}
                        >
                            <Text style={styles.btnTextOutline}>Borrar mis reseñas</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Section: Danger Zone */}
                    <View style={[styles.section, styles.dangerSection]}>
                        <Text style={[styles.sectionTitle, { color: DANGER }]}>Zona de Peligro</Text>
                        <Text style={styles.description}>
                            Estas acciones son irreversibles.
                        </Text>

                        <TouchableOpacity
                            style={[styles.btn, styles.btnDanger]}
                            onPress={confirmDeleteAccount}
                            disabled={updating}
                        >
                            <Text style={styles.btnTextDanger}>Borrar Cuenta</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: BACKGROUND,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    backBtn: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: TEXT_MAIN,
    },
    content: {
        padding: 20,
    },
    section: {
        marginBottom: 30,
        backgroundColor: "#FAFAFA",
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#EEEEEE",
    },
    dangerSection: {
        borderColor: "#FADBD8",
        backgroundColor: "#FEF9E7",
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: TEXT_MAIN,
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        color: TEXT_MAIN,
        marginBottom: 6,
        fontWeight: "500",
    },
    description: {
        fontSize: 13,
        color: TEXT_MUTED,
        marginBottom: 16,
        lineHeight: 18,
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        color: TEXT_MAIN,
        marginBottom: 16,
    },
    btn: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    btnPrimary: {
        backgroundColor: TAUPE,
    },
    btnOutline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: TAUPE,
    },
    btnDanger: {
        backgroundColor: DANGER,
    },
    btnTextPrimary: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 14,
    },
    btnTextOutline: {
        color: TAUPE,
        fontWeight: "600",
        fontSize: 14,
    },
    btnTextDanger: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 14,
    },
});
