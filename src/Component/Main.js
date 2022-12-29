import { Navbar } from "react-bootstrap";
import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import InfiniteScroll from 'react-infinite-scroll-component'
import Car from "./Card";
import Loader from "react-js-loader";
// import {VscAdd} from 'react-icons/vsc';
let API_key="?api_key=358959801e525a759e5e9fc3646e37ae";
let base_url="https://api.themoviedb.org/3";
let url=base_url+"/movie/popular"+ API_key+"&language=en-US&page=1";
let arr=["Popular", "Top-Rated","Theatre", "Upcoming", "Watchlist"]
const Main=()=>{
    const [movieData,setData]=useState([]);
    const [url_set, setUrl]=useState(url)
    const [search, setsearch]=useState();
    const [hasMore,setHasMore]=useState(true)
    // const [show, setshow]=useState(false);
    const [page, setPage]=useState(1);
    const  [Type, setType]= useState("Popular");
    // const [watchlist, setWatchlist ] = useState({
    //     Title: "",
    //     Description: ""

    // })
    // const handleshow=()=>setshow(true)
    // const handleclsoe=()=>setshow(false)
    
    const fetchMoreData =() =>{
        Data();
    }
    const Data =()=>{
        setPage(page+1);
      getData(Type)
      console.log(url,Type,movieData.length);


      

    }
    useEffect(()=>{ console.log("useeffect",url_set)
        fetch(url_set).then(res=>res.json()).then(data=>{
                try{
                    // const merge = [...movieData,...data.results]
                    setData(prevstate=>[...prevstate, ...data.results]);
                }
                catch{
                  console.log("iii");
                }
        });
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
            setData(JSON.parse(window.localStorage.getItem('watchlist')));
            console.log(movieData,url_set, page, Type, "new")
        }

        
    }

    console.log(movieData,url_set, page, Type, "prev")
    const searchMovie=(e)=>{console.log("fffffff")
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
    // let name,value;
    // const getWatchlistData=(e)=>{
    //     name =e.target.name;
    //     value=e.target.value;
    //     setWatchlist({...watchlist, [name]:value})
    // }
    
    // const postData=async(event)=>{
    //     event.preventDefault();
    //     const {Title, Description} = watchlist;
    //     const res = await fetch("https://movie-8b385-default-rtdb.firebaseio.com/watchlist.json",
    //     {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //         Title,
    //         Description,}),
    //     })
    //     if(res){
    //             setWatchlist({
    //             Title: "",
    //             Description: ""
        
    //         });
    //         toast.success("Watchlist Added",{
    //             position: "top-center",
    //             theme: "colored",
    //         });

    //     }

    // }
    const loader =() =>{
        return(
            <div className="loader">
                <Loader type="ekvalayzer" bgColor={"#ff6b81"} title={"loading"} size={100} />
            </div>
        )
    }
    return (
        <>
            <Navbar bg="dark" expand="lg" >
                <nav>
                    <ul>
                        {
                            arr.map((value, index)=>{
                                return(
                                    <li><a href="#0" name={value} key={value} onClick={(e)=>{getData(e.target.name);e.target.name!="Watchlist" ?? setType(e.target.name)}}>{value}</a></li>
                                )
                            })
                        }
                        {/* <li>
                            <a href="#0" onClick={handleshow}><i className="fa-solid fa-plus" ></i> Watchlist</a>
                            <Modal show={show} onHide={handleclsoe} method="POST">
                                <Modal.Header closeButton>
                                    <Modal.Title>Watchlist</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form >
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Title" name="Title" value={watchlist.Title} onChange={getWatchlistData}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control type="text" placeholder="Enter Description" name="Description" value={watchlist.Description} onChange={getWatchlistData}/>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleclsoe}>Close</Button>
                                    <Button variant="primary" onClick={postData}>Save</Button>
                                    <VscAdd onClick={handleshow}/>

                                </Modal.Footer>
                                </Modal> 
                        </li> */}
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
                    (movieData.length===0)? <div>{loader()}</div>:movieData.map((res,pos)=>{
                        return(
                            <Car info={res} key={pos}/>
                        )
                    })
                }
                </InfiniteScroll>
                {/* {
                    (movieData.length===0)?<p className="notfound">Not Found</p>:movieData.map((res,pos)=>{
                        return(
                            <Car info={res} key={pos}/>
                        )
                    })
                } */}
            </div>
            {/* <ToastContainer /> */}
        </>
    )
}
export default Main;