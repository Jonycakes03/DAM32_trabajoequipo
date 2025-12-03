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
import { Link, router } from "expo-router";
import { useState } from "react";
import { supabase } from "../utils/supabase";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    async function resetPassword() {
        if (!email) {
            Alert.alert("Error", "Por favor ingresa tu correo electrónico.");
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            Alert.alert("Error", error.message);
        } else {
            Alert.alert(
                "Correo enviado",
                "Revisa tu bandeja de entrada para restablecer tu contraseña."
            );
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
                    <Text style={styles.title}>Recuperar Contraseña</Text>
                    <Text style={styles.description}>
                        Ingresa tu correo y te enviaremos las instrucciones para restablecer tu contraseña.
                    </Text>

                    <View style={styles.field}>
                        <Text style={styles.label}>Correo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="example@email.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#B1ABA6"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={resetPassword}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.primaryButtonText}>Enviar correo</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.backText}>Volver a Iniciar Sesión</Text>
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
