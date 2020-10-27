const apiKey = '8978731d3453660c119868bf0fe3e32f';
const url = `https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`


fetch(url).then(res => res.json()).then(console.log)