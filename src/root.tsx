import { component$, useContextProvider, useVisibleTask$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import './global.css';
import { BasePathContext, deployedBasePath, devBasePath } from "~/base-path";

export interface RootProps {
    isDevelopment?: boolean;
}

export default component$(({ isDevelopment }: RootProps) => {
    useContextProvider(BasePathContext, { basePath: isDevelopment ? devBasePath : deployedBasePath });
    console.log('isDevelopment',isDevelopment)
    useVisibleTask$(() => {
        console.log('isDevelopment',isDevelopment)
    })
    /**
     * The root of a QwikCity site always start with the <QwikCityProvider> component,
     * immediately followed by the document's <head> and <body>.
     *
     * Dont remove the `<head>` and `<body>` elements.
     */

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
