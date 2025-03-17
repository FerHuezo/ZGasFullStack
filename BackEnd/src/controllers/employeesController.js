const employeesController = {};
import employeeModel from "../models/Employees.js";

employeesController.getEmployees = async (req, res) => {
    try {
        const employees = await employeeModel.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

employeesController.postEmployees = async (req, res) => {
    try {
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

        const newEmployee = new employeeModel({
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
        });
        await newEmployee.save();
        res.status(201).json({ message: "OK" });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

employeesController.putEmployees = async (req, res) => {
    try {
        const updatedEmployee = await employeeModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "OK", updatedEmployee });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

employeesController.deleteEmployees = async (req, res) => {
    try {
        const deletedEmployee = await employeeModel.findByIdAndDelete(req.params.id);

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "OK" });
    } catch (error) {
        res.status(500).json({ message: "Bad Request", error });
    }
};

export default employeesController;