import { action, createStore, persist } from 'easy-peasy';

export const store = createStore(
    persist({
        titleView: 'list',
        changeView: action((state, mode) => {
            state.titleView = mode;
        }),
        favourites: [],
        addFavourite: action((state, payload) => {
        state.favourites.push(payload);
        }),
        removeFavourite: action((state, payload) => {
            state.favourites = state.favourites.filter(d => d.imdbID !== payload.imdbID);
        })
  }))