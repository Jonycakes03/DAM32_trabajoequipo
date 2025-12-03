import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Link } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.headerBar}>
          <View style={styles.headerSide}>
            <View style={styles.brandBox}>
              <Text style={styles.brandCheck}>✓</Text>
            </View>
          </View>

          <Text style={styles.headerTitle}>CLEARLABEL</Text>

          {/* lado derecho vacío para centrar */}
          <View style={styles.headerSide} />
        </View>

        {/* CONTENIDO */}
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.welcomeTitle}>Bienvenidx a clear !!</Text>
          <Text style={styles.welcomeText}>
            Escanea cualquier producto de cuidado{"\n"}
            personal para acceder a reseñas y valoraciones.
          </Text>

          {/* CARD ESCANEAR */}
          <Link href="/escanear" asChild>
            <TouchableOpacity style={styles.scanCard}>
              <View style={styles.scanIconWrapper}>
                <Feather name="camera" size={26} color={ACCENT} />
              </View>

              <Text style={styles.scanTitle}>Escanea producto</Text>
              <Text style={styles.scanText}>
                Apunta tu cámara al código de{"\n"}barras de algún producto
              </Text>
            </TouchableOpacity>
          </Link>

          {/* FILTRO / BUSQUEDA (MISMAS RUTAS DEL ORIGINAL) */}
          <View style={styles.row}>
            <CardMini
              label="Filtro"
              href="/resultados"
              imageUri="https://cdn-icons-png.freepik.com/512/6711/6711481.png"
            />
            <CardMini
              label="Busqueda"
              href="/buscar"
              imageUri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUbeaH2AmDReHSkT8leuAWIEimPMru0EJDYg&s"
            />

          </View>
          <View style={styles.row}>
            <CardMini
              label="Comparar"
              href="/comparar"
              imageUri="https://cdn-icons-png.flaticon.com/512/4412/4412532.png"
            />
          </View>

          {/* FEATURE (MISMO CONTENIDO DEL ORIGINAL) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recomendado para ti</Text>

            <Link href="/recomendaciones" asChild>
              <TouchableOpacity style={styles.featureCard}>
                <Image
                  source={{
                    uri: "https://xgentech.net/cdn/shop/articles/pexels-n-voitkevich-7852731_28b2956f-23f8-46af-b1fb-a9cd91c9fe74.jpg?v=1762440996",
                  }}
                  style={styles.featureImage}
                  resizeMode="contain"
                />
                <Text style={styles.featureLabel}>Tendencias</Text>
                <Text style={styles.featureText}>
                  Mantente al dia con los mejores productos
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </View>

      {/* TABBAR (IGUAL QUE ORIGINAL) */}
      <View style={styles.tabbar}>
        <Link href="/home" asChild>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="home-outline" size={22} color="#fff" />
            <Text style={styles.tabLabel}>Home</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/buscar" asChild>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="search-outline" size={22} color="#fff" />
            <Text style={styles.tabLabel}>Buscar</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/listas" asChild>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="heart-outline" size={22} color="#fff" />
            <Text style={styles.tabLabel}>Listas</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/perfil" asChild>
          <TouchableOpacity style={styles.tabItem}>
            <Ionicons name="person-outline" size={22} color="#fff" />
            <Text style={styles.tabLabel}>Perfil</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
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
        <Image source={{ uri: imageUri }} style={styles.miniImage} resizeMode="cover" />
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

/* --- Colores estilo “segundo diseño” --- */
const BACKGROUND = "#FFFFFF";
const HEADER_BG = "#F5F1ED";
const CARD_BG = "#F5F1ED";
const ACCENT = "#594A42";
const TEXT_MAIN = "#3B302A";
const TEXT_MUTED = "#7A6A61";
const TAUPE = "#5B524B";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  container: {
    flex: 1,
    paddingBottom: 80, // espacio para la tabbar flotante
  },

  /* HEADER */
  headerBar: {
    height: 64,
    backgroundColor: HEADER_BG,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerSide: {
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    letterSpacing: 5,
    color: TEXT_MAIN,
    fontWeight: "600",
  },
  brandBox: {
    width: 30,
    height: 24,
    borderWidth: 2,
    borderColor: TEXT_MAIN,
    alignItems: "center",
    justifyContent: "center",
  },
  brandCheck: {
    fontSize: 14,
    color: TEXT_MAIN,
    lineHeight: 14,
  },

  /* CONTENT */
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 120,
    gap: 18,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: TEXT_MAIN,
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 14,
    color: TEXT_MUTED,
    textAlign: "center",
    lineHeight: 20,
  },

  /* SCAN CARD */
  scanCard: {
    marginTop: 8,
    backgroundColor: CARD_BG,
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  scanIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  scanTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: TEXT_MAIN,
    marginBottom: 6,
  },
  scanText: {
    fontSize: 13,
    color: TEXT_MUTED,
    textAlign: "center",
    lineHeight: 18,
  },

  /* MINI CARDS */
  row: {
    flexDirection: "row",
    gap: 14,
  },
  miniCard: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 10,
  },
  miniImage: {
    width: "100%",
    height: 110,
    borderRadius: 14,
    backgroundColor: BACKGROUND,
  },
  miniFooter: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  miniLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: TEXT_MAIN,
  },
  miniBox: {
    width: 24,
    height: 18,
    borderWidth: 2,
    borderColor: TEXT_MAIN,
    alignItems: "center",
    justifyContent: "center",
  },
  miniCheck: {
    fontSize: 12,
    color: TEXT_MAIN,
    lineHeight: 12,
  },

  /* FEATURE */
  section: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: TEXT_MAIN,
    marginBottom: 8,
  },
  featureCard: {
    backgroundColor: CARD_BG,
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  featureImage: {
    width: 160,
    height: 160,
    marginBottom: 8,
  },
  featureLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: TEXT_MAIN,
  },
  featureText: {
    fontSize: 13,
    color: TEXT_MUTED,
    marginTop: 4,
    textAlign: "center",
  },

  /* TABBAR */
  tabbar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 10,
    backgroundColor: TAUPE,
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
  },
  tabItem: {
    alignItems: "center",
    gap: 2,
    width: 70,
  },
  tabLabel: {
    fontSize: 12,
    color: "#FFFFFF",
  },
});
