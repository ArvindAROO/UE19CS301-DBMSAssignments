import React,{useState} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

function TheatreDash(){
    const [isShowMovie, setShowMovie] = useState(false);
    const [movies,setMovies] = useState([]);
    var username=localStorage.getItem("theatre_name")

    const getMovieData=()=>{
        setShowMovie(!isShowMovie);
        axios.get("http://localhost:8000/dashboard/moviesRun/"+encodeURI(username))
        .then((resp)=>{
            setMovies(resp.data);
            console.log(movies);
        })
        .catch((err)=>console.log(err));
    }

    return(
        <div>
            <h1>Theatre Dashboard</h1><br/>
            <h2>Welcome {username}</h2>

            <input type="button" value="Movies Running" onClick={() => getMovieData()}/><br/>
            <ul>
            {isShowMovie && movies.map((data)=>{
                return(
                    <li>{"movie: "+data.movie_name+" || release date: "+data.release_date+" || screen: "+data.screen_no+" || start time: "+data.start_time+" || end time: "+data.end_time+" || language: "+data.language}</li>
                )
            })}
            </ul>

            <Link to='/addMovie'><input type='button' value='Add Movie'/></Link><br/><br/>
            <Link to='/addShow'><input type='button' value='Add Show'/></Link>
        </div>
    )    
}

export default TheatreDash;