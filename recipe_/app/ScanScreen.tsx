// ScanScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";

export const ScanScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    if (scanned) return;
    setScanned(true);

    // Aquí puedes llamar a tu API / backend para buscar el producto
    console.log("Código escaneado:", { type, data });

    // EJEMPLO: navegar a la pantalla de detalle de producto
    // ajusta "ProductDetail" y params según tu navegación real
    navigation.navigate("ProductDetail", {
      barcode: data,
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={styles.infoText}>Solicitando acceso a la cámara…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.infoText}>
            No se otorgó permiso para usar la cámara.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.backText}>Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Escanear producto</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <View style={styles.container}>
        <View style={styles.cameraWrapper}>
          <BarCodeScanner
            onBarCodeScanned={handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />

          {/* Marco guía */}
          <View style={styles.overlay}>
            <View style={styles.row}>
              <View style={[styles.mask, styles.sideMask]} />
              <View style={styles.focused}>
                <View style={styles.cornerTL} />
                <View style={styles.cornerTR} />
                <View style={styles.cornerBL} />
                <View style={styles.cornerBR} />
              </View>
              <View style={[styles.mask, styles.sideMask]} />
            </View>
            <View style={[styles.mask, styles.bottomMask]} />
          </View>
        </View>

        <View style={styles.bottomInfo}>
          <Text style={styles.infoTitle}>
            Apunta al código de barras del producto
          </Text>
          <Text style={styles.infoText}>
            Mantén el código dentro del recuadro para analizarlo con ClearLabel.
          </Text>

          {scanned && (
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setScanned(false)}
            >
              <Text style={styles.secondaryButtonText}>Escanear otro producto</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#000",
  },
  backText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  cameraWrapper: {
    flex: 3,
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
  },
  focused: {
    flex: 4,
    aspectRatio: 1,
    borderRadius: 16,
    alignSelf: "center",
  },
  mask: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sideMask: {
    flex: 1,
  },
  bottomMask: {
    flex: 1,
  },
  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#FFFFFF",
    borderTopLeftRadius: 16,
  },
  cornerTR: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#FFFFFF",
    borderTopRightRadius: 16,
  },
  cornerBL: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: "#FFFFFF",
    borderBottomLeftRadius: 16,
  },
  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: "#FFFFFF",
    borderBottomRightRadius: 16,
  },
  bottomInfo: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#777777",
  },
  secondaryButton: {
    marginTop: 16,
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#594A42",
  },
  secondaryButtonText: {
    color: "#594A42",
    fontSize: 14,
    fontWeight: "500",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
  },
});

export default ScanScreen;
