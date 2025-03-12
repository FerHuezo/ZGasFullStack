import {Schema, model} from "mongoose";
/*
    Fields:
        name
        description
        price
        stock
*/

const productsSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : false
    },
    price : {
        type : Number,
        required : true,
        min : 0
    },
    stock : {
        type : Number,
        required : true,
        min : 0
    }
}, {
    timestamps : true,
    strict : false
})

export default model("products", productsSchema)