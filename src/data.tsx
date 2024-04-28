const KeyUrl = '55b35a9b559587afb28a83fef0d9f5a8'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Request = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${KeyUrl}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${KeyUrl}&language=en-US&page=1`,
  requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${KeyUrl}&language=en-US&page=2`,
  requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${KeyUrl}&language=en-US&query=horror&page=1&include_adult=false`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${KeyUrl}&language=en-US&page=1`,
}


