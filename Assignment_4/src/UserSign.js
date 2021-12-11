import React , {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from 'axios';

const SignUser=()=>{
    const [name, setName] = useState("");
    const [email, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPass] = useState("");
    const history=useHistory();

    function handleSubmit(e){
        e.preventDefault();

        let user_data={
            name: name,
            email:email,
            phone:phone,
            password:password
        }

        console.log(user_data);

        axios.post("http://localhost:8000/signup/user" , user_data)
        .then((resp)=>{
                if(resp){
                    history.push("/user");
                }
                else{
                    alert("Unsuccessful registration");
                }
        })
        .catch(err=>console.log(err));
    }

    return(
        <div>
            <h1>Customer Signup</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter your name:<input type="text" value={name}
                                        onChange={(e) => setName(e.target.value)}/></label><br/>
                <label>Enter email:<input type="text" value={email}
                                    onChange={(e) => setMail(e.target.value)}/></label><br/>
                <label>Enter phone number:<input type="text" value={phone}
                                            onChange={(e) => setPhone(e.target.value)}/></label><br/>
                <label>Enter password:<input type="password" value={password}
                                        onChange={(e) => setPass(e.target.value)}/></label><br/>
                <input type="submit" />
           </form>
        </div>
    );
}

export default SignUser;