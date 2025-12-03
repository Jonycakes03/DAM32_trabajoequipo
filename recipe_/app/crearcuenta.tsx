import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Link, router } from "expo-router";
import { supabase } from "../utils/supabase";

export default function Register() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [sex, setSex] = useState<"H" | "M" | "NB" | null>("H");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    if (!email || !password || !name || !birthdate) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    setLoading(true);

    // Convertir DD/MM/AAAA a AAAA-MM-DD
    const [day, month, year] = birthdate.split("/");
    const formattedDate = `${year}-${month}-${day}`;

    // Mapear sexo a entero
    const sexMap: { [key: string]: number } = { H: 1, M: 2, NB: 3 };
    const sexValue = sex ? sexMap[sex] : null;

    const {
      data: { session, user },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert("Error", error.message);
      setLoading(false);
      return;
    }

    if (user) {
      const { error: dbError } = await supabase.from("Usuarios").insert([
        {
          id: user.id,
          nombre: name,
          fe_nac: formattedDate,
          sexo: sexValue,
          correo: email,
        },
      ]);

      if (dbError) {
        Alert.alert("Error al crear perfil", dbError.message);
      } else {
        Alert.alert(
          "Éxito",
          "Cuenta creada correctamente. Por favor inicia sesión."
        );
        router.replace("/login");
      }
    }
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo centrado */}
          <View style={styles.logoContainer}>
            <Text style={styles.brand}>CLEARLABEL</Text>
            <View style={styles.brandBox}>
              <Text style={styles.brandCheck}>✓</Text>
            </View>
          </View>

          {/* Tarjeta principal */}
          <View style={styles.card}>
            <Text style={styles.title}>Crear cuenta</Text>
            <Text style={styles.description}>
              Completa tus datos para personalizar tu experiencia en ClearLabel.
            </Text>

            <View style={styles.field}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre Apellido"
                placeholderTextColor="#B1ABA6"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Fecha de nacimiento</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#B1ABA6"
                value={birthdate}
                onChangeText={setBirthdate}
              />
            </View>

            <View style={[styles.field, { marginBottom: 6 }]}>
              <Text style={styles.label}>Sexo</Text>
            </View>

            <View style={styles.sexContainer}>
              <CheckRow
                label="Hombre"
                selected={sex === "H"}
                onPress={() => setSex("H")}
              />
              <CheckRow
                label="Mujer"
                selected={sex === "M"}
                onPress={() => setSex("M")}
              />
              <CheckRow
                label="No binario"
                selected={sex === "NB"}
                onPress={() => setSex("NB")}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Correo</Text>
              <TextInput
                style={styles.input}
                placeholder="example@email.com"
                placeholderTextColor="#B1ABA6"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="contraseña segura"
                placeholderTextColor="#B1ABA6"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Confirmar contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="confirmar contraseña"
                placeholderTextColor="#B1ABA6"
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.primaryButtonText}>Registrarse</Text>
              )}
            </TouchableOpacity>
          </View>

          <Link href="/login" asChild>
            <TouchableOpacity style={styles.outlineBtn}>
              <Text style={styles.outlineBtnText}>Volver a Iniciar Sesión</Text>
            </TouchableOpacity>
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function CheckRow({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.checkRow} onPress={onPress}>
      <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
        {selected && <Text style={styles.checkMark}>✓</Text>}
      </View>
      <Text
        style={[styles.checkLabel, selected && styles.checkLabelSelected]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

/* Paleta y estilos */
const BACKGROUND = "#FFFFFF";
const CARD_BG = "#F5F1ED";
const TEXT_MAIN = "#3B302A";
const ACCENT = "#594A42";
const DARK = "#333";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    justifyContent: "center",
  },

  /* Logo */
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 30,
    gap: 10,
  },
  brand: {
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 3,
    color: DARK,
  },
  brandBox: {
    width: 36,
    height: 30,
    borderWidth: 2,
    borderColor: DARK,
    alignItems: "center",
    justifyContent: "center",
  },
  brandCheck: {
    fontSize: 18,
    color: DARK,
    lineHeight: 18,
  },

  /* Tarjeta */
  card: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: CARD_BG,
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingVertical: 28,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 5,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: TEXT_MAIN,
    marginBottom: 6,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#6C5A52",
    marginBottom: 20,
    textAlign: "center",
  },

  field: {
    marginBottom: 12,
  },
  label: {
    color: TEXT_MAIN,
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
  },

  sexContainer: {
    gap: 8,
    marginBottom: 12,
  },

  /* Casillas de verificación */
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#D3C8C2",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    borderColor: ACCENT,
  },
  checkMark: {
    fontSize: 13,
    color: ACCENT,
    lineHeight: 13,
  },
  checkLabel: {
    color: "#7A6A61",
    fontSize: 14,
  },
  checkLabelSelected: {
    color: TEXT_MAIN,
    fontWeight: "600",
  },

  /* Botones */
  primaryButton: {
    marginTop: 10,
    backgroundColor: ACCENT,
    paddingVertical: 14,
    borderRadius: 20,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },

  outlineBtn: {
    alignSelf: "center",
    marginTop: 22,
    borderWidth: 1.5,
    borderColor: ACCENT,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  outlineBtnText: {
    color: ACCENT,
    fontSize: 15,
    fontWeight: "600",
  },
});
