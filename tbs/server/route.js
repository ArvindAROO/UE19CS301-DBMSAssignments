const express=require('express');
const app=express();

const cors=require('cors');
const pool=require('./db');
const router=express.Router();

app.use(cors());
app.use(express.json());

//route created for user login
router.post("/user",async(req,res)=>{
    try{
        const {name,email,phone,password}=req.body;
        const result= await pool.query("SELECT cust_name, cust_id from customer where cust_name=($1) and email_id=($2) and phone_no=($3)",
        [name,email,phone]);
        if(!result){
            console.log("no user exists");
            return res.send('0');
        }
        else{
            res.json(result);
        }
    }
    catch(e){
        res.send("0")
        console.log(e);
    }
})

//route created for cashier login
router.post('/cashier',async(req,res)=>{
    try{
        const {name,password}=req.body;
        const result=await pool.query("SELECT FROM cashier where cashier_name=$1",[name]);
        if(!result){
            res.send('No user found');
        }
        else{   
            res.json(result);
        }

    }catch(e){
        res.send("0");
        console.log(e);
    }
})

//route created for theatre login
router.post('/theatre',async(req,res)=>{
    try{
        const {name,password}=req.body;
        const result=pool.query("SELECT FROM theatre where theatre_name=$1",[name]);
        if(!result){
            res.send('No Theatre found');
        }
        else{   
            res.json(result);
        }
    }catch(e){
        res.send("0");
        console.log('theatre');
    }
})

//route created for user signup
router.post("/signup/user",async(req,res)=>{
    try{
        const {name,email,phone}=req.body;
        id=Math.random().toString(36).replace('0.', '').substr(0, 6).toUpperCase();
        const newUser= await pool.query("INSERT INTO customer (cust_name,cust_id,email_id,phone_no) VALUES ($1,$2,$3,$4) returning *",
        [name,id,email,phone]);
        if(!result){
            res.send('user cant be created');
        }
        else{
            res.send(`User registered ${newUser.rows}`);
        }
    }
    catch(e){
        res.send("0")
        console.log(e);
    }
})

//route created for adding cashier
router.post("/signup/cashier",async(req,res)=>{
    try{
        const {name,address,password}=req.body;
        id=Math.random().toString(36).replace('0.', '').substr(0, 6).toUpperCase();
        const newUser=await pool.query("INSERT INTO cashier (cashier_id,cashier_name,cashier_address) VALUES ($1,$2,$3) returning *",
        [id,name,address]);
        if(!newUser){
            res.send("user cant be created");
        }
        else{
            res.send(`Cashier registered ${newUser.rows}`);
        }
        
    }
    catch(e){
        res.send("0");
        console.log(e);
    }
})

//route created for adding theatre
router.post("/signup/theatre",async(req,res)=>{
    try{
        const {name,address,password}=req.body;
        id=Math.random().toString(36).replace('0.', '').substr(0, 6).toUpperCase();
        const newUser = await pool.query("INSERT INTO theatre (theatre_id,theatre_name,theatre_address) VALUES ($1,$2,$3) returning *",
        [id,name,address]);
        if(e){
            res.send("Theatre cant be created");
        }
        else{
            res.send(`Theatre registered ${newUser.rows}`);
        }
    }
    catch(e){
        res.send("0");
    }
})

router.get("dashboard/user/ticketDetails",async(req,res)=>{
    try{
        const {name}=req.query.name;
        const user=await pool.query("SELECT * FROM customer NATURAL JOIN ticket where cust_name=$1;",[name]);
        if(!user){
            alert("No ticket booked");
            res.send("0");
        }

        const movie_name=await pool.query("SELECT movie_name from movie NATURAL JOIN shows WHERE show_id IN (SELECT show_id FROM customer NATURAL JOIN ticket WHERE cust_name=$1);",[name]);
        

        if(!result){
            res.send('0');
        }
        else{
            res.json(result);
        }
    }catch(e){
        res.send('0')
    }
})

module.exports=router;
