import mongoose,{Schema} from "mongoose";

const montlySummarySchema=new Schema({
    licencePlate:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle",
    },
    date:{
        type:Date,
        required:true
    },
    montlyTotalMiles:{
        type:Number,
        required:true
    }
},{timestamps:true})

export default mongoose.model("montlySummary",montlySummarySchema)