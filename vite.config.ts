import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        checker({ typescript: false, eslint: false }),
        react(),
        keycloakify({
            accountThemeImplementation: "none"
        })
    ]
});
