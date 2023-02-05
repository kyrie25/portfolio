import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	preview: {
		host: "localhost.kyrie25.me",
		port: 80,
		open: true,
		https: {
			key: "./ssl/private.key.pem",
			cert: "./ssl/domain.cert.pem"
		}
	},
	plugins: [react(), viteTsconfigPaths(), svgrPlugin()]
});
