import { Stack, useRouter, useSegments } from "expo-router";
import { BackHandler, Platform } from "react-native";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Only handle Android hardware back button. iOS and web use their own navigation.
    if (Platform.OS !== "android") return;

    const onBack = () => {
      // Determine the active route segment (last part of the path)
      const active = segments.length > 0 ? segments[segments.length - 1] : "index";

      // If we're at the home screen, send the user to the index menu (replace so it doesn't stack)
      if (active === "home") {
        router.replace("/");
        return true; // handled
      }

      // If we're at the index screen, allow default behavior (let system handle exit)
      if (active === "index") {
        return false; // not handled here -> system will process (may exit)
      }

      // For other screens, navigate back (pop)
      router.back();
      return true;
    };

    const sub = BackHandler.addEventListener("hardwareBackPress", onBack);
    return () => sub.remove();
  }, [router, segments]);

  return (
    // remove on-screen back button globally; rely on system back
    <Stack
      screenOptions={{
        headerLeft: () => null,
        // try to hide back affordance in header (supporting versions that expose this option)
        headerBackVisible: false,
      }}
    >
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
        name="dbtest" 
        options={{
          headerTitle: "prueba BD",
          headerBackTitle: "Atrás"
        }}
      />
    </Stack>
  );
}
