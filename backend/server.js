const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');

const app=express();


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/greenclub', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const registrationSchema =new mongoose.Schema({
    fullName:String,
    contact:String,
    email:String,
    branch:String,
    team:String,
    reason:String
});

const Registration=mongoose.model('Registration',registrationSchema);

app.post("/register",async(req,res)=>{
    try{
        console.log("Received data:", req.body);
        const newEntry = new Registration(req.body);
        await newEntry.save();
        res.status(201).send("Registration successful");
    }catch(err){
        console.error("Error saving data",err);
        res.status(500).json({message:"Server error"});
    }
});

app.get("./registrations",async(req,res)=>{
    try{
        const registrations=await Registration.find();
        res.json(registrations);
    }catch(err){
        console.error("Error fetching data",err);
        res.status(500).json({message:"Server error"});
    }
});

const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});