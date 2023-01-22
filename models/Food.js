const mongoose = require('mongoose');

const FoodSchema = mongoose.Schema(
    {
        foodName:{
            type:String,
            required:true
        },
        daysSinceIAte:{
            type:Number,
            required:true
        }
    }
)

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;