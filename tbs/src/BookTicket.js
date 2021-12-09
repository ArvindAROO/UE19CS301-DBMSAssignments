import React , {useState} from "react";
import axios from 'axios';


const BookTicket=()=>{
    const [customer_name, setName] = useState("");
    const [movie_name, setMovie] = useState("");


    function handleSubmit(e){
        e.preventDefault();

        let user_data={
            name: customer_name,
            movie: movie_name,

        }

        console.log(user_data);

        axios.post("http://localhost:8000/user/booktickets" , user_data)
        .then((resp)=>{
                if(resp){
                    alert("Ticket Booked Successfully");
                    // history.push("/user");
                }
                else{
                    alert("Error, retry again");
                }
        })
        .catch(err=>console.log(err));
    }

    return(
        <div>
            <h1>Customer Signup</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter your name:<input type="text" value={customer_name}
                                        onChange={(e) => setName(e.target.value)}/></label><br/>
                <label>Enter movie:<input type="text" value={movie_name}
                                    onChange={(e) => setMovie(e.target.value)}/></label><br/>

                <input type="submit" />
           </form>
        </div>
    );
}

export default BookTicket;