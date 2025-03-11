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
        require : true
    },
    description : {
        type : String,
        require : false
    },
    price : {
        type : Number,
        require : true,
        min : 0
    },
    stock : {
        type : Number,
        require : true,
        min : 0
    }
}, {
    timestamps : true,
    strict : false
})

export default model("products", productsSchema)