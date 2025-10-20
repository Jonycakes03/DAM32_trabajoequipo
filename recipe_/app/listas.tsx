import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Link } from "expo-router";

export default function Listas() {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>Crear Nueva Lista</Text>
      </TouchableOpacity>
      
      <View style={styles.listContainer}>
        <Link href="/listas_2" asChild>
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listTitle}>Mis Recetas Favoritas</Text>
            <Text style={styles.listInfo}>5 recetas</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/listas_2" asChild>
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listTitle}>Para Cocinar</Text>
            <Text style={styles.listInfo}>3 recetas</Text>
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
    padding: 20,
  },
  createButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  createButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    gap: 15,
  },
  listItem: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  listInfo: {
    color: '#666',
  },
});