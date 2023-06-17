import { staticAdapter } from '@builder.io/qwik-city/adapters/static/vite';
import { extendConfig } from '@builder.io/qwik-city/vite';
import baseConfig from '../../vite.config';
import { deployedBasePath } from "../../src/base-path";

export default extendConfig(baseConfig, () => {
    return {
        base: deployedBasePath,
        build: {
            ssr: true,
            rollupOptions: {
                input: ['@qwik-city-plan'],
            },
        },
        plugins: [
            staticAdapter({
                origin: 'https://costicapuntaru.github.io/',
                base: `${deployedBasePath}/build/`,
                serverData: {
                    isDevelopment: false,
                }
            }),
        ],
    };
});
