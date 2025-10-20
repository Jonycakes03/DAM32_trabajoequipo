import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Buscar() {
  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar recetas..."
        />
        <Link href="/resultados" asChild>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categorías Populares</Text>
        {/* Add your categories here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  searchSection: {
    marginTop: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  categoriesSection: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});