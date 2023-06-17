import { createContextId } from "@builder.io/qwik";


export const BasePathContext = createContextId<{ basePath: string }>(
    'base-path-context',
);
export const deployedBasePath = '/team-stopwatch'
export const devBasePath = ''