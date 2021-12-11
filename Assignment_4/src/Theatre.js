import React,{useState} from 'react';
import axios from 'axios'
import {Link,useHistory} from "react-router-dom";

var theatre_name

function User(){
    const [name, setName] = useState("");
    const [password, setPass] = useState("");
    const history=useHistory();
    
    const handleSubmit = (event) => {
        event.preventDefault();

        let user_data={
            name: name,
            password:password
        }

        console.log(user_data);

        axios.post("http://localhost:8000/theatre",user_data)
        .then((resp)=>{
            if(resp.data==="0"){
                alert("Login was unsuccessfull try again");
            }
            else if(resp.data){
                theatre_name = user_data.name
                localStorage.setItem("theatre_name" , theatre_name);
                console.log("user is:"+theatre_name);
                history.push("/dashboard/theatre");
            }
            })
            .catch((err)=>console.log(err));
        }

    return(
        <div>
            <h1>Theatre Login</h1>
            <br/>
            <form onSubmit={handleSubmit}>
                <label>Enter theatre name:<input type="text" value={name}
                                        onChange={(e) => setName(e.target.value)}/></label><br/>
                <label>Enter password:<input type="password" value={password}
                                        onChange={(e) => setPass(e.target.value)}/></label><br/>
                <input type="submit" /><br/>
           </form>
           <small>Don't have a account?<Link to="/signup/theatre">Click here</Link></small>
        </div>
    );
}

export default User;