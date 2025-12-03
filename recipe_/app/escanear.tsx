import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert, Linking } from 'react-native';
// BarCodeScanner eliminado
// import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner'; 
import { CameraView, Camera, BarcodeScanningResult } from 'expo-camera'; // Mantener CameraView y Camera
import { supabase } from '../utils/supabase'; // Ajustar ruta cliente Supabase
import { useRouter } from 'expo-router';

// Definir tipo de producto
interface Producto {
  id: string;
  nombre: string;
  marca: string;
  informacion: string;
}

const ScanScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Solicitar permiso de cámara al cargar
  useEffect(() => {
    // Nota: Solicitar permisos generales
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getCameraPermissions();
  }, []);

  // --- Función de consulta Supabase ---
  const searchProductInDB = async (barcodeData: string) => {
    setLoading(true);
    // Navegar a resultados con código de barras
    router.push({ pathname: '/resultados', params: { barcode: barcodeData } });
    setLoading(false);
    setScanned(false);
  };

  // --- Manejo de código de barras ---
  // Estructura de resultado igual a BarCodeScanner
  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    const { type, data } = result;

    setScanned(true); // Evitar escaneo repetido
    console.log(`Tipo: ${type}, Data: ${data}`);

    Alert.alert(
      'Código Escaneado',
      `Código: ${data}\nBuscando en la base de datos...`,
      [{ text: 'OK', onPress: () => searchProductInDB(data) }]
    );
  };

  // --- Renderizado de permisos ---
  if (hasPermission === null) {
    return <Text>Solicitando permiso de la cámara...</Text>;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>Acceso a la cámara denegado.</Text>
        <Button
          title={'Abrir Configuración'}
          onPress={() => Linking.openSettings()}
        />
      </View>
    );
  }

  // --- Renderizado principal: CameraView ---
  return (
    <View style={styles.container}>
      <CameraView
        // 👈 Usar CameraView
        onBarcodeScanned={scanned || loading ? undefined : handleBarCodeScanned}
        // Formatos de código de barras (opcional)
        // Nota: Especificar formatos es más seguro
        // barcodeScannerSettings={{
        //   barcodeTypes: ['ean13', 'upc_a', 'upc_e', 'ean8', 'code39', 'code128'],
        // }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Capa de carga */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Buscando...</Text>
        </View>
      )}

      {/* Guía de escaneo */}
      <View style={styles.layerTop} />
      <View style={styles.layerCenter}>
        <View style={styles.layerLeft} />
        <View style={styles.scannerWindow} />
        <View style={styles.layerRight} />
      </View>
      <View style={styles.layerBottom}>
        <Text style={styles.instructionText}>
          Apunta la cámara al código de barras
        </Text>
      </View>
    </View>
  );
};

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  // Estilos de capa de escáner
  layerTop: {
    flex: 2,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  scannerWindow: {
    flex: 5,
    borderWidth: 2,
    borderColor: 'white',
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity,
    paddingTop: 30,
    alignItems: 'center',
  },
  instructionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
  }
});

export default ScanScreen;