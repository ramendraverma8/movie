import React, {useState} from "react";
import { Modal , Button,} from "react-bootstrap";

function Car(movie){
    const [show, setshow]=useState(false)
    
    let img_path="https://image.tmdb.org/t/p/w500";
    const handleshow=()=>setshow(true)
    const handleClose=()=>setshow(false)

    return(
        <>
    
            {/* <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={img_path+movie.info.poster_path} />
            <Card.Body>
                <Card.Title>{movie.info.title}</Card.Title>
            </Card.Body>
            </Card> */}
            <div className="movie" onClick={handleshow}>
                <div className="photo">
                    <img src={img_path+movie.info.poster_path} alt="{movie.info.title}"  className="poster" ></img>
                    <p className="rating">{movie.info.vote_average}</p>
                </div>
                 <div className="movie-details">
                        <div className="box">
                            <h4 className="title">{movie.info.title}</h4>
                            <p className="rating">{movie.info.vote_average}</p>
                        </div>
            </div>
                </div> 
                    <div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton className="cba">
                                <Modal.Title>
                                <h3 style={{align:"center"}}><b>{movie.info.title}</b></h3>
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <img className="card-img-top , abc" alt="{movie.info.title}" style={{width:'15rem',}}src={img_path+movie.info.poster_path} />
                                <h2>&nbsp;</h2>
                                <h4><b>TMDb:</b> {movie.info.vote_average}</h4>
                                <h5><b>Release Date:</b> {movie.info.release_date}</h5>
                                <br></br>
                                <h5><b>Overview</b></h5>
                                <p>{movie.info.overview}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>Close</Button>
                            </Modal.Footer>
                     </Modal>
                    </div>

            

        </>
    )
}
export default Car;