const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const {MOGOURI} = require('./config/keys')
const FoodModel = require('./models/Food')

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(MOGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family:4
  })
  .then(() => console.log("database connection successful!"))
  .catch((err) => console.log(err));

  app.post("/insert", async (req,res)=>{
      const foodName = req.body.foodName;
      const days = req.body.days;
      const food = new FoodModel({
          foodName,
          daysSinceIAte:days
      })
    
      try{
         await food.save();
        
      }
      catch(err){
          console.log(err)
      }
  })

  app.get("/read", async (req,res)=>{
       
    try{
        const result = await FoodModel.find({})
        res.json(result)
    
    }catch(err){
        console.log(err)
    }
    
 })

 app.put("/update", async (req,res)=>{
    const newFoodName = req.body.newFoodName;
    const id = req.body.id;

    try{
       const updatedFood = await FoodModel.findById(id);
       updatedFood.foodName = newFoodName;
       updatedFood.save();
       
    }
    catch(err){
        console.log(err);
    }
})

app.delete("/delete/:id", async (req,res) => {
    const id = req.params.id;
    await FoodModel.findByIdAndRemove(id)
    
})

if(process.env.NODE_ENV=='production'){
    const path = require('path')

    app.get('/',(req,res)=>{
        app.use(express.static(path.resolve(__dirname,'client','build')))
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
      console.log(`server is listening to ${PORT}`)
  })