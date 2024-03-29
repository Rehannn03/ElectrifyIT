import mongoose,{Schema} from "mongoose";

const vehicleSchema=new Schema({
    licencePlate:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    
    },
    model:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    Vin:{
        type:String,
        required:true
    
    },
    mileage:{
        type:Number,
        required:true
    }
})


export default mongoose.model("Vehicle",vehicleSchema)