import type { CapacitorConfig } from "@capacitor/cli";

// The app is an SSR TanStack Start site, so the Android shell loads the
// published site directly (hybrid mode). Update `server.url` to your
// production domain before generating a release build.
const config: CapacitorConfig = {
  appId: "com.pharaoh.ai",
  appName: "فرعون Ai",
  webDir: "dist/client",
  server: {
    url: "https://project--3bb99cfd-b231-4692-9f24-0a5ec937c9a4.lovable.app",
    cleartext: false,
    androidScheme: "https",
  },
  android: {
    backgroundColor: "#050b14",
  },
  plugins: {
    SplashScreen: {
      backgroundColor: "#050b14",
      launchAutoHide: true,
      showSpinner: false,
    },
  },
};

export default config;