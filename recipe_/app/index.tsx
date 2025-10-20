import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Page() {
  const pages = [
    { name: "Login", path: "/login" },
    { name: "Crear Cuenta", path: "/crearcuenta" },
    { name: "Home", path: "/home" },
    { name: "Buscar", path: "/buscar" },
    { name: "Listas", path: "/listas" },
    { name: "Perfil", path: "/perfil" },
    { name: "Detalles de Lista", path: "/listas_2" },
    { name: "Resultados", path: "/resultados" },
    { name: "Ficha de Producto", path: "/fichaproducto" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Recipe App - Pages</Text>
        <Text style={styles.subtitle}>Selecciona una página para visualizar</Text>
        
        <View style={styles.linksContainer}>
          {pages.map((page) => (
            <Link key={page.path} href={page.path} asChild>
              <TouchableOpacity style={styles.linkButton}>
                <Text style={styles.linkText}>{page.name}</Text>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  linksContainer: {
    gap: 10,
  },
  linkButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  linkText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
