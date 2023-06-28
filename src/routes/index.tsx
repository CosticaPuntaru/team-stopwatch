import { $, component$, useContext, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { playerStore } from "~/utils/player-store";
import { useCustomNavigate } from "~/utils/navigation";
import { PlayerName } from "~/components/player-name";


export default component$(() => {
    const currentPlayerName = useSignal('')
    const store = useContext(playerStore)
    const nav = useCustomNavigate();
    const handleAddPlayer = $(() => {
        const name = currentPlayerName.value.trim()
        if (name && !store.players.includes(name)) {
            store.players.push(name)
            store.selectedPlayers.push(name)
            currentPlayerName.value = ''
        }
    })
    return (
        <>
            <div class="grid gap-6 mb-6 md:grid-cols-2 max-w-md">
                <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Player
                        name
                    </label>
                    <input
                        value={currentPlayerName.value}
                        type="text"
                        onInput$={(e: any) => currentPlayerName.value = (e.target.value)}
                        onkeydown$={(e: any) => {
                            if (e.key === 'Enter') {
                                handleAddPlayer()
                            }
                        }}
                        id="first_name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John" required
                    />
                </div>

                <div class="flex items-end">
                    <button
                        type="button"
                        class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick$={() => handleAddPlayer()}
                    >
                        Add player
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                {store.players.map((player) => (
                    <div
                        key={player}
                        class={["border-2 rounded-xl p-3 cursor-pointer", {
                            'border-transparent': !store.selectedPlayers.includes(player),
                            'border-green-500': store.selectedPlayers.includes(player)
                        }]}

                    >
                        <label class="flex gap-3"
                               onClick$={() => {
                                   if (!store.selectedPlayers.includes(player)) {
                                       store.selectedPlayers = [
                                           ...store.selectedPlayers,
                                           player
                                       ]
                                   } else {
                                       store.selectedPlayers = store.selectedPlayers.filter((p) => p !== player)
                                   }
                               }}

                        >
                            <input
                                type="checkbox"
                                class="sr-only peer"
                                checked={store.selectedPlayers.includes(player)}
                                onChange$={(e: any) => {
                                    console.log('store.selectedPlayers', store.selectedPlayers.map(String))
                                    if (e.target.checked) {
                                        store.selectedPlayers.push(player)
                                    } else {
                                        store.selectedPlayers = store.selectedPlayers.filter((p) => p !== player)
                                    }
                                }}
                            />


                            <PlayerName name={player}/>
                            <button
                                class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                type="button"
                                onClick$={() => {
                                    store.players = store.players.filter((p) => p !== player)
                                }}
                            >
                                X
                            </button>
                        </label>


                    </div>
                ))}
            </div>
            <hr class="mt-3 mb-3"/>
            <button
                type="button"
                class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick$={() => {
                    console.log('start game')
                    if (!store.selectedPlayers.length) {
                        return
                    }
                    const startTime = Date.now()
                    store.games[startTime] = {
                        startTime,
                        players: store.selectedPlayers.map((player) => ({
                            name: player,
                            time: 0
                        })),
                    };
                    new Audio("/team-stopwatch/files/race-start-beeps-125125.mp3").play();
                    setTimeout(() => {
                        nav(`/team-stopwatch/games/game?gameId=${startTime}`)
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
