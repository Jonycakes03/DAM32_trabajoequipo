import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.brandRow}>
        <Text style={styles.brand}>CLEARLABEL</Text>
        <View style={styles.brandBox}>
          <Text style={styles.brandCheck}>✓</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.field}>
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#9B9B9B"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="password segura"
            secureTextEntry
            placeholderTextColor="#9B9B9B"
          />
        </View>

        <Link href="/home" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/forgot" asChild>
          <TouchableOpacity>
            <Text style={styles.forgotText}>Se te olvidó la contraseña?</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <Link href="/register" asChild>
        <TouchableOpacity style={styles.outlineBtn}>
          <Text style={styles.outlineBtnText}>Crear Cuenta</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const TAUPE = "#5b524b";
const DARK = "#2f2f2f";
const BORDER = "#4a423c";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 60,
    marginBottom: 24,
    alignSelf: "flex-start",
  },
  brand: {
    fontSize: 24,
    letterSpacing: 2,
    fontWeight: "700",
    color: "#111",
  },
  brandBox: {
    width: 36,
    height: 28,
    borderWidth: 2,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  brandCheck: {
    fontSize: 18,
    color: "#111",
    lineHeight: 18,
  },
  card: {
    alignSelf: "center",
    width: "88%",
    maxWidth: 520,
    backgroundColor: TAUPE,
    borderRadius: 12,
    padding: 24,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
    marginTop: 24,
  },
  field: {
    marginBottom: 8,
  },
  label: {
    color: "#e9e6e3",
    marginBottom: 6,
    fontSize: 16,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  button: {
    marginTop: 14,
    backgroundColor: DARK,
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  forgotText: {
    marginTop: 14,
    color: "#1f1f1f",
    textDecorationLine: "underline",
  },
  outlineBtn: {
    alignSelf: "center",
    marginTop: 28,
    borderWidth: 2,
    borderColor: BORDER,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  outlineBtnText: {
    color: "#3a352f",
    fontSize: 16,
    fontWeight: "600",
  },
});
