// import react from "@vitejs/plugin-react-swc";
// import autoprefixer from "autoprefixer";
// import postcss from "postcss/lib/postcss";
// import { defineConfig } from "vite";

// export default defineConfig({
//   plugins: [
//     react(),
//     postcss({
//       plugins: [autoprefixer],
//       config: "./postcss.config.cjs",
//     }),
//   ],
//   build: {
//     sourcemap: true,
//   },
//   define: {
//     "process.env": {},
//   },
//   resolve: {
//     alias: {
//       src: "/src",
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [
    react(),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },
  build: {
    sourcemap: true,
    outDir: "client/dist", // Match the publish directory
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
  define: {
    "process.env": {},
  },
});
