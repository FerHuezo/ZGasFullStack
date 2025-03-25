import clientsModel from "../models/Clients.js";
import employeesModel from "../models/Employees.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {}

loginController.login = async (req, res) =>{
    const {email, password} = req.body;

    try {
        let userFound;
        let userType;

        if (email === config.credentials.email && password === config.credentials.password){
            userType = "ADMIN";
            userFound = {_id :"admin"};
        }else{
            userFound = await employeesModel.findOne({email})
            userType = "EMPLOYEE"
            if(!userFound){
                userFound = await clientsModel.findOne({email})
                userType = "CLIENT"
            }
        }
        if(!userFound){
           return res.json({message : "Not Found"})       
        }

        if(userType != "ADMIN"){
            const isMatch = await bcryptjs.compare(password, userFound.password)
            console.log(password, userFound.password)
            if(!isMatch){
                res.json({message : "FORBIDDEN"})
            }
        }

        jsonwebtoken.sign(
            {id : userFound._id, userType},
            config.JWT.secret,
            {expiresIn : config.JWT.expiresIn},
            (error, token) =>{
                if(error)
                    console.log(error)
                res.cookie("authToken", token)
                res.json({message : "Login successful"})
            }
        )
    } catch (error) {
        res.json({message : "Server Internal Error"})
    }
}

export default loginController;