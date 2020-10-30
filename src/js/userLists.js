import { LISTS, getMoviesList, addMovieToList, movieInList } from './firebase';

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

export async function listedInWatched(id) {
  return await movieInList(LISTS.watched);
}

export async function listedInQueue(id) {
  return await movieInList(LISTS.queue);
}
