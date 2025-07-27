import { theme } from "@primer/react";

import "../assets/css/app.css";

import deepmerge from "deepmerge";

const customTheme = deepmerge(theme, {
    fonts: {
        mono: "MonoLisa, monospace"
    }
});

export default customTheme;
