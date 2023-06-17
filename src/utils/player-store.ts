import { createContextId } from "@builder.io/qwik";

/**
 * Translates seconds into human readable format of seconds, minutes, hours, days, and years
 *
 * @param  {number} seconds The number of seconds to be processed
 * @return {string}         The phrase describing the amount of time
 */
export function timeToHumans(ms: number) {
    const seconds = ms / 1000;
    const levels = [
        [Math.floor(seconds / 31536000), 'Y'],
        [Math.floor((seconds % 31536000) / 86400), 'D'],
        [Math.floor(((seconds % 31536000) % 86400) / 3600), 'H'],
        [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), 'M'],
        [Math.floor((((seconds % 31536000) % 86400) % 3600)) % 60, 'S'],
        [Math.floor(((((seconds % 31536000) % 86400) % 3600)) % 60 * 1000 %100), 'ms']
    ] as const;
    let returntext = '';

    for (let i = 0, max = levels.length; i < max; i++) {
        if (levels[i][0] === 0) continue;
        returntext += ' ' + levels[i][0] + ' ' + (levels[i][0] === 1 ? levels[i][1]?.substr(0, levels[i][1].length - 1) : levels[i][1]);
    }

    return returntext.trim();
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