import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import checker from "vite-plugin-checker";
import tailwindcss from "@tailwindcss/vite";
import { buildEmailTheme } from "keycloakify-emails";
import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
                    name: "MY_APP_URL",
                    default: ""
                },
                {
                    name: "ACCOUNT_SETTING_URL",
                    default: ""
                }
            ],
            postBuild: async buildContext => {
                const { config: loadConfig } = await import("./jsx-email.config.js");

                const config = await loadConfig;

                await buildEmailTheme({
                    templatesSrcDirPath: path.join(
                        buildContext.themeSrcDirPath,
                        "email",
                        "templates"
                    ),
                    i18nSourceFile: path.join(
                        buildContext.themeSrcDirPath,
                        "email",
                        "i18n.ts"
                    ),
                    themeNames: buildContext.themeNames,
                    keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
                    locales: ["en", "pl"],
                    esbuild: config.esbuild,
                    cwd: __dirname,
                    environmentVariables: buildContext.environmentVariables,
                    assetsDirPath: __dirname + "/src/email/templates/assets"
                });
            }
        })
    ]
});
