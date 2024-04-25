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
      <p>WatchList</p>
      <Poster movies={WatchList} />
    </>
  )
}

export default WatchList
