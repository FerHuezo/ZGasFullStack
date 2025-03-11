import {Schema, model} from "mongoose";
/*
    Fields:
        name
        lastName
        birtday 
        email
        address
        hireDate
        password
        phoneNumber
        dui
        isssNumber
        isVerified
*/

const productsSchema = new Schema({
    name : {
        type : String,
        require : true
    },
    lastName : {
        type : String,
        require : false
    },
    birtday : {
        type : String,
        require : true,
        min : 0
    },
    email : {
        type : String,
        require : true,
        unique: true,
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
          "Por favor, ingrese un correo electrónico válido",
        ]
    },
    address : {
        type : String,
        require : true,
    },
    hireDate : {
        type : Date,
        require : true
    },
    password: {
        type: String,
        required: true,
        minlength: 6, 
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [
          /^[0-9]{8}$/,
          "El teléfono debe contener exactamente 8 dígitos numéricos",
        ],
      },
    dui: {
        type: String,
        default: null,
        match: [/^[0-9]{8}-[0-9]{1}$/, "El formato del DUI debe ser 12345678-9"],
    },
    isssNumber : {
        type : Number,
        required : true,
        min : 9
    },
    isVerified : {
        type : Boolean,
        default : false
    }
    

}, {
    timestamps : true,
    strict : false
})

export default model("products", productsSchema)