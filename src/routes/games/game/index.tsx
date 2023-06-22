import { component$, useContext, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { playerStore, timeToHumans } from "~/utils/player-store";
import { PlayerName } from "~/components/player-name";
import { getViewTransitionStyle } from "~/utils/transition";
import { useGameId } from "~/utils/store";

export default component$(function GamesPage() {
    const store = useContext(playerStore)
    const gameId = useGameId()
    const selectedGame = gameId && store.games[gameId] || { startTime: 1,players: []}
    const currentTime = useSignal('')

    useVisibleTask$(() => {
        const timer = setInterval(() => {
            if (selectedGame.players.every((p) => p.time)) {
                clearInterval(timer)
            }
            if (!gameId) {
                return
            }
            const diff = Date.now() - parseInt(gameId);
            if (diff < 999999) {
                currentTime.value = timeToHumans(diff)
            }
        }, 100)
    })

    return <div>
        <h4>Games - {gameId} - {currentTime}</h4>
        {!selectedGame && (
            <div>
                Failed to find the game
            </div>
        )}
        {selectedGame && (
            <ul>
                {selectedGame.players.map((player) => (
                    <li
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
                            {player.time ? timeToHumans(player.time) : 'not finished'}
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>

});