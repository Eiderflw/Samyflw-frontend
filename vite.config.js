import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        rollupOptions: {
            onwarn(warning, warn) {
                // Ignorar errores de activos estáticos (videos/imágenes en /public)
                if (warning.code === 'UNRESOLVED_IMPORT') return;
                warn(warning);
            }
        }
    }
})