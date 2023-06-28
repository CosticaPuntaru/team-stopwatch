import { component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import './global.css';

export interface RootProps {
    isDevelopment?: boolean;
}

export default component$(() => {
    return (
        <QwikCityProvider>
            <head>
                <meta charSet="utf-8"/>
                <link rel="manifest" href="/manifest.json"/>
                <RouterHead/>
            </head>
            <body lang="en" class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
            <RouterOutlet/>
            <ServiceWorkerRegister/>
            </body>
        </QwikCityProvider>
    );
});
