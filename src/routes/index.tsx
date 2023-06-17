import { component$, useContext, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { playerStore } from "~/utils/player-store";
import { useCustomNavigate } from "~/utils/navigation";
import { PlayerName } from "~/components/player-name";


export default component$(() => {
    const currentPlayerName = useSignal('')
    const store = useContext(playerStore)
    const nav = useCustomNavigate();
    return (
        <>
            <h1>Welcome to Qwik</h1>
            <div>
                <input
                    type="text"
                    value={currentPlayerName.value}
                    onInput$={(e: any) => currentPlayerName.value = (e.target.value)}
                />
                <button
                    class="button-small"
                    type="button"
                    onClick$={() => {
                        console.log('add', currentPlayerName.value)
                        store.players.push(currentPlayerName.value)
                        currentPlayerName.value = ''
                    }}
                >
                    Add
                </button>
            </div>

            <ul>
                {store.players.map((player) => (
                    <li key={player}>
                        <label>
                            <input
                                type="checkbox"
                                checked={store.selectedPlayers.includes(player)}
                                onChange$={(e: any) => {
                                    if (e.target.checked) {
                                        store.selectedPlayers.push(player)
                                    } else {
                                        store.selectedPlayers = store.selectedPlayers.filter((p) => p !== player)
                                    }
                                }}
                            />
                            <PlayerName name={player}/>
                        </label>

                        <button
                            class="button-small"
                            type="button"
                            onClick$={() => {
                                store.players = store.players.filter((p) => p !== player)
                            }}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <button
                type="button"
                onClick$={() => {
                    console.log('start game')
                    const startTime = Date.now()
                    store.games[startTime] = {
                        startTime,
                        players: store.selectedPlayers.map((player) => ({
                            name: player,
                            time: 0
                        })),
                    };
                    new Audio("/files/race-start-beeps-125125.mp3").play();
                    setTimeout(() => {
                        nav('/games/game?gameId=' + startTime)
                    }, 3000)
                }}
            >
                Start Game
            </button>
        </>
    );
});

export const head: DocumentHead = {
    title: 'Welcome to Team time stop',
    meta: [
        {
            name: 'description',
            content: 'a app to handle team stopwatch',
        },
    ],
};
