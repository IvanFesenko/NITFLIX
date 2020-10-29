import axios from 'axios';
import conf from './api-conf';

//добавить id
export default async function fetchMovieInfo(id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${conf.apiKey}&append_to_response=videos`;

  try {
    const response = await axios.get(url);
    const results = response.data;

    return results;
  } catch (error) {
    console.log(error);
  }
}
