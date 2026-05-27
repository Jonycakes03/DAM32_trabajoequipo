# ClearLabel

A mobile app for discovering, scanning, and tracking personal care and health products. Search or scan a barcode to get instant ingredient details, safety ratings, and user reviews — then save products to custom lists.

---

## Features

- **Barcode scanner** — point your camera at any product to look it up instantly
- **Product search** — text search with persistent history stored on-device
- **Advanced filters** — filter by ingredients (17+ options), brand, and rating
- **Product detail** — full ingredient list, safety information, average rating, and user reviews
- **Compare** — side-by-side comparison of two products
- **Lists** — create named lists and add products to them for future reference
- **Reviews** — submit and browse ratings and notes for any product
- **Authentication** — sign up / log in with email, with password reset support
- **Personalized recommendations** — curated products on the home screen

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Expo](https://expo.dev) v54 + React Native 0.81 |
| Language | TypeScript / React 19 |
| Routing | Expo Router v6 (file-based) |
| Backend & Auth | [Supabase](https://supabase.com) (PostgreSQL + Auth) |
| Local storage | AsyncStorage (search history, auth session) |
| Camera / Scanner | expo-camera + expo-barcode-scanner |
| Icons | Expo Vector Icons (Ionicons, Feather, AntDesign) |

---

## Project Structure

```
recipe_/
├── app/                    # All screens (Expo Router)
│   ├── _layout.tsx         # Root navigator + auth guard
│   ├── bienvenida.tsx      # Onboarding carousel
│   ├── login.tsx           # Login screen
│   ├── crearcuenta.tsx     # Sign-up screen
│   ├── forgot.tsx          # Forgot password
│   ├── reset-password.tsx  # Reset password (email link)
│   ├── home.tsx            # Dashboard
│   ├── escanear.tsx        # Barcode scanner
│   ├── buscar.tsx          # Text search + history
│   ├── resultados.tsx      # Paginated search results
│   ├── fichaproducto.tsx   # Product detail + add to list
│   ├── listas.tsx          # List management
│   ├── listas_2.tsx        # List contents
│   ├── comparar.tsx        # Product comparison
│   ├── perfil.tsx          # User profile
│   ├── mis_resenas.tsx     # My reviews
│   ├── resenasprod.tsx     # Product reviews
│   ├── filtros.tsx         # Filter picker
│   └── settings.tsx        # App settings
├── components/
│   └── Tabar.tsx           # Bottom navigation tab bar
├── utils/
│   └── supabase.ts         # Supabase client setup
├── assets/                 # Icons and splash screen
├── .env                    # Environment variables (see below)
└── package.json
```

---

## Database Schema

| Table | Key columns |
|---|---|
| `Usuarios` | id, nombre, fe_nac, sexo, correo |
| `Productos` | id, nombre, marca, imagen, valoracion, ingredientes, informacion, barcode |
| `Listas` | id, usuario_id, nombre, created_at |
| `ListaProductos` | lista_id, producto_id |
| `Reseñas` | id, usuario_id, producto_id, calificacion, nota, created_at |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — `npm install -g expo-cli`
- Expo Go app on your phone **or** an Android/iOS emulator

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd DAM32_trabajoequipo/recipe_

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file inside `recipe_/` with your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
EXPO_PUBLIC_SUPABASE_KEY=<your-anon-public-key>
```

### Running the App

```bash
# Start the Expo dev server
npm start

# Or target a specific platform
npm run android
npm run ios
npm run web
```

Scan the QR code with Expo Go to run on a physical device.

---

## Authentication Flow

1. New users sign up with email, password, name, birthdate, and gender.
2. Supabase Auth creates an account and the app inserts a row into `Usuarios`.
3. The session is persisted in AsyncStorage so users stay logged in between sessions.
4. All screens except the onboarding, login, and sign-up routes are protected — unauthenticated users are redirected to the welcome screen.
5. Password reset is handled via a Supabase magic link sent to the user's email.

---

## Contributing

Branch off `main`, open a PR against `main`, and request a review. The active development branch is `trabajo`.

---

## License

This project is for educational purposes as part of the DAM32 course.
