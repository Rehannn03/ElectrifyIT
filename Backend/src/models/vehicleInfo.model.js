import mongoose,{Schema} from "mongoose";

const vehicleInfoSchema=new Schema({
    licencePlate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle",
    },
    miles:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    
    }
},{timestamps:true})

vehicleInfoSchema.method.totalMiles=function(miles){
    this.totalMiles+=miles
    this.save()
    return this.totalMiles
}


export default mongoose.model("VehicleInfo",vehicleInfoSchema)