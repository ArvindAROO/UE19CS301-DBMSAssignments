const express=require('express');
const app=express();

const cors=require('cors');
const route=require('./route');

app.use(cors());
app.use(express.json());

app.use('/',route);


const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

