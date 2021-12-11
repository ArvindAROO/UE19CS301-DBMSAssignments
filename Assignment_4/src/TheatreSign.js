import React , {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from 'axios';

const SignTheatre=()=>{
    const [name, setName] = useState("");
    const [password, setPass] = useState("");
    const [address, setAddress] = useState("");
    const history=useHistory();

    function handleSubmit(e){
        e.preventDefault();

        let user_data={
            name: name,
            address: address,
            password:password
        }

        console.log(user_data);

        axios.post("http://localhost:8000/signup/theatre" , user_data)
        .then((resp)=>{
                if(resp){
                    history.push("/theatre");
                }
                else{
                    alert("Unsuccessful registration");
                }
        })
        .catch(err=>console.log(err));
    }

    return(
        <div>
            <h1>Theatre Signup</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter your name:<input type="text" value={name}
                                        onChange={(e) => setName(e.target.value)}/></label><br/>
                <label>Enter address:<input input type="text" value={address}
                                        onChange={(e) => setAddress(e.target.value)}/></label><br/>          
                <label>Enter password:<input type="password" value={password}
                                        onChange={(e) => setPass(e.target.value)}/></label><br/>
                <input type="submit" />
           </form>
        </div>
    );
}

export default SignTheatre;