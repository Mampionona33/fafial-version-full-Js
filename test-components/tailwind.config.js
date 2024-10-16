/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#F59E0B",
        background: "#392380",
        text: "#1F2937",
        accent: "#10B981",
        error: "#EF4444",
        border: "#E5E7EB",
        // Ajout de vos couleurs spécifiques au dégradé
        "gradient-start": "#606c88",
        "gradient-end": "#3f4c6b",
      },
      backgroundImage: {
        "gradient-custom": "linear-gradient(to top, #d7dde8, #757f9a)",
        // Ou bien ajouter la version webkit :
        "gradient-custom-webkit":
          "-webkit-linear-gradient(to top, #d7dde8, #757f9a)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        "lg-soft":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        lg: "1rem",
      },
    },
  },
  plugins: [],
};
