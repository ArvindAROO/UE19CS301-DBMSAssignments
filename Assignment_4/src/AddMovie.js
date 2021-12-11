import React,{useState} from 'react';
import axios from 'axios'
import {useHistory} from "react-router-dom";

function AddMovie(){
    const [name, setName] = useState("");
    const [director, setDirector] = useState("");
    const [release_date, setDate] = useState("");
    const [actor, setActor] = useState("");
    const [age,setAge] = useState(0);
    const [gender,setGender] = useState("");
    const history=useHistory();
    
    const handleSubmit = (event) => {
        event.preventDefault();

        let user_data={
            name: name,
            director:director,
            release_date:release_date,
            actor:actor,
            age:age,
            gender:gender
        }

        axios.post("http://localhost:8000/dashboard/addmovie",user_data)
        .then((resp)=>{
            if(resp.data==="0"){
                alert("Adding movie was unsuccessful try again");
            }
            else if(resp.data){
                console.log("In add movie:"+resp);
                alert("Movie added successfully");
                history.push("/dashboard/theatre");
            }
            })
            .catch((err)=>console.log(err));
        }

    return(
        <div>
            <h1>Add Movie</h1>
            <br/>
            <form onSubmit={handleSubmit}>
                <label>Enter movie name:<input type="text" value={name}
                                        onChange={(e) => setName(e.target.value)}/></label><br/>
                <label>Enter director name:<input type="text" value={director}
                                    onChange={(e) => setDirector(e.target.value)}/></label><br/>
                <label>Enter release date:<input type="text" value={release_date}
                                            onChange={(e) => setDate(e.target.value)}/></label><br/>
                <label>Enter actor:<input type="text" value={actor}
                                        onChange={(e) => setActor(e.target.value)}/></label><br/>
                <label>Enter actor age:<input type="number" value={age}
                                        onChange={(e) => setAge(e.target.value)}/></label><br/>
                <label>Enter actor gender:<input type="text" value={gender}
                                        onChange={(e) => setGender(e.target.value)}/></label><br/>
                <input type="submit" /><br/>
           </form>
        </div>
    )
}

export default AddMovie;