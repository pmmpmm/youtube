/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    color: {
      logo: "#000000"
    },
    extend: {
      height: {
        ["header-height"]: "var(--header-height)",
        ["header-height-sm"]: "var(--header-height-sm)"
      },
      padding: {
        ["container-top"]: "var(--header-height)",
        ["container-top-sm"]: "var(--header-height-sm)",
        ["container-bottom"]: "var(--container-bottom)",
        ["container-rl"]: "var(--container-right-left)"
      },
      boxShadow: {
        ["form-focus"]: "0.25rem 0.25rem 0.75rem rgba(0, 0, 0, 0.2)"
      },
      keyframes: {
        wave: {
          "0%": { top: "0", opacity: "1" },
          "50%": { top: "20px", opacity: "0.2" },
          "100%": { top: "0", opacity: "1" }
        }
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem"
      }
    }
  },
  plugins: []
};
