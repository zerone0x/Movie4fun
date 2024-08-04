import { useParams } from 'react-router-dom'
import { fetchActorById, fetchActorMedia } from '../services/fetchDataAPI'
import { useQuery } from 'react-query'
import Spinner from '../ui/Spinner'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Poster from '../components/poster'
import { Helmet } from 'react-helmet-async'
import { mediaProperty } from '../utils/interface'

const Profile = styled.img`
  width: 500px;
  max-height: 700px;
  // aspect-ratio: 2 / 3;

  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 100%;
  }
`
const ActorTitle = styled.h1`
  font-size: 5rem;
  width: 100%;
`
const ActorMain = styled.main`
  padding: 4rem;
  background: black;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const ActorSection = styled.section`
  display: flex;
  gap: 4rem;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const ActorProfile = styled.div``
const ActorPosterBox = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 80% @media (max-width: 768px) {
    width: 100%;
  }
`
const Biography = styled.div`
  max-width: 50%;
  h3 {
    font-size: 3.4rem;
    font-weight: 520;
  }
  p {
    font-size: 2.4rem;
    font-weight: 400;
  }
  @media (max-width: 768px) {
    max-width: 100%;
  }
`
const BiographyParagraph = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`
const ActorDetail = styled.div`
  display: flex;
  gap: 1rem;
  time,
  p {
    font-size: 2rem;
  }
`
const ActionHeader = styled.header``
const ActionBody = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 80% @media (max-width: 768px) {
    width: 100%;
  }
`
interface ActorProps {
  actorId: string
  name: string
  birthday: string
  place_of_birth: string
  profile_path: string
  biography: string
  known_for: Array<string>
}

function splitStringIntoThreeParts(str: string) {
  const sentences = str.split('.')
  const selectedSentences = sentences.slice(0, 6)
  const parts = []

  for (let i = 0; i < selectedSentences.length; i += 2) {
    const part = selectedSentences.slice(i, i + 2).join('. ') + '.'
    parts.push(part)
  }

  const formattedParts = parts
    .join('\n')
    .split('\n')
    .map((paragraph, index) => <p key={index}>{paragraph}</p>)

  return formattedParts
}

function Actor() {
  let { actorId } = useParams()
  const [actor, setActor] = useState<ActorProps>()
  const [actorSource, setActorMedia] = useState<mediaProperty[]>([])

  const {
    data: ActorDetails,
    error,
    isLoading,
    isError,
  } = useQuery('ActorDetail', () => fetchActorById(actorId))

  useEffect(() => {
    if (ActorDetails) {
      setActor(ActorDetails)
    }
  }, [ActorDetails])

  const {
    data: ActorMedia,
    error: errorActorMedia,
    isLoading: isLoadingActorMedia,
    isError: isErrorActorMedia,
  } = useQuery('ActorMedia', () => fetchActorMedia(actorId))

  useEffect(() => {
    if (ActorMedia) {
      setActorMedia(ActorMedia)
    }
  }, [ActorMedia, actorSource])
  if (isLoading) return <Spinner />
  if (isError) return <div>Error: {error}</div>

  return actor ? (
    <ActorMain>
      <Helmet>
        <title>{actor.name} - movies4fun</title>
        <meta property="og:title" content={actor.name} />
        <meta
          property="og:description"
          content={actor.biography.slice(0, 100)}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://movie4fun.netlify.app/person/{action.id}"
        />
        <meta
          property="og:image"
          content={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
        />
      </Helmet>
      <ActionBody>
        <ActionHeader>
          <ActorTitle>{actor.name}</ActorTitle>
          <ActorDetail>
            <time>{actor.birthday}</time>
            <p>{actor.place_of_birth}</p>
          </ActorDetail>
        </ActionHeader>
        <ActorSection>
          <>
            {actor.profile_path ? (
              <Profile
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <ActorProfile>No Profile</ActorProfile>
            )}
          </>
          <Biography>
            <h3>Biography</h3>
            <BiographyParagraph>
              {splitStringIntoThreeParts(actor.biography)}
            </BiographyParagraph>
          </Biography>
        </ActorSection>
      </ActionBody>
      {isLoadingActorMedia ? (
        <Spinner />
      ) : isErrorActorMedia ? (
        <div>Error: {errorActorMedia}</div>
      ) : (
        actorSource && (
          <ActorPosterBox>
            <Poster
              movies={actorSource}
              header="Known For"
              detail={false}
              fontSize={30}
            />
          </ActorPosterBox>
        )
      )}
    </ActorMain>
  ) : (
    <Spinner />
  )
}

export default Actor
