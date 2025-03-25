import employeeModel from "../models/Employees.js";
import bycryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../config.js";

const registerController = {};
registerController.postRegister = async (req, res) => {
        const {
            name,
            lastName,
            birthday,
            email,
            address,
            hireDate,
            password,
            phoneNumber,
            dui,
            isssNumber,
            isVerified
        } = req.body;
        try {
            const existEmployee = await employeeModel.findOne({email})
            if (existEmployee){
                return res.json({message : "Already Exist"})
            }

            const hashPassword = await bycryptjs.hash(password, 10);

            const newRegister = new employeeModel({
                name,
                lastName,
                birthday,
                email,
                address,
                hireDate,
                password : hashPassword,
                phoneNumber,
                dui,
                isssNumber,
                isVerified
            });
            await newRegister.save();
            jsonwebtoken.sign(
                {id : newRegister._id},
                config.JWT.secret,
                {expiresIn : config.JWT.expiresIn},
                (error, token) => {
                    if(error) console.log(error);
                    res.cookie("authToken",token);
                    res.json({message : "Employee Registred"})
                    res.status(200).json({ message: "OK" });
                } 
            )
        } catch (error) {
            res.status(400).json({ message: "Bad Request", error });
        }
};

export default registerController;