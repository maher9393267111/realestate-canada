/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/SiteComponents/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: true,
  theme: {
    extend: {
      maxWidth: {
        "7xl": "1920px",
      },
      colors: {
        primary: "#63AB45",
        // primary: '#131424',
        secondary: '#393A47',
        accent: '#F13024',
        'blue': {
          100: "#1127E3",
          200: '#1b2ae6'
        },
        'purple': {
          100: '#7344fc'
        },
        'gray': {
          100: '#00000080',
          200: '#000000CC',
          300: '#FFFFFF80',
          400: '#FFFFFCC'
        }

     
      },

      borderRadius: {
        4: "4px",
        8: "8px",
        16: "16px",
        24: "24px",
        32: "32px",
        64: "64px",
      },

      fontFamily: {
        estedad: ["var(--font-estedad)"],
      },

      keyframes: {
        skeleton_animate: {
          from: {
            backgroundColor: "#F9F9F9",
          },
          to: {
            backgroundColor: "#CBCBCB",
          },
        },
      },
      animation: {
        skeleton_loading: "skeleton_animate 0.9s linear infinite alternate",
      },
    },
  },
  plugins: [],
};
