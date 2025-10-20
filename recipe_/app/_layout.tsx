import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="login" 
        options={{
          headerTitle: "Iniciar Sesión",
          headerBackTitle: "Atrás"
        }}
      />
      <Stack.Screen 
        name="crearcuenta" 
        options={{
          headerTitle: "Crear Cuenta",
          headerBackTitle: "Atrás"
        }}
      />
      <Stack.Screen 
        name="home" 
        options={{
          headerTitle: "Inicio",
          headerBackTitle: "Atrás"
        }}
      />
      <Stack.Screen 
        name="buscar" 
        options={{
          headerTitle: "Buscar",
          headerBackTitle: "Atrás"
        }}
      />
      <Stack.Screen 
        name="listas" 
        options={{
          headerTitle: "Mis Listas",
          headerBackTitle: "Atrás"
        }}
      />
      <Stack.Screen 
        name="perfil" 
        options={{
          headerTitle: "Mi Perfil",
          headerBackTitle: "Atrás"
        }}
      />
      <Stack.Screen 
        name="listas_2" 
        options={{
          headerTitle: "Detalles de Lista",
          headerBackTitle: "Atrás"
        }}
      />
      <Stack.Screen 
        name="resultados" 
        options={{
          headerTitle: "Resultados",
          headerBackTitle: "Atrás"
        }}
      />
      <Stack.Screen 
        name="fichaproducto" 
        options={{
          headerTitle: "Detalle de Receta",
          headerBackTitle: "Atrás"
        }}
      />
    </Stack>
  );
}
