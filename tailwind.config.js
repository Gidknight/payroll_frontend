/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,js,jsx,tsx,mdx}",
    "./src/*.{ts,js,tsx,jsx,html}",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./src/**/**/*.{js,ts,jsx,tsx,html}",
    "./src/**/**/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: "#e0e0e5",
        print: "#f29d15",
        primary: "#1a4caf",
        primaryHover: "#153f8e",
        secondary: "#424860",
        tertiary: "#CECDCD",
        live: "#05AC26",
        liveHover: "#36D856",
        dark: "#141223",
        send: "#0F996D",
        gray1: "#F1F1F2",
        gray2: "#2F2F2F",
        error: "#ed3154",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      gridTemplateColumns: {
        sidebar: "300px auto", //for sidebar layout
        "sidebar-collapsed": "64px auto", //for collapsed sidebar layout
      },
    },
  },
  plugins: [],
};
