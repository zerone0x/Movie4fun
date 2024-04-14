
import { useSelector } from 'react-redux';
import {selectWatchList, setWatchList, addWatchList, removeWatchList} from '../store/watchListSlice'

function WatchList() {
  const WatchList = useSelector(selectWatchList)
  console.log(WatchList)
  return (
<p>WatchList</p>

  );
}

export default WatchList;