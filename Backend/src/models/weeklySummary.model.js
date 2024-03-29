import mongoose,{Schema} from "mongoose";

const weeklySummarySchema=new Schema({
    licencePlate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle",
    },
    date:{
        type:Date,
        required:true
    },
    weeklyTotalMiles:{
        type:Number,
        required:true
    }
},{timestamps:true})

export default mongoose.model("weeklySummary",weeklySummarySchema)