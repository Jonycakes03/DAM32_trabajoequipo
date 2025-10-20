import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function CrearCuenta() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Crear Cuenta</Text>
        <TextInput 
          style={styles.input}
          placeholder="Nombre completo"
        />
        <TextInput 
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput 
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
        />
        <TextInput 
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry
        />
        <Link href="/home" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Crear Cuenta</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});