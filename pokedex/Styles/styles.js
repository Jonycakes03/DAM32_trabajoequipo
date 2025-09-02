
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    paddingTop: 85,
    paddingHorizontal: 16,
  },

 
  header: {
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    color: "#CC0000",
  },

  inputContainer: {
    backgroundColor: "#FFDE00",
    borderRadius: 10,
    padding: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#FFDE00",
  },

  
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333333",
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#f3f0f1ff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 16,
  },

  
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginVertical: 6,
    padding: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ffffffff",
    gap: 12,
  },
  img: {
    width: 84,
    height: 84,
    backgroundColor: "#fff0f6",
    borderRadius: 12,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "800",
    color: "#e1d6d6ff",
  },
  tipo: {
    marginTop: 2,
    marginBottom: 8,
    fontSize: 14,
    color: "#666",
  },


  capturadoTexto: {
    color: "#28a36a",
    textDecorationLine: "line-through",
  },

  
  btnAtrapado: {
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4467f3ff",
    alignSelf: "flex-start",
  },
  btnAtrapadoOn: {
    backgroundColor: "#09f16dff",
  },

  
  footer: {
    backgroundColor: "#ffeef6",
    borderTopWidth: 1,
    borderColor: "#ffffffff",
    paddingVertical: 30,
    paddingHorizontal: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  footerText: {
    fontWeight: "800",
    color: "#bd0000ff",
  },
});

export default styles;
