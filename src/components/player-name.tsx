import { getViewTransitionStyle } from "~/utils/transition";

interface PlayerNameProps {
    name: string;
}


function getContrastYIQ(hexcolor: string) {
    const r = parseInt(hexcolor.substring(1, 3), 16);
    const g = parseInt(hexcolor.substring(3, 5), 16);
    const b = parseInt(hexcolor.substring(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
}

const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

function stringToColour(str: string) {
    let i;
    let hash = 0;
    for (i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

export function PlayerName({ name }: PlayerNameProps) {
    const initialsList = [...name.matchAll(rgx)] || [];

    const initials = (
        (initialsList.shift()?.[1] || '') + (initialsList.pop()?.[1] || '')
    ).toUpperCase();
    const bgColor = stringToColour(name);

    return (
        <div
            class="flex items-center flex-1 gap-3"
            style={getViewTransitionStyle('player-' + name.replaceAll(' ', '-'))}
        >
            <div
                class="relative m-0 items-center inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-3xl"
                style={{ background: bgColor, color: getContrastYIQ(bgColor) }}
            >
                <span class="text-sm font-medium text-gray-900 dark:text-gray-300 border-amber-300">
                    {initials}
                </span>
            </div>
            <div>
                {name}
            </div>
        </div>
    )

}