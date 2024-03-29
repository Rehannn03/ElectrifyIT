import mongoose,{Schema} from "mongoose";

const yearlySummarySchema=new Schema({
    licencePlate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle",
    },
    date:{
        type:Date,
        required:true
    },
    yearlyTotalMiles:{
        type:Number,
        required:true
    }
},{timestamps:true})

export default mongoose.model("yearlySummary",yearlySummarySchema)