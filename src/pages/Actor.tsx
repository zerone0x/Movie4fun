import { useParams } from "react-router-dom";
import { fetchActorById, fetchActorMedia } from "../services/fetchDataAPI";
import { useQuery } from "react-query";
import Spinner from "../ui/Spinner";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Poster from "../components/poster";

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
display:flex;
gap: 4rem;
@media (max-width: 768px) {
  flex-direction: column;
  gap: 1rem;
}
`

const ActorProfile = styled.div`

`
const ActorPosterBox = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 80% @media (max-width: 768px) {
    width: 100%;
  }
`
const Biography = styled.div`
max-width: 50%;
h3{
  font-size: 3.4rem;
  font-weight: 520;
}
p{
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
gap: .7rem;
`
const ActorDetail = styled.div`
display: flex;
gap: 1rem;
time, p{
  font-size: 2rem;
}

`
const ActionHeader = styled.header`

`
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

interface ActorMediaProps {
  id: number
  poster_path: string
  vote_average: number
  media_type: string
  original_title?: string
  original_name?: string
  release_date?: string
  first_air_date?: string
  profile_path?: string
  name?: string
}
// TODO add meta 
function splitStringIntoThreeParts(str: string) {
  const sentences = str.split('.');
  const selectedSentences = sentences.slice(0, 6);
  const parts = [];

  for (let i = 0; i < selectedSentences.length; i += 2) {
    const part = selectedSentences.slice(i, i + 2).join('. ') + '.';
    parts.push(part);
  }

  const formattedParts = parts.join('\n').split('\n')
    .map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));

  return formattedParts;
}

function Actor() {
  let {  actorId } = useParams()
  const [actor, setActor] = useState<ActorProps>()
  const [actorSource, setActorMedia] = useState<ActorMediaProps[]>([]) 



  const {
    data: ActorDetails,
    error,
    isLoading,
    isError,
  } = useQuery('ActorDetail', () => fetchActorById(actorId));

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
  } = useQuery('ActorMedia', () => fetchActorMedia(actorId));

  useEffect(() => {
    if (ActorMedia) {
      setActorMedia(ActorMedia)
      console.log(actorSource)
    }
  }, [ActorMedia, actorSource])
  if (isLoading) return <Spinner />
  if (isError) return <div>Error: {error}</div>

  return (
    actor && (
      <ActorMain>
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
  {/* <p>{actor.biography.length > 300 ? actor.biography.split('.').slice(0,17).join('. '): actor.biography }</p> */}
  <Biography>
    <h3>Biography</h3>
    <BiographyParagraph>{splitStringIntoThreeParts(actor.biography)}</BiographyParagraph>
  </Biography>
</ActorSection>
</ActionBody>
        {isLoadingActorMedia ? (
          <Spinner />
        ) : isErrorActorMedia ? (
          <div>Error: {errorActorMedia}</div>
        ) : (
          actorSource && <ActorPosterBox><Poster movies={actorSource} header="Known For" detail={false} fontSize={30}/></ActorPosterBox>
        )}
      </ActorMain>
    )
)
}

export default Actor;