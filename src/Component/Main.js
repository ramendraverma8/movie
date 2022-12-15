import { Modal , Button, Form, Navbar } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Car from "./Card";
let API_key="&api_key=358959801e525a759e5e9fc3646e37ae";
let base_url="https://api.themoviedb.org/3";
let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
let arr=["Popular", "TopRate","theatres", "Upcoming"]
const Main=()=>{
    const [movieData,setData]=useState([]);
    const [url_set, setUrl]=useState(url)
    const [search, setsearch]=useState();
    const [show, setshow]=useState(false);
    const [watchlist, setWatchlist ] = useState({
        Title: "",
        Description: ""

    })
    const handleshow=()=>setshow(true)
    const handleclsoe=()=>setshow(false)

    useEffect(()=>{ 
        fetch(url_set).then(res=>res.json()).then(data=>{
            setData(data.results);
        });
    },[url_set])
    const getData=(movieType)=>{  debugger;
        if(movieType==="Popular")
        {
            https://api.themoviedb.org/3/movie/popular?api_key=358959801e525a759e5e9fc3646e37ae&language=en-US&page=1
            url="https://api.themoviedb.org/3/movie/popular?api_key=358959801e525a759e5e9fc3646e37ae&language=en-US&page=1";
        }
        if(movieType==="TopRate")
        {
            url="https://api.themoviedb.org/3/movie/top_rated?api_key=358959801e525a759e5e9fc3646e37ae&language=en-US&page=1";
        }
        if(movieType==="theatres")
        {
            url="https://api.themoviedb.org/3/movie/now_playing?api_key=358959801e525a759e5e9fc3646e37ae&language=en-US&page=1";
        }
        if(movieType==="Upcoming")
        {
            url="https://api.themoviedb.org/3/movie/upcoming?api_key=358959801e525a759e5e9fc3646e37ae&language=en-US&page=1";
        }
        setUrl(url);
    }
    const abc=(e)=>{
        url= "https://api.themoviedb.org/3/movie/top_rated?api_key=358959801e525a759e5e9fc3646e37ae&language=en-US&page=2";
        setUrl(url);
    }
    const searchMovie=(e)=>{
        if(e.key==="Enter")
        {
            url=base_url+"/search/movie?api_key="+"358959801e525a759e5e9fc3646e37ae"+"&query="+search;
            console.log(url);
            setUrl(url);
            setsearch(" ")
        }}
    let name,value;
    const getWatchlistData=(e)=>{
        name =e.target.name;
        value=e.target.value;
        setWatchlist({...watchlist, [name]:value})
    }
    
    const postData=async(event)=>{
        event.preventDefault();
        const {Title, Description} = watchlist;
        const res = await fetch("https://movie-8b385-default-rtdb.firebaseio.com/watchlist.json",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            Title,
            Description,}),
        })
        if(res){
                setWatchlist({
                Title: "",
                Description: ""
        
            });
            toast.success("Watchlist Added",{
                position: "top-center",
                theme: "colored",
            });

        }

    }
    return (
        <>
            <Navbar bg="dark" expand="lg">
                <nav>
                    <ul>
                        {
                            arr.map((value)=>{
                                return(
                                    <li><a href="#" name={value} key={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li>
                                )
                            })
                        }
                        <li>
                            <a href="#" onClick={handleshow}><i className="fa-solid fa-plus" ></i>Add Watchlist</a>
                            <Modal show={show} onHide={handleclsoe} method="POST">
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Watchlist</Modal.Title>
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

                                </Modal.Footer>
                                </Modal> 
                        </li>
                    </ul>
                    
                </nav>
                
                <form>
                    <div className="search-btn">
                        <input type="text" placeholder="Search for a movie" className="inputText" onChange={(e)=>{setsearch(e.target.value)}} value={search} onKeyPress={searchMovie}/>
                        <button><i className="fa-sharp fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </form>
            </Navbar>
            <div className="contain">
                {
                    (movieData.length===0)?<p className="notfound">Not Found</p>:movieData.map((res,pos)=>{
                        return(
                            <Car info={res} key={pos}/>
                        )
                    })
                }
            </div>
            <div className="bc">
            <a href="#" onClick={abc}>Next page....</a>
            </div>
            <div className="ac">
            <a href="#" onClick={abc}>Last page....</a>
            </div>
            <ToastContainer />
        </>
    )
}
export default Main;