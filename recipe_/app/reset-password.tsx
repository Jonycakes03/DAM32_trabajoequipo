import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { supabase } from "../utils/supabase";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function updatePassword() {
        if (!password || !confirmPassword) {
            Alert.alert("Error", "Por favor completa todos los campos.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden.");
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.updateUser({
            password: password,
        });

        if (error) {
            Alert.alert("Error", error.message);
        } else {
            Alert.alert("Éxito", "Tu contraseña ha sido actualizada.");
            router.back();
        }
        setLoading(false);
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                {/* Logo centrado */}
                <View style={styles.logoContainer}>
                    <Text style={styles.brand}>CLEARLABEL</Text>
                    <View style={styles.brandBox}>
                        <Text style={styles.brandCheck}>✓</Text>
                    </View>
                </View>

                {/* Tarjeta principal */}
                <View style={styles.card}>
                    <Text style={styles.title}>Nueva Contraseña</Text>
                    <Text style={styles.description}>
                        Ingresa tu nueva contraseña para actualizar tu cuenta.
                    </Text>

                    <View style={styles.field}>
                        <Text style={styles.label}>Nueva Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nueva contraseña"
                            secureTextEntry
                            placeholderTextColor="#B1ABA6"
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <View style={styles.field}>
                        <Text style={styles.label}>Confirmar Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar contraseña"
                            secureTextEntry
                            placeholderTextColor="#B1ABA6"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={updatePassword}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.primaryButtonText}>Actualizar contraseña</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.backText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const BACKGROUND = "#FFFFFF";
const CARD_BG = "#F5F1ED";
const TEXT_MAIN = "#3B302A";
const ACCENT = "#594A42";
const DARK = "#333";

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: BACKGROUND,
    },

    container: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: "center",
        paddingBottom: 32,
    },

    /* Logo */
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 32,
        gap: 10,
    },
    brand: {
        fontSize: 26,
        fontWeight: "700",
        letterSpacing: 3,
        color: DARK,
    },
    brandBox: {
        width: 36,
        height: 30,
        borderWidth: 2,
        borderColor: DARK,
        alignItems: "center",
        justifyContent: "center",
    },
    brandCheck: {
        fontSize: 18,
        color: DARK,
        lineHeight: 18,
    },

    /* Tarjeta */
    card: {
        width: "100%",
        backgroundColor: CARD_BG,
        borderRadius: 24,
        paddingHorizontal: 22,
        paddingVertical: 30,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 14,
        elevation: 5,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        color: TEXT_MAIN,
        marginBottom: 6,
        textAlign: "center",
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        color: "#6C5A52",
        marginBottom: 20,
        textAlign: "center",
    },

    field: {
        marginBottom: 14,
    },
    label: {
        color: TEXT_MAIN,
        fontSize: 14,
        marginBottom: 6,
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 14,
    },

    /* Botones */
    primaryButton: {
        marginTop: 10,
        backgroundColor: ACCENT,
        paddingVertical: 14,
        borderRadius: 20,
    },
    primaryButtonText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
    },

    backText: {
        marginTop: 16,
        color: "#6C5A52",
        fontSize: 13,
        textDecorationLine: "underline",
        textAlign: "center",
    },
});
