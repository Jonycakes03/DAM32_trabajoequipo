import { Stack, useRouter, useSegments } from "expo-router";
import { BackHandler, Platform } from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../utils/supabase";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Verificar sesión al montar
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        // Si no hay sesión, asegurar ruta pública
        const active = segments.length > 0 ? segments[segments.length - 1] : "index";
        const publicRoutes = ["index", "bienvenida", "login", "crearcuenta", "forgot", "reset-password"];
        if (!publicRoutes.includes(active)) {
          router.replace("/bienvenida");
        }
      }
    });

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const active = segments.length > 0 ? segments[segments.length - 1] : "index";
      const publicRoutes = ["index", "bienvenida", "login", "crearcuenta", "forgot", "reset-password"];

      if (!session && !publicRoutes.includes(active)) {
        // Redirigir a bienvenida si no hay sesión
        router.replace("/bienvenida");
      } else if (session && (active === "login" || active === "crearcuenta" || active === "bienvenida")) {
        // Redirigir a inicio si hay sesión
        router.replace("/home");
      }
    });

    return () => subscription.unsubscribe();
  }, [segments]);

  useEffect(() => {
    // Solo botón atrás de Android
    if (Platform.OS !== "android") return;

    const onBack = () => {
      // Determinar ruta activa
      const active = segments.length > 0 ? segments[segments.length - 1] : "index";

      // Si es home, salir de la app
      if (active === "home") {
        // Minimizar app
        BackHandler.exitApp();
        return true; // manejado
      }

      // Si es index, comportamiento por defecto
      if (active === "bienvenida") {
        return false;
      }

      // Otras pantallas: volver atrás
      router.back();
      return true;
    };

    const sub = BackHandler.addEventListener("hardwareBackPress", onBack);
    return () => sub.remove();
  }, [router, segments]);

  return (
    // Ocultar botón atrás globalmente
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerLeft: () => null,
          // Ocultar flecha atrás
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
