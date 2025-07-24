import type { NextConfig } from 'next';

/** @type {NextConfig} */
const nextConfig: NextConfig = {
	webpack(config) {
		// Allow .mjs files
		config.module.rules.push({
			test: /\.mjs$/,
			type: 'javascript/auto',
		});

		// Treat PDF worker as an asset (so ?url works)
		config.module.rules.push({
			test: /pdf\.worker\.mjs$/,
			type: 'asset/resource',
		});

		return config;
	},
};

export default nextConfig;
