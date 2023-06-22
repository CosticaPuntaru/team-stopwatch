import { component$, useContext } from '@builder.io/qwik';
import { playerStore } from "~/utils/player-store";

export default component$(function GamesPage() {
    const store = useContext(playerStore)

    return <div>
        <h1>Games </h1>
        <ul>
            {store.gameList.map((game) => (
                <li key={game} onClick$={() => {
                    console.log('game', game)
                }}>
                    <a href={`/team-stopwatch/games/game?gameId=${game}`}>
                        {game}
                    </a>
                </li>
            ))}
        </ul>
    </div>

});