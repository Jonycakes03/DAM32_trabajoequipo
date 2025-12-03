import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
    FlatList,
    Image,
    ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../utils/supabase";

const TAUPE = "#5B524B";
const BACKGROUND = "#FFFFFF";
const TEXT_MAIN = "#3B302A";
const TEXT_MUTED = "#8A7C73";
const CARD_BG = "#F7F4F1";

type Product = {
    id: string;
    nombre: string;
    marca: string;
    imagen: string;
    valoracion: number;
    ingredientes: string;
    informacion: string;
};

export default function CompareProductsScreen() {
    const navigation = useNavigation<any>();

    const [product1, setProduct1] = useState<Product | null>(null);
    const [product2, setProduct2] = useState<Product | null>(null);

    // Search Modal State
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [activeSlot, setActiveSlot] = useState<1 | 2>(1);

    useEffect(() => {
        if (searchQuery.length > 2) {
            searchProducts();
        } else {
            setSearchResults([]);
        }
    }, [searchQuery]);

    async function searchProducts() {
        setLoadingSearch(true);
        const { data } = await supabase
            .from("Productos")
            .select("*")
            .ilike("nombre", `%${searchQuery}%`)
            .limit(10);

        if (data) {
            setSearchResults(data as Product[]);
        }
        setLoadingSearch(false);
    }

    function openSearch(slot: 1 | 2) {
        setActiveSlot(slot);
        setSearchQuery("");
        setSearchResults([]);
        setModalVisible(true);
    }

    function selectProduct(product: Product) {
        if (activeSlot === 1) {
            setProduct1(product);
        } else {
            setProduct2(product);
        }
        setModalVisible(false);
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>Atrás</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Comparar productos</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.container}>
                <Text style={styles.subtitle}>
                    Selecciona dos productos para comparar sus características.
                </Text>

                {/* Selection Area */}
                <View style={styles.selectionRow}>
                    <ProductSlot
                        product={product1}
                        onPress={() => openSearch(1)}
                        label="Producto 1"
                    />
                    <View style={styles.vsCircle}>
                        <Text style={styles.vsText}>VS</Text>
                    </View>
                    <ProductSlot
                        product={product2}
                        onPress={() => openSearch(2)}
                        label="Producto 2"
                    />
                </View>

                {/* Comparison Table */}
                {product1 && product2 ? (
                    <View style={styles.table}>
                        <Row label="Nombre" left={product1.nombre} right={product2.nombre} isHeader />
                        <Row label="Marca" left={product1.marca} right={product2.marca} />
                        <Row
                            label="Valoración"
                            left={product1.valoracion ? `${product1.valoracion}/5` : "-"}
                            right={product2.valoracion ? `${product2.valoracion}/5` : "-"}
                        />
                        <Row label="Ingredientes" left={product1.ingredientes} right={product2.ingredientes} />
                        <Row label="Información" left={product1.informacion} right={product2.informacion} />
                    </View>
                ) : (
                    <View style={styles.placeholderBox}>
                        <Text style={styles.placeholderText}>
                            Selecciona ambos productos para ver la tabla comparativa.
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* Search Modal */}
            <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Seleccionar Producto {activeSlot}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar producto..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus
                    />

                    {loadingSearch ? (
                        <ActivityIndicator size="large" color={TAUPE} style={{ marginTop: 20 }} />
                    ) : (
                        <FlatList
                            data={searchResults}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ padding: 16 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.searchItem}
                                    onPress={() => selectProduct(item)}
                                >
                                    {item.imagen && (
                                        <Image source={{ uri: item.imagen }} style={styles.searchImage} />
                                    )}
                                    <View>
                                        <Text style={styles.searchName}>{item.nombre}</Text>
                                        <Text style={styles.searchBrand}>{item.marca}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                </View>
            </Modal>
        </SafeAreaView>
    );
}

function ProductSlot({ product, onPress, label }: { product: Product | null, onPress: () => void, label: string }) {
    return (
        <TouchableOpacity style={styles.slot} onPress={onPress}>
            {product ? (
                <>
                    {product.imagen ? (
                        <Image source={{ uri: product.imagen }} style={styles.slotImage} />
                    ) : (
                        <View style={[styles.slotImage, { backgroundColor: "#eee" }]} />
                    )}
                    <Text style={styles.slotName} numberOfLines={2}>{product.nombre}</Text>
                    <Text style={styles.changeText}>Cambiar</Text>
                </>
            ) : (
                <>
                    <View style={styles.addIcon}>
                        <Ionicons name="add" size={30} color="#ccc" />
                    </View>
                    <Text style={styles.slotLabel}>{label}</Text>
                </>
            )}
        </TouchableOpacity>
    );
}

function Row({ label, left, right, isHeader }: { label: string, left: string, right: string, isHeader?: boolean }) {
    return (
        <View style={styles.row}>
            <Text style={styles.rowLabel}>{label}</Text>
            <View style={styles.rowValues}>
                <Text style={[styles.value, styles.leftValue, isHeader && styles.headerValue]}>{left}</Text>
                <Text style={[styles.value, styles.rightValue, isHeader && styles.headerValue]}>{right}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: BACKGROUND },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    backText: { color: "#594A42", fontSize: 16 },
    title: { fontSize: 18, fontWeight: "600", color: "#333" },
    container: { flex: 1, paddingHorizontal: 16 },
    subtitle: { fontSize: 14, color: "#777", marginBottom: 16, textAlign: "center" },

    selectionRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    slot: {
        width: "42%",
        height: 160,
        backgroundColor: CARD_BG,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: "#E1D6CF",
    },
    slotImage: { width: 60, height: 60, borderRadius: 8, marginBottom: 8 },
    slotName: { fontSize: 12, fontWeight: "600", textAlign: "center", color: TEXT_MAIN, marginBottom: 4 },
    slotLabel: { fontSize: 14, color: TEXT_MUTED },
    addIcon: { marginBottom: 8 },
    changeText: { fontSize: 11, color: TAUPE, textDecorationLine: "underline" },

    vsCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#E1D6CF",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
    },
    vsText: { fontSize: 12, fontWeight: "700", color: TAUPE },

    table: {
        backgroundColor: CARD_BG,
        borderRadius: 12,
        padding: 12,
        marginBottom: 40,
    },
    row: {
        borderBottomWidth: 1,
        borderBottomColor: "#E1D6CF",
        paddingVertical: 12,
    },
    rowLabel: { fontSize: 12, color: TEXT_MUTED, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 },
    rowValues: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
    value: { flex: 1, fontSize: 13, color: TEXT_MAIN, lineHeight: 18 },
    leftValue: { textAlign: "left" },
    rightValue: { textAlign: "right" },
    headerValue: { fontWeight: "700", fontSize: 14 },

    placeholderBox: {
        padding: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    placeholderText: { color: "#ccc", textAlign: "center" },

    // Modal
    modalContainer: { flex: 1, backgroundColor: "#fff", padding: 16 },
    modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
    modalTitle: { fontSize: 18, fontWeight: "700", color: TEXT_MAIN },
    closeText: { color: "blue", fontSize: 16 },
    searchInput: {
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
    },
    searchItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    searchImage: { width: 40, height: 40, borderRadius: 6, marginRight: 12, backgroundColor: "#eee" },
    searchName: { fontSize: 14, fontWeight: "600", color: TEXT_MAIN },
    searchBrand: { fontSize: 12, color: TEXT_MUTED },
});