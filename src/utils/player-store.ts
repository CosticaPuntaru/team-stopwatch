import { createContextId } from "@builder.io/qwik";

/**
 * Translates seconds into human readable format of seconds, minutes, hours, days, and years
 *
 * @param  {number} seconds The number of seconds to be processed
 * @return {string}         The phrase describing the amount of time
 */
export function timeToHumans(ms: number) {
    let h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    h = h % 24;
    return h + " hours, " + m + " minutes, " + s + " seconds.";
}

export interface PlayerTime {
    name: string,
    time: number
}

export interface PlayerStore {
    players: string[],
    selectedPlayers: string[],
    gameList: string[],
    games: {
        [key: string]: {
            startTime: number,
            players: PlayerTime[]
        }
    }
}

export const playerStore = createContextId<PlayerStore>(
    'player-store'
);