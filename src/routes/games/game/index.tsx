import { component$, useContext, useSignal } from '@builder.io/qwik';
import { playerStore, timeToHumans } from "~/utils/player-store";
import { PlayerName } from "~/components/player-name";
import { getViewTransitionStyle } from "~/utils/transition";
import { useGameId } from "~/utils/store";
import { TimePassed } from "~/components/time-passed";

export default component$(function GamesPage() {
    const store = useContext(playerStore)
    const gameId = useGameId()
    const selectedGame = gameId && store.games[gameId] || { startTime: 1, players: [] }
    const remainingPlayerCount = selectedGame.players.filter((p) => !p.time).length
    const filterPlayer = useSignal('')

    // @ts-ignore
    return <div>
        <h1 class="text-1xl font-extrabold dark:text-white">
            Games
            - {gameId && (new Date(parseFloat(gameId))).toDateString()} {remainingPlayerCount > 0 && ' - ' + remainingPlayerCount + ' players remaining'}
        </h1>
        {!!remainingPlayerCount && (
            <div class="text-5xl font-extrabold dark:text-white"><TimePassed startTime={gameId}/></div>
        )}

        {!selectedGame && (
            <div>
                Failed to find the game
            </div>
        )}

        {!!selectedGame && (
            <div class="flex flex-col">
                {!!selectedGame.players.filter((p) => !p.time).length && (
                    <>
                        <h2 class="text-4xl font-bold dark:text-white my-3">Runners</h2>
                        <div class="flex flex-col">
                            <label for="first_name"
                                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Player
                                Search
                            </label>
                            <input
                                value={filterPlayer.value}
                                type="text"
                                onInput$={(e: any) => filterPlayer.value = (e.target.value)}
                                onkeydown$={(e: any) => {
                                    if (e.key === 'Enter') {
                                        const players = selectedGame.players
                                            .filter((p) => !p.time && p.name.toLowerCase().includes(filterPlayer.value.toLowerCase()))

                                        if (players.length === 1) {
                                            const startTime = selectedGame.startTime
                                            const endTime = Date.now()
                                            players[0].time = endTime - startTime
                                        }
                                    }
                                }}
                                id="first_name"
                                class="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="John"
                                required
                                autocomplete="off"
                            />
                        </div>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {selectedGame.players
                                .filter((p) => !p.time && p.name.toLowerCase().includes(filterPlayer.value.toLowerCase()))
                                .map((player) => (
                                    <div
                                        class={["border-2 rounded-xl p-3 cursor-pointer", {
                                            'border-sky-800': !player.time,
                                            'border-green-500': !!player.time
                                        }]}
                                        key={player.name}
                                        onClick$={() => {
                                            if (player.time) {
                                                return
                                            }

                                            const startTime = selectedGame.startTime
                                            const endTime = Date.now()
                                            player.time = endTime - startTime
                                        }}
                                    >
                                        <PlayerName name={player.name}/>

                                        <div style={getViewTransitionStyle(`player-time-${player.name}`)}>
                                            {player.time ? timeToHumans(player.time) : 'Running'}
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <br/>
                    </>
                )}
                <hr class="p-3"/>
                <h2 class="text-4xl font-bold dark:text-white m-3">Finish line</h2>
                <table class="flex-1 border-sky-300 border">
                    <thead>
                    <tr class="border-sky-300 border-b bg-sky-950">
                        <td class="p-3 border-sky-300 border-r">#</td>
                        <td class="p-3 border-sky-300 border-r">Name</td>
                        <td class="p-3 ">Time</td>
                    </tr>
                    </thead>
                    <tbody>
                    {selectedGame.players
                        .filter((p) => p.time)
                        .sort((a, b) => (a.time ?? 0) - (b.time ?? 0))
                        .map((player, index) => (
                            <tr
                                key={player.name}
                                class={[
                                    "border-sky-300 border-b", {
                                        "bg-sky-900": index % 2 !== 0,
                                        "bg-sky-800": index % 2 === 0,
                                    }
                                ]}
                            >
                                <td class="p-3 border-sky-300 border-r">
                                    {index + 1}
                                </td>
                                <td class="p-3 border-sky-300 border-r">
                                    <PlayerName
                                        name={player.name}
                                    />
                                </td>
                                <td class="p-3">
                                    {player.time ? timeToHumans(player.time) : 'not finished'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div class="p-9"></div>
            </div>
        )}
    </div>

});