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
        if(result.rows.length==0){
            console.log("no user exists");
            res.send('0');
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
        const result=await pool.query("SELECT FROM cashier where cashier_name=$1",[name.toLowerCase()]);
        if(result.rows.length==0){
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
        const result=await pool.query("SELECT FROM theatre WHERE theatre_name=$1",[name]);
        console.log(result.rows);
        if(result.rows.length==0){
            console.log("no theatre found");
            res.send('0');
        }
        else{   
            res.json(result);
        }
    }catch(e){
        res.send("0");
        console.log(e);
    }
})

//route created for user signup
router.post("/signup/user",async(req,res)=>{
    try{
        const {name,email,phone}=req.body;
        id=Math.random().toString(36).replace('0.', '').substr(0, 6).toUpperCase();
        const newUser= await pool.query("INSERT INTO customer (cust_name,cust_id,email_id,phone_no) VALUES ($1,$2,$3,$4) returning *",
        [name.toLowerCase(),id,email.toLowerCase(),phone]);
        if(newUser.rows.length==0){
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
        [id,name.toLowerCase(),address.toLowerCase()]);
        if(newUser.rows.length==0){
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
        [id,name.toLowerCase(),address.toLowerCase()]);
        if(newUser.rows.length==0){
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

//route for dashboard for user
router.get("/dashboard/movies",async(req,res)=>{
    try{
        const result=await pool.query("select theatre_name, movie_name,Q.release_date,language from theatre natural join (select * from movie natural join shows) as Q order by(theatre_name);");
        if(result.rows.length==0){
            res.send('0');
        }
        else{   
            res.send(result.rows);
        }
    }catch(e){
        res.send("0");
        console.log(e);
    }
});

//route for checking tickets booked by user
router.get("/dashboard/booked/:name",async(req,res)=>{
    try{
        const {name}=req.params;

        const user=await pool.query("SELECT theatre_name,movie_name,show_date,screen_no,ticket_no,seat_no,final_price FROM movie NATURAL JOIN (theatre NATURAL JOIN (SELECT * FROM shows NATURAL JOIN (SELECT * FROM customer NATURAL JOIN ticket) AS Q) AS S) as E WHERE cust_name=$1;",[name]);
        if(user.rows.length==0){
            res.send("0");
        }
        else{
            res.send(user.rows);
        }
    }catch(e){
        res.send('0')
        console.log(e);
    }
})

//route for movies run by a theatre
router.get("/dashboard/moviesRun/:theatre",async(req,res)=>{
    try{
        const {theatre}=req.params;
        
        const result=await pool.query("SELECT movie_name,Q.release_date,language,start_time,end_time,screen_no from theatre natural join (select * from movie natural join shows) as Q where theatre_name=$1;",[theatre]);
        if(result.rows.length==0){
            res.send('0');
        }
        else{   
            res.send(result.rows);
        }
    }catch(e){
        res.send("0");
        console.log(e);
    }
});

//route for adding new movie by theatre
router.post("/dashboard/addmovie",async(req,res)=>{
    try{
        const {name,director,release_date,actor,age,gender}=req.body;
        id=Math.random().toString(36).replace('0.', '').substr(0, 6).toUpperCase();
        const result=await pool.query("INSERT INTO movie (movie_id , movie_name , director ,release_date) VALUES ($1,$2,$3,$4) returning *",
        [id,name,director,release_date]);
        const result1=await pool.query("INSERT INTO actors (Actor_name,Age,Sex,movie_id) VALUES ($1,$2,$3,$4) returning *",
        [actor,age,gender,id]);
        if(result.rows.length==0){
            console.log('Movie cant be added')
            res.send('0');
        }
        else if(result1.rows.length==0){
            console.log('Actor cannot be added')
            res.send('0');
        }
        else{
            res.send(`Movie added ${result.rows}`);
        }
    }
    catch(e){
        res.send("0");
        console.log(e);
    }
})

//route for adding new show by theatre
router.post("/dashboard/addshow",async(req,res)=>{
    try{
        const {movie_name,show_date,start_time,end_time,theatre_name,language,screen_no}=req.body;
        const movie_id=await pool.query("SELECT movie_id FROM movie WHERE movie_name=$1",[movie_name]) 
        const theatre_id=await pool.query("SELECT theatre_id FROM theatre WHERE theatre_name=$1",[theatre_name]) 
        console.log(movie_id.rows[0].movie_id,theatre_id.rows[0].theatre_id)
        id=Math.random().toString(36).replace('0.', '').substr(0, 6).toUpperCase();

        const result=await pool.query("INSERT INTO shows (start_time, end_time, show_id, language,screen_no, show_date,movie_id,theatre_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) returning *",
        [start_time,end_time,id,language,screen_no,show_date,movie_id.rows[0].movie_id,theatre_id.rows[0].theatre_id]);
        if(result.rows.length==0){
            res.send('Show cant be added');
        }
        else{
            res.send(`Show added ${result.rows}`);
        }
    }
    catch(e){
        res.send("0");
        console.log(e);
    }
})


module.exports=router;
