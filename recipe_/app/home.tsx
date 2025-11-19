import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Link } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.brandBox}>
            <Text style={styles.brandCheck}>✓</Text>
          </View>
        </View>
        <Text style={styles.headerTitle}>CLEARLABEL</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.welcomeTitle}>Bienvenida a clear !!</Text>
        <Text style={styles.welcomeText}>
          Escanea cualquier producto de cuidado{"\n"}
          personal para acceder a reseñas y valoraciones.
        </Text>

        <Link href="/scan" asChild>
          <TouchableOpacity style={styles.scanCard}>
            <Feather name="camera" size={28} />
            <Text style={styles.scanTitle}>Escanea producto</Text>
            <Text style={styles.scanText}>
              Apunta tu cámara al código de{"\n"}barras de algún producto
            </Text>
          </TouchableOpacity>
        </Link>

        <View style={styles.row}>
          <CardMini
            label="Filtro"
            href="/filters"
            imageUri="https://images.ctfassets.net/6pezt69ih962/2m3yESxS6bG6g8j2vCwD3H/3a7c1f3ddf7b4f3e8c7a3bfa5d88a3e5/cerave.png"
          />
          <CardMini
            label="Busqueda"
            href="/search"
            imageUri="https://images.ctfassets.net/6pezt69ih962/6n2V8Qqk2k7iC3rY7y7w2e/4b7c0d1b2f0e4a0bb5bfc5f2f2ef7a9d/tocobo.png"
          />
        </View>

        <View style={{ alignItems: "center", marginTop: 18 }}>
          <View style={styles.featureCard}>
            <Image
              source={{
                uri: "https://images.ctfassets.net/6pezt69ih962/7gQ9n3hA0bH64vFqY2m0s/7c2d7a9f9f0d4a9c8b93/product.png",
              }}
              style={styles.featureImage}
              resizeMode="contain"
            />
            <Text style={styles.featureLabel}>Esencia</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.tabbar}>
        <Link href="/home" asChild>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="home-outline" size={24} color="#fff" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/buscar" asChild>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="search-outline" size={24} color="#fff" />
            <Text style={styles.tabLabel}>Buscar</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/listas" asChild>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="heart-outline" size={24} color="#fff" />
            <Text style={styles.tabLabel}>Listas</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/perfil" asChild>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="person-outline" size={24} color="#fff" />
            <Text style={styles.tabLabel}>Perfil</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

function CardMini({
  label,
  href,
  imageUri,
}: {
  label: string;
  href: string;
  imageUri: string;
}) {
  return (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.miniCard}>
        <Image source={{ uri: imageUri }} style={styles.miniImage} resizeMode="contain" />
        <View style={styles.miniFooter}>
          <Text style={styles.miniLabel}>{label}</Text>
          <View style={styles.miniBox}>
            <Text style={styles.miniCheck}>✓</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const TAUPE = "#5b524b";
const LIGHT_CARD = "#E8E8E8";
const HEADER_GRAY = "#D9D9D9";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 56,
    backgroundColor: HEADER_GRAY,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  headerLeft: { width: 40, alignItems: "flex-start", justifyContent: "center" },
  headerTitle: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
    letterSpacing: 2,
    color: "#111",
  },
  brandBox: {
    width: 28,
    height: 22,
    borderWidth: 2,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  brandCheck: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 14,
    color: "#111",
    lineHeight: 14,
  },
  content: {
    padding: 18,
    paddingBottom: 120,
  },
  welcomeTitle: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 18,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 8,
    color: "#111",
  },
  welcomeText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    textAlign: "center",
    color: "#444",
    marginBottom: 16,
    lineHeight: 20,
  },
  scanCard: {
    backgroundColor: LIGHT_CARD,
    borderRadius: 14,
    paddingVertical: 26,
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
  },
  scanTitle: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 18,
    color: "#333",
  },
  scanText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 13,
    textAlign: "center",
    color: "#444",
    lineHeight: 18,
  },
  row: { flexDirection: "row", gap: 16, marginTop: 6 },
  miniCard: {
    flex: 1,
    backgroundColor: LIGHT_CARD,
    borderRadius: 12,
    padding: 10,
  },
  miniImage: { width: "100%", height: 120, borderRadius: 8 },
  miniFooter: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  miniLabel: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 14,
    color: "#242424",
  },
  miniBox: {
    width: 24,
    height: 18,
    borderWidth: 2,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  miniCheck: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 12,
    color: "#111",
    lineHeight: 12,
  },
  featureCard: {
    width: 220,
    backgroundColor: LIGHT_CARD,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  featureImage: { width: 160, height: 180 },
  featureLabel: {
    marginTop: 6,
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 16,
    color: "#222",
  },
  tabbar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 10,
    backgroundColor: TAUPE,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
  },
  tabItem: { alignItems: "center", gap: 2, width: 70 },
  tabLabel: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 12,
    color: "#fff",
  },
});
