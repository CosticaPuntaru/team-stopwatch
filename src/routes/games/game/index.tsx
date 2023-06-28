import { component$, useContext } from '@builder.io/qwik';
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

    return <div>
        <h1 class="text-1xl font-extrabold dark:text-white">
            Games
            - {gameId && (new Date(parseFloat(gameId))).toDateString()} {remainingPlayerCount > 0 && ' - ' + remainingPlayerCount + ' players remaining'}
        </h1>
        {/*{!!remainingPlayerCount && (*/}
        {/*    <div class="text-5xl font-extrabold dark:text-white"><TimePassed startTime={gameId}/></div>*/}
        {/*)}*/}

        {/*{!selectedGame && (*/}
        {/*    <div>*/}
        {/*        Failed to find the game*/}
        {/*    </div>*/}
        {/*)}*/}

        {!!selectedGame && (
            <div class="flex flex-col">

                {!!selectedGame.players.filter((p) => !p.time).length && (
                    <>
                        <h2 class="text-4xl font-bold dark:text-white m-3">Runners</h2>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {selectedGame.players
                                .filter((p) => !p.time)
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
                        .sort((a, b) => (a.time ?? 0) - (b.time ?? 0) )
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