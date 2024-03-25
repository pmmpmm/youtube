import {defineConfig, splitVendorChunkPlugin} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { compression } from "vite-plugin-compression2"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        compression(),
        splitVendorChunkPlugin()
    ],
    server: {
      host: "0.0.0.0",
      port: 8090
    }
})
