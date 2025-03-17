const clientController = {};
import clientModel from "../models/Clients.js";

// Obtener todos los clientes
clientController.getClients = async (req, res) => {
    try {
        const clients = await clientModel.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Crear un nuevo cliente
clientController.postClients = async (req, res) => {
    try {
        const { name, lastName, birthday, email, address, registrationDate, password, phoneNumber, dui, nitNumber, isVerified } = req.body;

        const newClient = new clientModel({ name, lastName, birthday, email, address, registrationDate, password, phoneNumber, dui, nitNumber, isVerified });
        await newClient.save();

        res.status(201).json({ message: "OK", newClient });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

// Actualizar un cliente
clientController.putClients = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, lastName, birthday, email, address, registrationDate, password, phoneNumber, dui, nitNumber, isVerified } = req.body;

        const updatedClient = await clientModel.findByIdAndUpdate(
            id,
            { name, lastName, birthday, email, address, registrationDate, password, phoneNumber, dui, nitNumber, isVerified },
            { new: true, runValidators: true }
        );

        if (!updatedClient) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "OK", updatedClient });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

// Eliminar un cliente
clientController.deleteClients = async (req, res) => {
    try {
        const deletedClient = await clientModel.findByIdAndDelete(req.params.id);

        if (!deletedClient) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.json({ message: "OK" });
    } catch (error) {
        res.status(500).json({ message: "Bad Request", error });
    }
};

export default clientController;