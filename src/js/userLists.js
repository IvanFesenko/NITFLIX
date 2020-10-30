import { LISTS, getMoviesList, addMovieToList } from './firebase';

export function addMovieToWatched(movie) {
  if (typeof movie === 'object') addMovieToList(movie, LISTS.watched);
}

export function addMovieToQueue(movie) {
  if (typeof movie === 'object') addMovieToList(movie, LISTS.queue);
}

export async function getWatchedMovies() {
  return await getMoviesList(LISTS.watched);
}

export async function getQueuedMovies() {
  return await getMoviesList(LISTS.queue);
}
