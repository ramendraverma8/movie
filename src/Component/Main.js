import {Navbar} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import InfiniteScroll from 'react-infinite-scroll-component'
import Car from "./Card";
import Loader from "react-js-loader";

// todo: create a separate file for the constants
let API_key = "?api_key=358959801e525a759e5e9fc3646e37ae";
let base_url = "https://api.themoviedb.org/3";
let url = base_url + "/movie/popular" + API_key + "&language=en-US&page=1";
let arr = ["Popular", "Top-Rated", "Theatre", "Upcoming", "Watchlist"]


// todo: Use Prettier
const Main = () => {
  const [movieData, setData] = useState([]); // Read Functional form.
  // todo: Use standard style guide
  const [url_set, setUrl] = useState(url)
  const [search, setsearch] = useState();
  // const [show, setshow]=useState(false);
  const [page, setPage] = useState(1);
  const [Type, setType] = useState("Popular");

  const fetchMoreData = () => {
    Data();
  }

  const Data = () => {
    setPage(page + 1);
    getData(Type)
  }


  const {giveUserName} = useHelper();

  useEffect(() => {
    fetch(url_set).then(res => res.json()).then(data => {
      try {
        // const merge = [...movieData,...data.results]
        // todo: prevState instead of prevstate
        setData(prevstate => [...prevstate, ...data.results]);
      } catch {
        // todo: catch statement empty
      }
    });
  }, [url_set])

  // todo: functional form of setting data.
  useEffect(() => {
    setData([]);
    setPage(1);
    setUrl("")

  }, [Type])


  const getData = (movieType) => {
    // todo: use switch statement
    // todo: Make keywords constant eg. POPULAR = "popular"
    if (movieType === "Popular") {
      url = base_url + "/movie/popular" + API_key + "&language=en-US&page=" + page;
      setUrl(url);
    }
    if (movieType === "Top-Rated") {
      url = base_url + "/movie/top_rated" + API_key + "&language=en-US&page=" + page;
      setUrl(url);
    }
    if (movieType === "Theatre") {
      url = base_url + "/movie/now_playing" + API_key + "&language=en-US&page=" + page;
      setUrl(url);
    }
    if (movieType === "Upcoming") {
      url = base_url + "/movie/upcoming" + API_key + "&language=en-US&page=" + page;
      setUrl(url);
    }
    if (movieType === "Watchlist") {
      setType("")
      setData([])
      setData(JSON.parse(window.localStorage.getItem('watchlist')));
    }

  }
  const searchMovie = (e) => {
    e.preventDefault();
    if (search !== "") {
      url = base_url + "/search/movie" + API_key + "&query=" + search;
      if (url !== url_set) {
        setUrl(url);
        setsearch("")
        setData([]);
        setType("")

      } else {
        url = url + " ";
        setUrl(url);
        setsearch("")
        setData([]);
        setType("")

      }
    }
  }

  // todo: Extract component out of this.
  const loader = () => {
    return (
      <div className="loader">
        <Loader type="ekvalayzer" bgColor={"#ff6b81"} title={"loading"} size={100}/>
      </div>
    )
  }


  return (
    <>
      <Navbar bg="dark" expand="lg">
        <nav>
          <ul>
            {
              arr.map((value, index) => {
                return (
                  <li>
                    {/*todo: create a function for onClick*/}
                    <a href="#" name={value} key={value} onClick={(e) => {getData(e.target.name);setType(e.target.name)}}>{value}</a></li>
                )
              })
            }
          </ul>

        </nav>

        <form>
          <div className="search-btn">
            <input type="text" placeholder="Search for a movie" className="inputText" onChange={(e) => {
              setsearch(e.target.value)
            }} value={search}/>
            <button onClick={searchMovie}><i className="fa-sharp fa-solid fa-magnifying-glass"></i></button>
          </div>
        </form>
      </Navbar>
      <div className="contain">
        <InfiniteScroll
          dataLength={movieData.length}
          next={fetchMoreData}
          hasMore={true}
        >
          {
            movieData?.length ?
              <div>{loader()}</div> :
              movieData.map((res, pos) => {
              return (
                <Car info={res} key={pos}/>
              )
            })
          }
        </InfiniteScroll>
      </div>
    </>
  )
}
export default Main;