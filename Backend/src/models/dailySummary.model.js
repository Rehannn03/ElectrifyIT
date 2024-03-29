import mongoose,{Schema} from "mongoose";

const dailySummarySchema=new Schema({
    licencePlate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle",
    },
    date:{
        type:Date,
        required:true
    },
    dailyTotalMiles:{
        type:Number,
        required:true
    }
},{timestamps:true})

export default mongoose.model("dailySummary",dailySummarySchema)