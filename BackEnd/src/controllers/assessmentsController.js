const assessmentsController = {};
import assessmentsModel from "../models/Assessments.js";

assessmentsController.getAssessments = async (req, res) => {
    try {
        const assessment = await assessmentsModel.find().populate("idEmployee");
        res.json(assessment);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

assessmentsController.postAssessment = async (req, res) => {
    try {
        const { comment, grade, role, idEmployee } = req.body;
        const newAssessment = new assessmentsModel({ comment, grade, role, idEmployee });
        await newAssessment.save();
        res.status(200).json({ message: "OK" });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

assessmentsController.putAssessment = async (req, res) => {
    try {
        const { comment, grade, role, idEmployee } = req.body;
        const updatedAssessment = await assessmentsModel.findByIdAndUpdate(
            req.params.id,
            { comment, grade, role, idEmployee },
            { new: true, runValidators: true }
        );

        if (!updatedAssessment) {
            return res.status(404).json({ message: "Not Found" });
        }
        res.json({ message: "OK", updatedAssessment });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

assessmentsController.deleteAssessment = async (req, res) => {
    try {
        const deletedAssessment = await assessmentsModel.findByIdAndDelete(req.params.id);
        if (!deletedAssessment) {
            return res.status(404).json({ message: "Not Found" });
        }
        res.json({ message: "OK" });
    } catch (error) {
        res.status(500).json({ message: "Bad Request", error });
    }
};

export default assessmentsController;