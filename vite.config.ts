import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import checker from "vite-plugin-checker";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(),
        checker({ typescript: false, eslint: false }),
        react(),
        keycloakify({
            accountThemeImplementation: "none",
            environmentVariables: [
                {
                    name: "MY_APP_LOGIN_RESET_CREDENTIALS_URL",
                    default: "http://localhost:4200/password-reset-confirmed"
                }
            ]
        })
    ]
});
