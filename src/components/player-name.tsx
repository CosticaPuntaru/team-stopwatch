import { getViewTransitionStyle } from "~/utils/transition";

interface PlayerNameProps {
    name: string;
}

export function PlayerName({ name }: PlayerNameProps) {

    return (
        <div style={getViewTransitionStyle('player-' + name.replaceAll(' ', '-'))}>
            {name}
        </div>
    )

}