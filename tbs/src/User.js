import React,{useState} from 'react';
import axios from 'axios'
import {Link,useHistory} from "react-router-dom";

var username

function User(){
    const [name, setName] = useState("");
    const [email, setMail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPass] = useState("");
    const history=useHistory();
    
    const handleSubmit = (event) => {
        event.preventDefault();

        let user_data={
            name: name,
            email:email,
            phone:phone,
            password:password
        }

        axios.post("http://localhost:8000",user_data)
        .then((resp)=>{
            if(resp.data=="0"){
                alert("Login was unsuccessfull try again");
            }
            else if(resp.data){
                username = resp.data.name
                localStorage.setItem("username" , username);
                console.log("user is:"+username);
                history.push('/home');
            }
            })
            .catch((err)=>console.log(err));
        }

    return(
        <div>
            <h1>Customer Login</h1>
            <br/>
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

export default User;