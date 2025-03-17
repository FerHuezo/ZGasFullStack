import { Schema, model } from "mongoose";

/*
    Fields:
        name
        address
        phoneNumber
        schedule
*/

const brancheSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    address: {
        type: String,
        required: false,
        trim: true,
        maxlength: 200
    },
    phoneNumber: {
        type: String,
        required: true,
        match: [/^[0-9]{8}$/, "El teléfono debe contener exactamente 8 dígitos numéricos"]
    },
    schedule: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (v) => /^[0-9]{1,2}:[0-9]{2}\s?[-a-zA-Z0-9:\s]+$/.test(v),
            message: "Por favor, ingrese un horario válido (Ejemplo: '9:00 - 18:00')"
        }
    }
}, {
    timestamps: true,
    strict: true
});

export default model("branches", brancheSchema);