import {Schema, model} from "mongoose";
/*
    Fields:
        comment : String,
        grade : Number,
        role : String,
        idEmployee : String.ObjectId
*/

const assessmentSchema = new Schema({
    comment : {
        type : String,
        required : true,
        maxLength : 50
    },
    grade : {
        type : Number,
        required : true,
        max : 10,
        min : 1
    },
    role : {
        type : String,
        required : true,
        maxLength : 50
    },
    idEmployee : {
        type : Schema.Types.ObjectId,
        ref : "employees",
        required : true
    }
},{timestamps : true, strict : false})

export default model("assessments", assessmentSchema)