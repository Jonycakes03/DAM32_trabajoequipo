import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert, Linking } from 'react-native';
// Remove BarCodeScanner and BarCodeScannerResult as they are no longer needed
// import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner'; 
import { CameraView, Camera, BarcodeScanningResult } from 'expo-camera'; // Keep CameraView and Camera, import BarCodeScannerResult from 'expo-camera'
import { supabase } from '../utils/supabase'; // Adjust path to your Supabase client
import { useRouter } from 'expo-router';

// Define the type for the product data (adjust if your table has more/fewr fields)
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

  // Request camera permission when the screen loads
  useEffect(() => {
    // Note: Camera.requestCameraPermissionsAsync() is correct for getting general camera access
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getCameraPermissions();
  }, []);

  // --- Supabase Query Function ---
  const searchProductInDB = async (barcodeData: string) => {
    setLoading(true);
    // Instead of querying here, just navigate to resultados and pass barcode
    router.push({ pathname: '/resultados', params: { barcode: barcodeData } });
    setLoading(false);
    setScanned(false);
  };

  // --- Barcode Handling Function ---
  // The structure of the result object { type, data } is the same as BarCodeScanner
  const handleBarCodeScanned = (result: BarcodeScanningResult) => {
    const { type, data } = result;

    setScanned(true); // Prevent repeated scanning while processing
    console.log(`Tipo: ${type}, Data: ${data}`);

    Alert.alert(
      'Código Escaneado',
      `Código: ${data}\nBuscando en la base de datos...`,
      [{ text: 'OK', onPress: () => searchProductInDB(data) }]
    );
  };

  // --- Permission Handling Rendering ---
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

  // --- Main Render: Changed to CameraView ---
  return (
    <View style={styles.container}>
      <CameraView
        // 👈 Use CameraView instead of BarCodeScanner
        onBarcodeScanned={scanned || loading ? undefined : handleBarCodeScanned}
        // Set the barcode scanning formats (optional, but good practice)
        // Note: Expo often defaults to all formats, but specifying can be safer.
        // barcodeScannerSettings={{
        //   barcodeTypes: ['ean13', 'upc_a', 'upc_e', 'ean8', 'code39', 'code128'],
        // }}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Loading overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Buscando...</Text>
        </View>
      )}

      {/* Scan instruction/guide */}
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
  // Scanner overlay styles for visual guidance
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