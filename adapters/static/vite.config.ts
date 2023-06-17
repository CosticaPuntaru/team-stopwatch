import { staticAdapter } from '@builder.io/qwik-city/adapters/static/vite';
import { extendConfig } from '@builder.io/qwik-city/vite';
import baseConfig from '../../vite.config';

export default extendConfig(baseConfig, () => {
    return {
        base: '/team-stopwatch/',
        build: {
            ssr: true,
            rollupOptions: {
                input: ['@qwik-city-plan'],
            },
        },
        plugins: [
            staticAdapter({
                origin: 'https://costicapuntaru.github.io/',
                base: '/team-stopwatch/build/',
            }),
        ],
    };
});
