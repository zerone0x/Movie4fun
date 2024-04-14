import Button from "./Button"
function Header() {
  return (
    <>
    <p>IMDB</p>
    {/* TODO add some selections */}
    <input type="search" placeholder="Search"/>
    <Button>Watchlist</Button>
    <br/>
</>

  );
}

export default Header;