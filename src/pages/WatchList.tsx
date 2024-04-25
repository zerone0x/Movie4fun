import { useSelector } from 'react-redux'
import {
  selectWatchList,
  setWatchList,
  addWatchList,
  removeWatchList,
} from '../store/watchListSlice'
import Poster from '../components/poster'

function WatchList() {
  const WatchList = useSelector(selectWatchList)
  return (
    <>
      <h1>Your WatchList</h1>
      <Poster movies={WatchList} />
      
    </>
  )
}

export default WatchList
