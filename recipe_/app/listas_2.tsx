import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";

export default function Listas2() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.listName}>Mis Recetas Favoritas</Text>
        <Text style={styles.listInfo}>5 recetas</Text>
      </View>

      <View style={styles.recipeList}>
        <Link href="/fichaproducto" asChild>
          <TouchableOpacity style={styles.recipeItem}>
            <View style={styles.recipePlaceholder} />
            <View style={styles.recipeDetails}>
              <Text style={styles.recipeName}>Pasta Carbonara</Text>
              <Text style={styles.recipeTime}>30 min</Text>
            </View>
          </TouchableOpacity>
        </Link>

        <Link href="/fichaproducto" asChild>
          <TouchableOpacity style={styles.recipeItem}>
            <View style={styles.recipePlaceholder} />
            <View style={styles.recipeDetails}>
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
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  listInfo: {
    color: '#666',
  },
  recipeList: {
    padding: 20,
    gap: 15,
  },
  recipeItem: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  recipePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#ddd',
  },
  recipeDetails: {
    flex: 1,
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