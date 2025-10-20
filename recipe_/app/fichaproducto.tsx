import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function FichaProducto() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imagePlaceholderText}>Imagen de la Receta</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Pasta Carbonara</Text>
        
        <View style={styles.metadata}>
          <Text style={styles.metaItem}>⏱️ 30 minutos</Text>
          <Text style={styles.metaItem}>👥 4 porciones</Text>
          <Text style={styles.metaItem}>⭐ 4.5</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredientes</Text>
          <Text style={styles.ingredient}>• 400g de pasta</Text>
          <Text style={styles.ingredient}>• 200g de panceta</Text>
          <Text style={styles.ingredient}>• 4 huevos</Text>
          <Text style={styles.ingredient}>• 100g de queso parmesano</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preparación</Text>
          <Text style={styles.step}>1. Cocer la pasta en agua con sal</Text>
          <Text style={styles.step}>2. Mientras tanto, dorar la panceta</Text>
          <Text style={styles.step}>3. Mezclar huevos con queso rallado</Text>
          <Text style={styles.step}>4. Combinar todo y servir</Text>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Guardar en Lista</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imagePlaceholder: {
    width: '100%',
    height: 300,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#666',
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
  },
  metaItem: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 5,
  },
  step: {
    fontSize: 16,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});