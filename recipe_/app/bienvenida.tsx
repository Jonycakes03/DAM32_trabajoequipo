// OnboardingScreen.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

type Slide = {
    id: number;
    title: string;
    description: string;
};

const SLIDES: Slide[] = [
    {
        id: 1,
        title: "Bienvenidx a CLEARLABEL",
        description:
            "Analiza cualquier producto de cuidado personal y descubre su nivel de seguridad en segundos.",
    },
    {
        id: 2,
        title: "Tu piel, tu rutina",
        description:
            "ClearLabel adapta los resultados según tu tipo de piel, metas y los ingredientes que deseas evitar.",
    },
    {
        id: 3,
        title: "Escanea y decide mejor",
        description:
            "Escanea el código de barras, revisa ingredientes, alertas y recomendaciones personalizadas.",
    },
];

export const OnboardingScreen: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigation = useNavigation<any>();

    const isLastSlide = currentIndex === SLIDES.length - 1;

    const handleNext = () => {
        if (!isLastSlide) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            // AJUSTA ESTE NOMBRE AL DE TU RUTA DE LOGIN / HOME
            navigation.navigate("login");
        }
    };

    const handleSkip = () => {
        // Si el usuario quiere saltarse el onboarding
        navigation.navigate("login");
    };

    const slide = SLIDES[currentIndex];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Logo / Nombre app */}
                <Text style={styles.logo}>CLEARLABEL ✓</Text>

                {/* Contenido del slide */}
                <View style={styles.card}>
                    <Text style={styles.title}>{slide.title}</Text>
                    <Text style={styles.description}>{slide.description}</Text>
                </View>

                {/* Indicadores de páginas */}
                <View style={styles.dotsContainer}>
                    {SLIDES.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                index === currentIndex && styles.dotActive,
                            ]}
                        />
                    ))}
                </View>

                {/* Botones inferiores */}
                <View style={styles.buttonsRow}>
                    {!isLastSlide ? (
                        <TouchableOpacity onPress={handleSkip}>
                            <Text style={styles.skipText}>Omitir</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={{ width: 60 }} /> // espacio vacío para alinear
                    )}

                    <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
                        <Text style={styles.primaryButtonText}>
                            {isLastSlide ? "Comenzar" : "Siguiente"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: "space-between",
        paddingBottom: 32,
    },
    logo: {
        marginTop: 16,
        fontSize: 22,
        fontWeight: "600",
        letterSpacing: 2,
        color: "#333333",
    },
    card: {
        marginTop: 40,
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 32,
        borderRadius: 24,
        backgroundColor: "#F5F1ED",
        alignSelf: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#3B302A",
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
        color: "#6C5A52",
    },
    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 16,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#D3C8C2",
        marginHorizontal: 4,
    },
    dotActive: {
        width: 18,
        backgroundColor: "#594A42",
    },
    buttonsRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    skipText: {
        fontSize: 16,
        color: "#999999",
    },
    primaryButton: {
        backgroundColor: "#594A42",
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 24,
    },
    primaryButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default OnboardingScreen;