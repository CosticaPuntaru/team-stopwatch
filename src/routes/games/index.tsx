import { component$, useContext } from '@builder.io/qwik';
import { playerStore } from "~/utils/player-store";

export default component$(function GamesPage() {
    const store = useContext(playerStore)

    return <div>
        <h1>Games </h1>
        <ol class="max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
            {store.gameList.map((game) => (
                <li key={game} onClick$={() => {
                    console.log('game', game)
                }}>
                    <a href={`/team-stopwatch/games/game?gameId=${game}`}>
                        {new Date(parseInt(game)).toLocaleString()} - {game}
                    </a>
                </li>
            ))}
        </ol>
    </div>

});