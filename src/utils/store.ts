import { useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { playerStore, type PlayerStore } from "~/utils/player-store";
import { useLocation } from "@builder.io/qwik-city";


export function useGameId() {
    const { url: { searchParams } } = useLocation()

    return searchParams.get('gameId')
}

export function usePlayerStore() {
    console.log('usePlayerStore')
    const gameId = useGameId()
    const store = useStore<PlayerStore>(() => {
        return { players: [], games: {}, selectedPlayers: [], gameList: [] }
    })


    useContextProvider(playerStore, store)

    useVisibleTask$(({ track }) => {
        track(() => gameId)
        if (!gameId) {
            return
        }

        const gameString = localStorage?.getItem('game-' + gameId)
        console.log('gameString q', gameString)
        if (gameString && gameId) {
            store.games[gameId] = JSON.parse(gameString)
        }
    })

    useVisibleTask$(() => {
        const playersFromLocalStorage = localStorage?.getItem('players')

        if (playersFromLocalStorage) {
            const storedStore: PlayerStore = JSON.parse(playersFromLocalStorage);
            store.players = storedStore.players || []
            store.games = storedStore.games || {}
        }
        const selectedPlayersFromLocalStorage = localStorage?.getItem('selectedPlayers')
        if (selectedPlayersFromLocalStorage) {
            // const storedSelectedPlayers: string[] = JSON.parse(selectedPlayersFromLocalStorage);
            store.selectedPlayers = /*storedSelectedPlayers ||*/ []
        }

        const gameList = localStorage?.getItem('gameList')
        if (gameList) {
            const storedGameList: string[] = JSON.parse(gameList);
            store.gameList = storedGameList || []
        }
    });
    useVisibleTask$(({ track }) => {
        if (gameId) {
            track(store.games[gameId])
            store.games[gameId].players.forEach((player) => {
                track(player)
            })
            if (store.games[gameId]) {
                localStorage?.setItem('game-' + gameId, JSON.stringify(store.games[gameId]))
            }
        }
    })

    useVisibleTask$(({ track }) => {
        track(store)
        track(store.players)
        track(store.games)
        track(store.selectedPlayers)
        if (gameId) {
            track(store.games[gameId])
            store.games[gameId].players.forEach((player) => {
                track(player)
            })
        }
        localStorage?.setItem('players', JSON.stringify(store))
        localStorage?.setItem('selectedPlayers', JSON.stringify(store.selectedPlayers));
        localStorage?.setItem('gameList', JSON.stringify(Object.keys(store.games)));
    });
    return store;
}