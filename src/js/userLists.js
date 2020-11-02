import {
  LISTS,
  getMoviesList,
  addMovieToList,
  movieInList,
  removeMovieFromList,
} from './firebase';

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
  return await movieInList(id, LISTS.watched);
}

export async function listedInQueue(id) {
  return await movieInList(id, LISTS.queue);
}

export async function deleteFromWatched(id) {
  removeMovieFromList(id, LISTS.watched);
}

export async function deleteFromQueue(id) {
  removeMovieFromList(id, LISTS.queue);
}

export async function movieListed(id) {
  try {
    let InWatched = await listedInWatched(id);
    if (!InWatched) InWatched = false;
    let InQueue = await listedInQueue(id);
    if (!InQueue) InQueue = false;
    return { InWatched, InQueue };
  } catch {
    return { InWatched: false, InQueue: false };
  }
}
