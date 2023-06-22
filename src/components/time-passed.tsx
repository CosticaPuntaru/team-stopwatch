import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { timeToHumans } from "~/utils/player-store";

interface TimePassedProps {
    startTime: number | string | null;
}

export const TimePassed = component$(({ startTime }: TimePassedProps) => {
    const timeElapsed = useSignal(() => startTime ? timeToHumans(Date.now() - +startTime) : '');
    useVisibleTask$(() => {
        setInterval(() => {
            timeElapsed.value = startTime ? timeToHumans(Date.now() - +startTime) : '';
        }, 100);
    });
    return <>{timeElapsed.value}</>
});