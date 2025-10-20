import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Resultados() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>Resultados de búsqueda</Text>
        <Text style={styles.resultsCount}>12 recetas encontradas</Text>
      </View>

      <View style={styles.recipeGrid}>
        <Link href="/fichaproducto" asChild>
          <TouchableOpacity style={styles.recipeCard}>
            <View style={styles.recipePlaceholder} />
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeName}>Pasta Carbonara</Text>
              <Text style={styles.recipeTime}>30 min</Text>
            </View>
          </TouchableOpacity>
        </Link>

        <Link href="/fichaproducto" asChild>
          <TouchableOpacity style={styles.recipeCard}>
            <View style={styles.recipePlaceholder} />
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeName}>Ensalada César</Text>
              <Text style={styles.recipeTime}>15 min</Text>
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  resultsHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultsCount: {
    color: '#666',
  },
  recipeGrid: {
    padding: 15,
    gap: 15,
  },
  recipeCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  recipePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#ddd',
  },
  recipeInfo: {
    padding: 15,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  recipeTime: {
    color: '#666',
  },
});