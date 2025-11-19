import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
// 1. Import the supabase client from your utility file
import { supabase } from '../utils/supabase'; // Adjust the path as necessary

// Define the type for your product data for TypeScript safety
interface Producto {
  id: string;
  nombre: string;
  marca: string;
  valoracion: number | null;
  // You can include other columns here like imagen, ingredientes, etc.
}

const ProductsScreen = () => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Define the async function to fetch the data
    async function fetchProducts() {
      // 2. The core database query: .from('TableName').select('ColumnsToRetrieve')
      const { data, error } = await supabase
        .from('Productos')
        .select('id, nombre, marca, valoracion') // Specify the columns you want
        .order('nombre', { ascending: true }); // Optional: order the results

      if (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        setLoading(false);
        return;
      }

      // 3. Store the fetched data and finish loading
      if (data) {
        setProducts(data as Producto[]);
        setError(null);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []); // Empty dependency array means this runs only once on mount

  // --- Rendering Logic ---

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1E90FF" />
        <Text>Cargando productos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error al cargar: {error}</Text>
        <Text>Verifica tu conexión y las políticas de RLS.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Producto }) => (
    <View style={styles.productItem}>
      <Text style={styles.name}>{item.nombre}</Text>
      <Text style={styles.brand}>Marca: {item.marca}</Text>
      <Text style={styles.rating}>Valoración: {item.valoracion ?? 'N/A'} ⭐</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Productos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No se encontraron productos.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  productItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#1E90FF',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    color: '#555',
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFA500',
    marginTop: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProductsScreen;