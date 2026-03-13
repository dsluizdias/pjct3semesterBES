import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                verdeBandeira: "#009c3b",
                verdeEscuro: "#006425",
                amareloOuro: "#FFDF00",
                amareloClaro: "#FFEE66",
            },
        },
    },
    plugins: [],
};
export default config;
