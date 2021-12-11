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
        if(result.rows.length===0){
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


//user to book tickets
router.post("/user/booktickets",async(req,res)=>{
    try{
        //INSERT into ticket VALUES('YHSA8H', 12, 250, 'AD8JGA', 190, 'IHSH76', 'HNFOSA', 'A7VGBD');
        let id=Math.random().toString(36).replace('0.', '').substr(0, 6).toUpperCase();
        let seat_no=Math.floor(Math.random() * (100 - 1) + 1);

        const {customer_name, movie_name , offer_id}=req.body;
        console.log(customer_name, movie_name, offer_id);
        const cust_id = await pool.query("SELECT cust_id from customer where cust_name=($1)",[customer_name]);
        console.log(cust_id.rows[0].cust_id);
        const show_id = await pool.query("select show_ID from shows where movie_id = (SELECT movie_id from movie where movie_name=($1))",[movie_name]);
        console.log(show_id.rows[0].show_id);
        const theatre_id = await pool.query("select theatre_id from shows where movie_id = (SELECT movie_id from movie where movie_name=($1))",[movie_name]);
        console.log(theatre_id.rows[0].theatre_id);
        const discount = await pool.query("select discount from offer where offer_id = ($1)",[offer_id]);
        console.log(discount.rows[0].discount);
        var final_price =200-(discount.rows[0].discount/100)*200;
        
        console.log(id ,seat_no,200,offer_id,final_price,show_id.rows[0].show_id,theatre_id.rows[0].theatre_id,cust_id.rows[0].cust_id);
        // inserting into ticket table
        const result= await pool.query("insert into ticket(ticket_no, seat_no, price, offer_id, final_price, show_id, cust_id, theatre_id ) values ($1,$2,$3,$4,$5,$6,$7,$8) returning *",
        [id, seat_no, 200, offer_id, final_price, show_id.rows[0].show_id, cust_id.rows[0].cust_id, theatre_id.rows[0].theatre_id]);

        //reducing count from theatre table
        const reduceCount= await pool.query("update theatre set seats_available=seats_available-1 where theatre_id=($1)",[theatre_id.rows[0].theatre_id]);
        
        console.log("here >>> " + [id, seat_no, 200, NaN, 200, show_id.rows[0].show_id, cust_id.rows[0].cust_id, theatre_id.rows[0].theatre_id].join(','));
        if(result.rows.length===0){
            console.log("Booking failed");
            res.send('0');
        }
        else{
            res.send("Booking successful");
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
        if(result.rows.length===0){
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
        if(result.rows.length===0){
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
        let id=Math.random().toString(36).replace('0.', '').substr(0, 6).toUpperCase();
        const newUser= await pool.query("INSERT INTO customer (cust_name,cust_id,email_id,phone_no) VALUES ($1,$2,$3,$4) returning *",
        [name.toLowerCase(),id,email.toLowerCase(),phone]);
        console.log(newUser.rows[0]);
        console.log("In signUp ")
        if(newUser.rows.length===0){
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
        let id=Math.random().toString(36).replace('0.', '').substr(0, 6).toUpperCase();
        const newUser=await pool.query("INSERT INTO cashier (cashier_id,cashier_name,cashier_address) VALUES ($1,$2,$3) returning *",
        [id,name.toLowerCase(),address.toLowerCase()]);
        if(newUser.rows.length===0){
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
        let id=Math.random().toString(36).replace('0.', '').substr(0, 6).toUpperCase();
        const newUser = await pool.query("INSERT INTO theatre (theatre_id,theatre_name,theatre_address) VALUES ($1,$2,$3) returning *",
        [id,name.toLowerCase(),address.toLowerCase()]);
        console.log(newUser.rows[0]);
        console.log("In signUp ")
        if(newUser.rows.length===0){
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
        if(result.rows.length===0){
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

        //have to fix this query
        const user=await pool.query("select movie_name,screen_no,ticket_no,seat_no,final_price from movie join (SELECT * from shows inner join (select * FROM customer NATURAL JOIN ticket) as Q on Q.show_id=shows.show_id) as E on E.movie_id=movie.movie_id where cust_name=$1;",[name]);
        console.log(user.rows.length);
        if(user.rows.length===0){
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
        console.log(theatre);
        const result=await pool.query("SELECT movie_name,Q.release_date,language,start_time,end_time,screen_no from theatre natural join (select * from movie natural join shows) as Q where theatre_name='"+theatre+"'");
        if(result.rows.length===0){
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
        let id=Math.random().toString(36).replace('0.', '').substr(0, 6).toUpperCase();
        const result=await pool.query("INSERT INTO movie (movie_id , movie_name , director ,release_date) VALUES ($1,$2,$3,$4) returning *",
        [id,name,director,release_date]);
        const result1=await pool.query("INSERT INTO actors (Actor_name,Age,Sex,movie_id) VALUES ($1,$2,$3,$4) returning *",
        [actor,age,gender,id]);
        
        console.log(result.rows[0])

        console.log("in add movie")
        
        if(result.rows.length===0){
            console.log('Movie cant be added')
            res.send('0');
        }
        else if(result1.rows.length===0){
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
        let id=Math.random().toString(36).replace('0.', '').substr(0, 6).toUpperCase();

        const result=await pool.query("INSERT INTO shows (start_time, end_time, show_id, language,screen_no, show_date,movie_id,theatre_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) returning *",
        [start_time,end_time,id,language,screen_no,show_date,movie_id.rows[0].movie_id,theatre_id.rows[0].theatre_id]);
        
        console.log(result.rows[0])
        console.log("in add show")

        if(result.rows.length===0){
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
