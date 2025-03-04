import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import compression from 'vite-plugin-compression2'
import ViteMinifyPlugin from 'vite-plugin-minify'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default ({ mode }: { mode?: string }) => {
	const env = loadEnv(mode || 'development', process.cwd())

	const isProduction = mode === 'production'

	const VITE_APP_HOST = env.VITE_APP_HOST || '0.0.0.0'
	const VITE_APP_PORT = env.VITE_APP_PORT || '5173'

	return defineConfig({
		base: '/',
		clearScreen: false,
		publicDir: path.resolve(__dirname, 'public'),
		plugins: [
			react({
				tsDecorators: true,
				devTarget: 'esnext',
			}),
			ViteImageOptimizer({
				png: { quality: 80 },
				jpeg: { quality: 80 },
				avif: { quality: 80 },
				webp: { lossless: true },
				svg: {
					plugins: [
						{ name: 'removeViewBox' },
						{ name: 'sortAttrs' },
					],
				},
			}),
			ViteMinifyPlugin({}),
			compression(),
		],
		optimizeDeps: {
			include: [
				'react',
				'react-dom',
				'react-router',
			],
		},
		server: {
			open: true,
			host: VITE_APP_HOST,
			port: +VITE_APP_PORT,
			cors: true,
			hmr: true,
		},
		build: {
			minify: 'esbuild',
			manifest: true,
			emptyOutDir: true,
			chunkSizeWarningLimit: 650,
			target: 'esnext',
			sourcemap: !isProduction,
			reportCompressedSize: !isProduction,
			outDir: './build',
			rollupOptions: {
				output: {
					entryFileNames: 'chunks/[hash].js',
					chunkFileNames: 'chunks/[hash].js',
					assetFileNames: ({ name }) => {
						if (/\.(css)$/.test(name ?? '')) {
							return 'css/[hash][extname]'
						}
						return 'media/[hash][extname]'
					},
					manualChunks(id) {
						if (id.includes('node_modules')) {
							return id
								.toString()
								.split('node_modules/')[1]
								.split('/')[0]
								.toString()
						}
					},
				},
			},
		},
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './src'),
				'~atoms': path.resolve(__dirname, './src/atoms'),
				'~shared': path.resolve(__dirname, './src/shared'),
				'~modules': path.resolve(__dirname, './src/modules'),
				'~features': path.resolve(__dirname, './src/features'),
				'~widgets': path.resolve(__dirname, './src/widgets'),
				'~app': path.resolve(__dirname, './src/app'),
				'~public': path.resolve(__dirname, './public'),
			},
		},
	})
}
