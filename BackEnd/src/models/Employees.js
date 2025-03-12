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

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        match: [
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            "Por favor, ingrese un nombre válido"
        ]
    },
    lastName: {
        type: String,
        required: false,
        trim: true,
        match: [
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            "Por favor, ingrese un apellido válido"
        ]
    },
    birthday: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            "Por favor, ingrese un correo electrónico válido"
        ]
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    hireDate: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "La contraseña debe tener al menos 6 caracteres"]
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [
            /^[0-9]{8}$/,
            "El teléfono debe contener exactamente 8 dígitos numéricos"
        ]
    },
    dui: {
        type: String,
        default: null,
        match: [
            /^[0-9]{8}-[0-9]{1}$/,
            "El formato del DUI debe ser 12345678-9"
        ]
    },
    isssNumber: {
        type: Number,
        required: true,
        validate: {
            validator: (v) => v.toString().length === 9,
            message: "El número de ISSS debe tener exactamente 9 dígitos"
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    strict: true
});

export default model("employees", employeeSchema);