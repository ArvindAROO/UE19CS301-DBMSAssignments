import React,{useState} from 'react';
import axios from 'axios'

function UserDash(){
    const [bookings, setBookings] = useState([]);
    const [isShowBooking, setShowBooking] = useState(false);
    const [movies,setMovies] = useState([]);
    const [isShowMovies,setShowMovies] = useState(false);

    var username=localStorage.getItem("username")

    const getBookingData=()=>{
        setShowBooking(!isShowBooking);
        axios.get("http://localhost:8000/dashboard/booked/"+username)
        .then((resp)=>{
            setBookings(resp.data);
        })
        .catch((err)=>console.log(err));
    }

    const getMovieData=()=>{
        setShowMovies(!isShowMovies);
        axios.get("http://localhost:8000/dashboard/movies")
        .then((resp)=>{
            setMovies(resp.data);
        })
        .catch((err)=>console.log(err));
    }

            
    return(
        <div>
            <h1>User Dashboard</h1><br/>
            <h2>Welcome {username}</h2>
            <input type="button" value="Show Bookings" onClick={() => getBookingData()}/><br/>
            <ul>
            {isShowBooking && bookings.map((data)=>{
                return(
                    <li>{"movie: "+data.movie_name+" || "+"theatre: "+data.theatre_name+" || " + "date: "+data.show_date+" || "+ "screen: "+data.screen_no+" || "+ "seat_no: "+data.seat_no+" || "+ "price: "+data.final_price+" || "}</li>
                )
            })}
            </ul>
            <input type="button" value="Show Movies" onClick={() => getMovieData()}/><br/>
            <ul>
            {isShowMovies && movies.map((data)=>{
                return(
                    <li>{"theatre: "+data.theatre_name+" || " +"movie: "+data.movie_name+" || "+ "release date: "+data.release_date+" || "+ "language: "+data.language+" || "}</li>
                )
            })}
            </ul>
        </div>
    )
}

export default UserDash;