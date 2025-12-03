import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
// 1. Importar cliente supabase
import { supabase } from '../utils/supabase'; // Ajustar ruta si es necesario

// Definir tipo de producto
interface Producto {
  id: string;
  nombre: string;
  marca: string;
  valoracion: number | null;
  // Incluir otras columnas si es necesario
}

const ProductsScreen = () => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función asíncrona para obtener datos
    async function fetchProducts() {
      // 2. Consulta a la base de datos
      const { data, error } = await supabase
        .from('Productos')
        .select('id, nombre, marca, valoracion') // Especificar columnas
        .order('nombre', { ascending: true }); // Opcional: ordenar resultados

      if (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        setLoading(false);
        return;
      }

      // 3. Guardar datos y finalizar carga
      if (data) {
        setProducts(data as Producto[]);
        setError(null);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []); // Ejecutar solo al montar

  // --- Lógica de renderizado ---

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