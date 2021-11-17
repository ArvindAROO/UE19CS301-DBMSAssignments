import React from 'react';
import {Link } from "react-router-dom";

function Selection(){
    return(
        <div>
            <h1>Select Type of User</h1>
            <br/>
            <Link to="/user">Customer login</Link>
            <br/>
            <Link to="/cashier">Cashier login</Link>
            <br/>
            <Link to="/theatre">Theatre login</Link>
        </div>
    );
}
export default Selection;