import client from './client'

export const fetchTrendMovies = async () => {
  const { data } = await client.get('trending/movie/day')
  return data.results
}

export const fetchTrendPpl= async () => {
  const { data } = await client.get('trending/person/day')
  return data.results
}

export const fetchTVCredits = async (tvId: string | undefined) => {
  const { data } = await client.get(`tv/${tvId}/credits`)
  return data.cast
}

export const fetchMovieCredits = async (movieId: string | undefined) => {
  const { data } = await client.get(`movie/${movieId}/credits`)
  return data.cast
}

export const fetchMovieRecommendations = async (movieId: string | undefined) => {
  const { data } = await client.get(`movie/${movieId}/recommendations`)
  return data.results
}

export const fetchTVRecommendations = async (tvId: string | undefined) => {
  const { data } = await client.get(`tv/${tvId}/recommendations`)
  return data.results
}

export const fetchMovieTopRated = async () => {
  const { data } = await client.get('movie/top_rated')
  console.log(data.results.length)
  return data.results
}

export const fetchTVTopRated = async () => {
  const { data } = await client.get('tv/top_rated')
  return data.results
}
export const fetchMovieById = async (movieId: string | undefined) => {
  const { data } = await client.get(`movie/${movieId}`)
  return data
}

export const fetchActorById = async (actorId: string | undefined) => {
  const { data } = await client.get(`person/${actorId}`)
  return data
}

export const fetchActorMedia = async (actorId: string | undefined) => {
  const { data } = await client.get(`person/${actorId}/combined_credits`)
  return data.cast
}

export const fetchTvVideos = async (tvId: string | undefined) => {
  const { data } = await client.get(`tv/${tvId}/videos`)
  return data.results
}

export const fetchMovieVideos = async (movieId: string | undefined) => {
  const { data } = await client.get(`movie/${movieId}/videos`)
  return data.results
}

export const fetchTVById = async (tvId: string | undefined) => {
  const { data } = await client.get(`tv/${tvId}`)
  return data
}

export const fetchMutiByQuery = async (query:string) => {
  if (!query) return []
  const { data } = await client.get(`search/multi?query=${query}`)
  return data.results
}


export const fetchMovieByQuery = async (query: string) => {
  if (!query) return []
  const { data } = await client.get(`search/movie?query=${query}`)
  return data.results
}

export const fetchTVByQuery = async (query: string) => {
  if (!query) return []
  const { data } = await client.get(`search/tv?query=${query}`)
  return data.results
}

export const fetchActorByQuery = async (query: string) => {
  if (!query) return []
  const { data } = await client.get(`search/person?query=${query}`)
  return data.results
}

export const fetchTrendTV = async () => {
  const { data } = await client.get('trending/tv/day')
  return data.results
}

export const fetchTrendActor = async () => {
  const { data } = await client.get('trending/person/day')
  return data.results
}
