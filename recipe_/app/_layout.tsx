import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ 
      headerLeft: () => null, // This removes the on-screen back button
    }} >
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
      <Stack.Screen 
        name="filtro" 
        options={{
          headerTitle: "friltros",
          headerBackTitle: "Atrás"
        }}
      />
      <Stack.Screen 
        name="editarperfil" 
        options={{
          headerTitle: "editar perfils",
          headerBackTitle: "Atrás"
        }}
      />
      
      <Stack.Screen 
        name="piel" 
        options={{
          headerTitle: "piel",
          headerBackTitle: "Atrás"
        }}
      />
      
            <Stack.Screen 
        name="OnboardingScreen" 
        options={{
          headerTitle: "OnboardingScreen",
          headerBackTitle: "OnboardingScreen"
        }}
      />


            <Stack.Screen 
        name="ScanScreen" 
        options={{
          headerTitle: "ScanScreen",
          headerBackTitle: "ScanScreen"
        }}
      />
            <Stack.Screen 
        name="ProductReviewsScreen" 
        options={{
          headerTitle: "ProductReviewsScreen",
          headerBackTitle: "ProductReviewsScreen"
        }}
      />
      // .tsx CompareProductsScreen
      
      <Stack.Screen 
        name="CompareProductsScreen" 
        options={{
          headerTitle: "CompareProductsScreen",
          headerBackTitle: "CompareProductsScreen"
        }}
      />
      
    </Stack>
  );
}
