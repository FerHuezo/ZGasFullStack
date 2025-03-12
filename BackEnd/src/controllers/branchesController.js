import branchesModel from "../models/Branches.js";

const branchesController = {};

branchesController.getBranches = async (req, res) => {
    try {
        const branches = await branchesModel.find();
        res.json(branches);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

branchesController.postBranch = async (req, res) => {
    try {
        const { name, address, phoneNumber, schedule } = req.body;

        const newBranch = new branchesModel({ name, address, phoneNumber, schedule });
        await newBranch.save();

        res.status(201).json({ message: "OK", newBranch });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

branchesController.putBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, phoneNumber, schedule } = req.body;

        const updatedBranch = await branchesModel.findByIdAndUpdate(
            id,
            { name, address, phoneNumber, schedule },
            { new: true, runValidators: true }
        );

        if (!updatedBranch) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "OK", updatedBranch });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

branchesController.deleteBranch = async (req, res) => {
    try {
        const deletedBranch = await branchesModel.findByIdAndDelete(req.params.id);

        if (!deletedBranch) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "OK" });
    } catch (error) {
        res.status(500).json({ message: "Bad Request", error });
    }
};

export default branchesController;
