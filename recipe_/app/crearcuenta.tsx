import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from "react-native";
import { Link } from "expo-router";

export default function Register() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [sex, setSex] = useState<"H" | "M" | "NB" | null>("H");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Miguel Suarez"
            placeholderTextColor="#9B9B9B"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Fecha de nacimiento</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#9B9B9B"
            value={birthdate}
            onChangeText={setBirthdate}
          />
        </View>

        <View style={[styles.field, { marginBottom: 6 }]}>
          <Text style={styles.label}>Sexo</Text>
        </View>
        <View style={{ gap: 10, marginBottom: 10 }}>
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
            label="No Binario"
            selected={sex === "NB"}
            onPress={() => setSex("NB")}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            placeholder="exaample@email.com"
            placeholderTextColor="#9B9B9B"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="contraseña segura"
            placeholderTextColor="#9B9B9B"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        
        <View style={styles.field}>
          <Text style={styles.label}>Confirmar Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="confirmar contraseña"
            placeholderTextColor="#9B9B9B"
            secureTextEntry
          />

        </View>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <Link href="/login" asChild>
        <TouchableOpacity style={styles.outlineBtn}>
          <Text style={styles.outlineBtnText}>Volver a Iniciar Sesión</Text>
        </TouchableOpacity>
      </Link>
    </View>
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
      <Text style={styles.checkLabel}>{label}</Text>
    </Pressable>
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
    fontFamily: "Montserrat_700Bold",
    fontSize: 24,
    letterSpacing: 2,
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
    fontFamily: "Montserrat_700Bold",
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
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
  },
  field: {
    marginBottom: 12,
  },
  label: {
    color: "#e9e6e3",
    marginBottom: 6,
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: "Montserrat_400Regular",
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: "#dedede",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    borderColor: "#121212",
    backgroundColor: "#ffffff",
  },
  checkMark: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 14,
    color: "#111",
    lineHeight: 14,
  },
  checkLabel: {
    color: "#e9e6e3",
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
  },
  button: {
    marginTop: 10,
    backgroundColor: DARK,
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
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
    fontFamily: "Montserrat_600SemiBold",
  },
});
