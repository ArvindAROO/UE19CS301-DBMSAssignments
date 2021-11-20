import React,{useState} from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";


function AddShow(){
    const [name, setName] = useState("");
    const [language, setLanguage] = useState(0);
    const [show_date, setDate] = useState("");
    const [start_time, setStart] = useState("");
    const [end_time,setEnd] = useState("");
    const [screen_no,setScreen] = useState(0);
    const history=useHistory();

    var theatre_name=localStorage.getItem("theatre_name");
    const handleSubmit = (event) => {
        event.preventDefault();

        let user_data={
            movie_name: name,
            show_date:show_date,
            start_time:start_time,
            end_time:end_time,
            theatre_name:theatre_name,
            language:language,
            screen_no:screen_no
        }
        console.log(user_data);
        axios.post("http://localhost:8000/dashboard/addshow",user_data)
        .then((resp)=>{
            if(resp.data=="0"){
                alert("Adding movie was unsuccessfull try again");
            }
            else if(resp.data){
                alert("Show added successfully");
                history.push("/dashboard/theatre");
            }
            })
            .catch((err)=>console.log(err));
        }

    return(
        <div>
            <h1>Add Show</h1>
            <br/>
            <form onSubmit={handleSubmit}>
                <label>Enter movie name:<input type="text" value={name}
                                        onChange={(e) => setName(e.target.value)}/></label><br/>
                <label>Enter language:<input type="number" value={language}
                                        onChange={(e) => setLanguage(e.target.value)}/></label><br/>                                    
                <label>Enter show date:<input type="text" value={show_date}
                                    onChange={(e) => setDate(e.target.value)}/></label><br/>
                <label>Enter start time:<input type="text" value={start_time}
                                            onChange={(e) => setStart(e.target.value)}/></label><br/>
                <label>Enter end time:<input type="text" value={end_time}
                                        onChange={(e) => setEnd(e.target.value)}/></label><br/>
                <label>Enter screen number:<input type="number" value={screen_no}
                                        onChange={(e) => setScreen(e.target.value)}/></label><br/>
                <input type="submit" /><br/>
           </form>
        </div>
    )
}

export default AddShow;