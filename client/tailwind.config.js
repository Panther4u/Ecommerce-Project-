// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   darkMode: "class",
//   theme: {
//     fontFamily: {
//       display: ["Open Sans", "sans-serif"],
//       body: ["Open Sans", "sans-serif"],
//     },
//     extend: {
//       fontSize: {
//         14: "14px",
//       },
//       backgroundColor: {
//         "main-bg": "#FAFBFB",
//         "main-dark-bg": "#20232A",
//         "secondary-dark-bg": "#33373E",
//         "light-gray": "#F7F7F7",
//         "half-transparent": "rgba(0, 0, 0, 0.5)",
//       },
//       borderWidth: {
//         1: "1px",
//       },
//       borderColor: {
//         color: "rgba(0, 0, 0, 0.1)",
//       },
//       width: {
//         400: "400px",
//         760: "760px",
//         780: "780px",
//         800: "800px",
//         1000: "1000px",
//         1200: "1200px",
//         1400: "1400px",
//       },
//       height: {
//         80: "80px",
//       },
//       minHeight: {
//         590: "590px",
//       },
//       backgroundImage: {
//         "hero-pattern":
//           "url('https://demos.wrappixel.com/premium-admin-templates/react/flexy-react/main/static/media/welcome-bg-2x-svg.25338f53.svg')",
//       },
//     },
//   },
//   plugins: [],
// };



/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1600px',
    },
    colors: {
      black: '#000000',
      green: '#00A76F',
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      yellow: '#ffc82c',
      gray: {
        100: '#F9FAFB',
        200: '#F4F6F8',
        300: '#DFE3E8',
        400: '#C4CDD5',
        500: '#F9FAFB',
        600: '#637381',
        700: '#454F5B',
        800: '#212B36',
        900: '#161C24',
      },
      hover: '#63738114',
      success: '#22c55e',
      warning: '#ff7849',
      error: '#ff5630',
      info: '#00b8d9',
      code: '#d63384',
    },
    extend: {
      transitionProperty: {
        height: 'height',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
      fontFamily: {
        display: ['Open Sans', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        14: '14px',
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },
      backgroundImage: {
        'hero-pattern':
          "url('https://demos.wrappixel.com/premium-admin-templates/react/flexy-react/main/static/media/welcome-bg-2x-svg.25338f53.svg')",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};

module.exports = tailwindConfig;
