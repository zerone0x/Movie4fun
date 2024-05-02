import client from './client'

export const fetchTrendMovies = async () => {
  const { data } = await client.get('trending/movie/day')
  return data.results
}

export const fetchMovieTopRated = async () => {
  const { data } = await client.get('movie/top_rated')
  console.log(data)
  return data.results
}

export const fetchTVTopRated = async () => {
  const { data } = await client.get('tv/top_rated')
  return data.results
}
export const fetchMovieById = async (movieId: string | undefined) => {
  const { data } = await client.get(`movie/${movieId}`)
  console.log(data)
  return data
}

export const fetchTVById = async (tvId: string | undefined) => {
  const { data } = await client.get(`tv/${tvId}`)
  return data
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
  // console.log(data)
  return data.results
}

export const fetchTrendActor = async () => {
  const { data } = await client.get('trending/person/day')
  return data.results
}
