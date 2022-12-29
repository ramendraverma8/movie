import { Navbar } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component'
import Car from "./Card";
import Loader from "react-js-loader";
let API_key="?api_key=358959801e525a759e5e9fc3646e37ae";
let base_url="https://api.themoviedb.org/3";
let url=base_url+"/movie/popular"+ API_key+"&language=en-US&page=1";
let arr=["Popular", "Top-Rated","Theatre", "Upcoming", "Watchlist"]
const Main=()=>{
    const [movieData,setData]=useState([]);
    const [url_set, setUrl]=useState(url)
    const [search, setsearch]=useState();
    const [hasMore,setHasMore]=useState(true)
    const [page, setPage]=useState(1);
    const  [Type, setType]= useState("Popular");
    
    const fetchMoreData =() =>{
        Data();
    }
    const Data =()=>{
        setPage(page+1);
      getData(Type)
    }
    useEffect(()=>{
        if (movieData.length ===0 ){
            setTimeout(() => {
                setLoad("No Data Found")   
               }, 100);
        }
        else{
            setLoad(<div className="loader">
            <Loader type="ekvalayzer" bgColor={"#ff6b81"} title={"loading"} size={100} />
            </div>)
        } 
    },[movieData])
      
        useEffect(()=>{ console.log("useeffect",url_set)
        fetch(url_set).then(res=>res.json()).then(data=>{
                try{
                    setData(prevstate=>[...prevstate, ...data.results]);
                }
                catch{
                  console.log("iii");
                }
        });setHasMore(true)
    },[url_set])

    useEffect(()=>{
        setData([]);
        setPage(1);
        setUrl("")

    },[Type])
    const getData=(movieType)=>{console.log(movieType)
        if(movieType==="Popular")
        {
            url= base_url+"/movie/popular"+ API_key+"&language=en-US&page="+page;
            setUrl(url);
        }
        if(movieType==="Top-Rated")
        {
            url=base_url+"/movie/top_rated"+ API_key+"&language=en-US&page="+page;
            setUrl(url);
        }
        if(movieType==="Theatre")
        {
            url=base_url+"/movie/now_playing"+ API_key+"&language=en-US&page="+page;
            setUrl(url);
        }
        if(movieType==="Upcoming")
        {
            url=base_url+"/movie/upcoming"+ API_key+"&language=en-US&page="+page;
            setUrl(url);
        }
        if(movieType==="Watchlist"){
            setHasMore(false)
            setUrl("")
            setPage(1);
            setData(JSON.parse(window.localStorage.getItem('watchlist')));
        }

        
    }
    const searchMovie=(e)=>{
        e.preventDefault();
        if (search !== "")
            {

                url=base_url+"/search/movie"+API_key+"&query=" + search;
                console.log(url)
                if(url!==url_set)
                {
                    setUrl(url);
                    setsearch("")
                    setData([]);
                    setType("")

                }
                else{
                    url= url + " ";
                    setUrl(url);
                    setsearch("")
                    setData([]);
                    setType("")

                }
            }
        }
    const [load, setLoad] = useState(<div className="loader">
    <Loader type="ekvalayzer" bgColor={"#ff6b81"} title={"loading"} size={100} />
    </div>)
    return (
        <>
            <Navbar bg="dark" expand="lg" >
                <nav>
                    <ul>
                        {
                            arr.map((value, index)=>{
                                return(
                                    <li><a href="#0" name={value} key={value} onClick={(e)=>{getData(e.target.name);e.target.name!=="Watchlist" ? setType(e.target.name):setType(Type) }}>{value}</a></li>
                                )
                            })
                        }
                    </ul>
                    
                </nav>
                
                <form>
                    <div className="search-btn">
                        <input type="text" placeholder="Search for a movie" className="inputText" onChange={(e)=>{setsearch(e.target.value)}} value={search}/>
                        <button onClick={searchMovie}><i className="fa-sharp fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </form>
            </Navbar>
            <div className="contain">
            <InfiniteScroll
                  dataLength={movieData.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
            >
                  {
                    (movieData.length===0)? <div>{load}</div>:movieData.map((res,pos)=>{
                        return(
                            <Car info={res} key={pos} getData={getData}/>
                        )
                    })
                }
                </InfiniteScroll>
            </div>
        </>
    )
}
export default Main;