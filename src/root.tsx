import { component$, useServerData, useVisibleTask$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import './global.css';

export interface RootProps {
    isDevelopment?: boolean;
}

export default component$(() => {
    const isDevelopment = useServerData<boolean>('isDevelopment');
    console.log('isDevelopment', isDevelopment)
    useVisibleTask$(() => {
        console.log('isDevelopment', isDevelopment)
    })
    return (
        <QwikCityProvider>
            <head>
                <meta charSet="utf-8"/>
                <link rel="manifest" href="/manifest.json"/>
                <RouterHead/>
            </head>
            <body lang="en">
            <RouterOutlet/>
            <ServiceWorkerRegister/>
            </body>
        </QwikCityProvider>
    );
});
