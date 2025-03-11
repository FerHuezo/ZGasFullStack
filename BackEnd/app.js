import express from "express";
import productsRoutes from "./src/routes/productsRoutes.js"

const app = express();

app.use(express.json());

app.use("/api/products", productsRoutes)

export default app;