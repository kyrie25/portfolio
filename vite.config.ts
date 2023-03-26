import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import viteImagemin from "vite-plugin-imagemin";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: "localhost.kyrie25.me",
		port: 80,
		open: true,
		https: {
			key: "./ssl/private.key.pem",
			cert: "./ssl/domain.cert.pem"
		}
	},
	plugins: [
		react(),
		viteTsconfigPaths(),
		svgrPlugin(),
		viteImagemin({
			gifsicle: {
				optimizationLevel: 7,
				interlaced: false
			},
			optipng: {
				optimizationLevel: 7
			},
			mozjpeg: {
				quality: 20
			},
			pngquant: {
				quality: [0.8, 0.9],
				speed: 4
			},
			svgo: {
				plugins: [
					{
						name: "removeViewBox"
					},
					{
						name: "removeEmptyAttrs",
						active: false
					}
				]
			}
		})
	]
});
