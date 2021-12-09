import React , {useState} from "react";
import axios from 'axios';
import {useHistory} from "react-router-dom";

const BookTicket=()=>{
    const [offer_id, setOffer] = useState("");
    const [movie_name, setMovie] = useState("");
    const history=useHistory();

    var username=localStorage.getItem("username");

    function handleSubmit(e){
        e.preventDefault();

        let user_data={
            customer_name: username,
            movie_name: movie_name,
            offer_id: offer_id,
        }
        console.log(user_data);

        axios.post("http://localhost:8000/user/booktickets" , user_data)
        .then((resp)=>{
                if(resp){
                    alert("Ticket Booked Successfully");
                    history.push("/dashboard/user");
                }
                else{
                    alert("Error, retry again");
                }
        })
        .catch(err=>console.log(err));
    }

    return(
        <div>
            <h1>Book Ticket</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter movie name: <input type="text" value={movie_name}
                                    onChange={(e) => setMovie(e.target.value)}/></label><br/>
                <label>Enter Discount Code: <input type="text" value={offer_id}  onChange={(e) => setOffer(e.target.value)}/></label><br/>

                <input type="submit" />
           </form>
        </div>
    );
}

export default BookTicket;