import {Schema, model} from "mongoose";
/* 
    Fields:
        Comment : String,
        Rating : Number,
        idClient : String
*/

const reviewSchema = new Schema({
    comment : {
        type : String,
        required : true,
        maxLength : 50
    },
    rating : {
        type : Number,
        required : true,
        max : 5,
        min : 1

    },
    idClient : {
        type : Schema.Types.ObjectId,
        ref : "clients",
        required : true
    }
},{timestamps : true, strict : false})

export default model("reviews", reviewSchema)
