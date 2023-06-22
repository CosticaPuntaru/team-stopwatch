import { component$, Slot, useStyles$ } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';

import styles from './styles.css?inline';
import { getViewTransitionStyle } from "~/utils/transition";
import { usePlayerStore } from "~/utils/store";

export const onGet: RequestHandler = async ({ cacheControl }) => {
    // Control caching for this request for best performance and to reduce hosting costs:
    // https://qwik.builder.io/docs/caching/
    cacheControl({
        // Always serve a cached response by default, up to a week stale
        staleWhileRevalidate: 60 * 60 * 24 * 7,
        // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
        maxAge: 5,
    });
};

export const useServerTimeLoader = routeLoader$(() => {
    return {
        date: new Date().toISOString(),
    };
});

export default component$(() => {
    useStyles$(styles);
    const store = usePlayerStore()

    return (
        <div class="root-el border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white ">
            <nav style={getViewTransitionStyle('header')}>
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/team-stopwatch/" class="flex items-center">
                        <span
                            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Team-StopWatch</span>
                    </a>

                    <div class="block w-auto">
                        <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                            <li>
                                <a href="#"
                                   class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                                   aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="/team-stopwatch/games"
                                   class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    Game List ({store.gameList.length})
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main>
                <Slot/>
            </main>
        </div>
    );
});
