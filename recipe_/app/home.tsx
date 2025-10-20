import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Bienvenido a Recipe App</Text>
        <View style={styles.buttonGrid}>
          <Link href="/buscar" asChild>
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.navButtonText}>Buscar Recetas</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/listas" asChild>
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.navButtonText}>Mis Listas</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/perfil" asChild>
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.navButtonText}>Mi Perfil</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  buttonGrid: {
    width: '100%',
    gap: 15,
    marginTop: 20,
  },
  navButton: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  navButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});