import { Stack, useRouter, useSegments } from "expo-router";
import { BackHandler, Platform } from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../utils/supabase";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Check session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        // If no session, ensure we are on a public route
        const active = segments.length > 0 ? segments[segments.length - 1] : "index";
        const publicRoutes = ["index", "bienvenida", "login", "crearcuenta", "forgot", "reset-password"];
        if (!publicRoutes.includes(active)) {
          router.replace("/bienvenida");
        }
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const active = segments.length > 0 ? segments[segments.length - 1] : "index";
      const publicRoutes = ["index", "bienvenida", "login", "crearcuenta", "forgot", "reset-password"];

      if (!session && !publicRoutes.includes(active)) {
        // Redirect to welcome if signed out and on protected route
        router.replace("/bienvenida");
      } else if (session && (active === "login" || active === "crearcuenta" || active === "bienvenida")) {
        // Redirect to home if signed in and on auth pages
        router.replace("/home");
      }
    });

    return () => subscription.unsubscribe();
  }, [segments]);

  useEffect(() => {
    // Only handle Android hardware back button. iOS and web use their own navigation.
    if (Platform.OS !== "android") return;

    const onBack = () => {
      // Determine the active route segment (last part of the path)
      const active = segments.length > 0 ? segments[segments.length - 1] : "index";

      // If we're at the home screen, send the user to the index menu (replace so it doesn't stack)
      if (active === "home") {
        // Minimize app instead of going back to login
        BackHandler.exitApp();
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
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerLeft: () => null,
          // try to hide back affordance in header (supporting versions that expose this option)
          headerBackVisible: false,
          headerShown: false,
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
        <Stack.Screen
          name="bienvenida"
          options={{
            headerTitle: "Bienvenida",
            headerBackTitle: "Atrás"
          }}
        />
        <Stack.Screen
          name="forgot"
          options={{
            headerTitle: "Recuperar Contraseña",
            headerBackTitle: "Atrás"
          }}
        />
        <Stack.Screen
          name="reset-password"
          options={{
            headerTitle: "Nueva Contraseña",
            headerBackTitle: "Atrás"
          }}
        />
        <Stack.Screen
          name="recomendaciones"
          options={{
            headerTitle: "Recomendaciones",
            headerBackTitle: "Atrás"
          }}
        />
        <Stack.Screen
          name="comparar"
          options={{
            headerTitle: "Comparar Productos",
            headerBackTitle: "Atrás"
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
